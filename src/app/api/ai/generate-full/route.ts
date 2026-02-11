import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';
export const maxDuration = 60;

const editorRoles = new Set(['admin', 'dev', 'writer']);

const PRIMARY_KEYWORDS = [
  'iptv', 'abonnement iptv', 'iptv smarters pro', 'iptv france',
  'iptv premium', 'iptv 4k', 'meilleur iptv', 'iptv pas cher',
];

// Themed IPTV images for blog posts (fallback)
const THEMED_IMAGES = [
  'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=1200&h=630&fit=crop&q=80',
  'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=1200&h=630&fit=crop&q=80',
  'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&h=630&fit=crop&q=80',
  'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=1200&h=630&fit=crop&q=80',
  'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=1200&h=630&fit=crop&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=630&fit=crop&q=80',
  'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=1200&h=630&fit=crop&q=80',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=630&fit=crop&q=80',
  'https://images.unsplash.com/photo-1567690187548-f07b1d7bf5a9?w=1200&h=630&fit=crop&q=80',
  'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=1200&h=630&fit=crop&q=80',
];

async function requireEditor(request: NextRequest) {
  const session = await auth.api.getSession({ headers: request.headers });
  if (!session?.user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  const userRole = (session.user as { role?: string }).role;
  if (!userRole || !editorRoles.has(userRole)) return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
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
    const existing = await db.select({ id: blogPosts.id }).from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);
    if (existing.length === 0) return slug;
    counter++;
    slug = `${baseSlug}-${counter}`;
  }
}

function getModelId(model: string): string {
  switch (model) {
    case 'opus': return 'anthropic/claude-opus-4';
    case 'sonnet': return 'anthropic/claude-sonnet-4';
    case 'gpt': return 'openai/gpt-4o';
    default: return 'anthropic/claude-3.7-sonnet';
  }
}

function getThemedImage(topic: string): string {
  // Use a hash of the topic to pick a consistent image
  let hash = 0;
  for (let i = 0; i < topic.length; i++) {
    hash = ((hash << 5) - hash) + topic.charCodeAt(i);
    hash |= 0;
  }
  return THEMED_IMAGES[Math.abs(hash) % THEMED_IMAGES.length];
}

async function generateArticle(topic: string, keywords: string, model: string, apiKey: string) {
  const modelId = getModelId(model);
  const userKeywords = keywords ? keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [];
  const allKeywords = [...new Set([...userKeywords, ...PRIMARY_KEYWORDS.slice(0, 5)])];

  const prompt = `Tu es un expert en rédaction SEO pour le site IPTV SMARTERS PRO (officieliptvsmarterspro.fr).
Rédige un article de blog complet et optimisé SEO en français sur: "${topic}"

Mots-clés SEO à inclure: ${allKeywords.join(', ')}

INSTRUCTIONS:
1. Article de 1500-2500 mots minimum
2. Structure HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
3. Introduction accrocheuse avec mot-clé principal
4. 4-5 sections H2 avec mots-clés dans les titres
5. Section FAQ avec 3-4 questions en H3 (terminant par ?)
6. Liens internes: <a href="/abonnement-iptv/">nos abonnements IPTV</a>, <a href="/tutoriels">tutoriels</a>
7. Conclusion avec appel à l'action vers <a href="/abonnement-iptv/#pricing">Découvrir nos offres</a>
8. NE PAS inclure <h1>
9. Ton professionnel, vouvoiement, français de France
10. Données chiffrées: 160 000+ chaînes, 20 000+ VOD

FORMAT JSON:
{
  "title": "Titre SEO (55-65 chars)",
  "metaDescription": "Meta description (145-160 chars)",
  "excerpt": "2 phrases résumant l'article",
  "suggestedKeywords": ["mot1", "mot2", "mot3", "mot4", "mot5"],
  "category": "Guides",
  "content": "<h2>...</h2><p>...</p>"
}`;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'HTTP-Referer': 'https://officieliptvsmarterspro.fr',
      'X-Title': 'IPTV Blog Generator',
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        { role: 'system', content: 'Tu es un rédacteur SEO expert. Tu réponds TOUJOURS en JSON valide uniquement.' },
        { role: 'user', content: prompt },
      ],
      max_tokens: 4096,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`OpenRouter error: ${err?.error?.message || JSON.stringify(err)}`);
  }

  const data = await response.json();
  const raw = data.choices[0].message.content;

  try {
    return { ...JSON.parse(raw), modelUsed: modelId };
  } catch {
    const jsonMatch = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) return { ...JSON.parse(jsonMatch[1].trim()), modelUsed: modelId };
    const start = raw.indexOf('{');
    const end = raw.lastIndexOf('}');
    if (start !== -1 && end !== -1) return { ...JSON.parse(raw.slice(start, end + 1)), modelUsed: modelId };
    throw new Error('Could not parse AI response');
  }
}

async function generateImage(topic: string, apiKey: string): Promise<string | null> {
  try {
    const prompt = `Generate a professional, modern featured image for a blog article about "${topic}" in the IPTV and streaming industry. Clean design, modern tech aesthetic with purple/cyan/blue gradients. No text. 16:9 aspect ratio.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://officieliptvsmarterspro.fr',
        'X-Title': 'IPTV Blog Image Generator',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-preview:thinking',
        max_tokens: 2048,
        messages: [{ role: 'user', content: prompt }],
      }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const message = data.choices?.[0]?.message;
    if (!message) return null;

    // Check various response formats for image URL
    if (message.images?.length > 0) {
      const img = message.images[0];
      if (!img.startsWith('data:')) return img; // Return URL directly
    }

    if (Array.isArray(message.content)) {
      for (const part of message.content) {
        if (part.type === 'image_url' && part.image_url?.url && !part.image_url.url.startsWith('data:')) {
          return part.image_url.url;
        }
      }
    }

    if (typeof message.content === 'string' && message.content.startsWith('http')) {
      return message.content;
    }

    return null;
  } catch (error) {
    console.error('[IMAGE GEN] Error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const authError = await requireEditor(request);
    if (authError) return authError;

    const {
      topic,
      keywords = '',
      model = 'claude',
      autoPublish = true,
      author = 'Équipe IPTV PRO',
    } = await request.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
    }

    // Step 1: Generate article via OpenRouter (Claude)
    console.log(`[FULL GEN] Generating article for "${topic}"...`);
    const articleData = await generateArticle(topic, keywords, model, apiKey);
    console.log(`[FULL GEN] Article: "${articleData.title}"`);

    // Step 2: Try to generate image with Gemini, fallback to themed stock image
    console.log(`[FULL GEN] Generating image...`);
    let featuredImageUrl = await generateImage(articleData.title || topic, apiKey);
    
    if (!featuredImageUrl) {
      // Use a themed stock image as fallback
      featuredImageUrl = getThemedImage(articleData.title || topic);
      console.log(`[FULL GEN] Using themed stock image: ${featuredImageUrl}`);
    } else {
      console.log(`[FULL GEN] AI image generated: ${featuredImageUrl}`);
    }

    // Step 3: Save to database
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

    console.log(`[FULL GEN] Saved: /blog/${slug}`);

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
  } catch (error: any) {
    console.error('[FULL GEN] Error:', error);
    return NextResponse.json({ error: error.message || 'Internal server error' }, { status: 500 });
  }
}
