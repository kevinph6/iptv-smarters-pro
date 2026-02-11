import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';
export const maxDuration = 120; // Allow 2 minutes for full generation

const editorRoles = new Set(['admin', 'dev', 'writer']);

async function requireEditor(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const userRole = (session.user as { role?: string }).role;
  if (!userRole || !editorRoles.has(userRole)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  return null;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 80);
}

async function ensureUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 0;

  while (true) {
    const existing = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (existing.length === 0) return slug;

    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const authError = await requireEditor(request);
    if (authError) return authError;

    const {
      topic,
      keywords = '',
      model = 'claude',
      generateImage = true,
      autoPublish = true,
      author = 'Équipe IPTV PRO',
    } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Step 1: Generate article with Claude/selected model
    console.log(`[FULL GEN] Step 1: Generating article for "${topic}" with model: ${model}...`);

    const articleResponse = await fetch(`${baseUrl}/api/ai/generate-article`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': request.headers.get('cookie') || '',
      },
      body: JSON.stringify({ topic, keywords, model }),
    });

    if (!articleResponse.ok) {
      const error = await articleResponse.json();
      return NextResponse.json(
        { error: `Article generation failed: ${error.error || 'Unknown error'}` },
        { status: 500 }
      );
    }

    const articleData = await articleResponse.json();
    console.log(`[FULL GEN] Article generated: "${articleData.title}"`);

    // Step 2: Generate image with Gemini Flash (if requested)
    let featuredImageUrl: string | null = null;

    if (generateImage) {
      console.log(`[FULL GEN] Step 2: Generating image...`);
      try {
        const imageResponse = await fetch(`${baseUrl}/api/ai/generate-image`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': request.headers.get('cookie') || '',
          },
          body: JSON.stringify({ topic: articleData.title || topic }),
        });

        if (imageResponse.ok) {
          const imageData = await imageResponse.json();
          featuredImageUrl = imageData.imageUrl || null;
          console.log(`[FULL GEN] Image generated: ${featuredImageUrl}`);
        } else {
          console.error('[FULL GEN] Image generation failed, continuing without image');
        }
      } catch (imgError) {
        console.error('[FULL GEN] Image generation error:', imgError);
      }
    }

    // Step 3: Generate slug and save to database
    console.log(`[FULL GEN] Step 3: Saving to database...`);

    const baseSlug = generateSlug(articleData.title || topic);
    const slug = await ensureUniqueSlug(baseSlug);
    const now = new Date().toISOString();
    const category = articleData.category || 'Guides';

    await db.insert(blogPosts).values({
      title: articleData.title,
      slug,
      excerpt: articleData.excerpt || articleData.metaDescription || '',
      content: articleData.content,
      author,
      category,
      featuredImageUrl,
      published: autoPublish,
      createdAt: now,
      updatedAt: now,
    });

    console.log(`[FULL GEN] Blog post saved with slug: ${slug}, published: ${autoPublish}`);

    // Return full result
    return NextResponse.json({
      success: true,
      post: {
        title: articleData.title,
        slug,
        excerpt: articleData.excerpt,
        metaDescription: articleData.metaDescription,
        category,
        author,
        featuredImageUrl,
        published: autoPublish,
        suggestedKeywords: articleData.suggestedKeywords,
        modelUsed: articleData.modelUsed,
        url: `/blog/${slug}`,
      },
    });
  } catch (error) {
    console.error('[FULL GEN] Error:', error);
    return NextResponse.json({ error: 'Internal server error during full generation' }, { status: 500 });
  }
}
