import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { auth } from '@/lib/auth';
import { and, desc, eq } from 'drizzle-orm';

export const runtime = 'nodejs';

const editorRoles = new Set(['admin', 'dev', 'writer']);

async function requireEditor(request: NextRequest) {
  const session = await auth.api.getSession({ 
    headers: request.headers
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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const publishedParam = searchParams.get('published');

    const limit = limitParam ? Math.min(100, Math.max(1, Number(limitParam) || 10)) : 10;

    const filters = [] as any[];
    if (publishedParam !== null) {
      filters.push(eq(blogPosts.published, publishedParam === 'true'));
    }

    let query = db.select().from(blogPosts);
    if (filters.length) {
      query = query.where(and(...filters));
    }

    const posts = await query.orderBy(desc(blogPosts.createdAt)).limit(limit);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authError = await requireEditor(request);
    if (authError) return authError;

      const body = await request.json();
      console.log('Received body:', { ...body, content: '...' });
      const { title, slug, excerpt, content, author, category, featuredImageUrl, published } = body;

      // Handle empty string as null explicitly
      const finalFeaturedImageUrl = (!featuredImageUrl || typeof featuredImageUrl !== 'string' || featuredImageUrl.trim() === '') ? null : featuredImageUrl;

      if (!title || !slug || !excerpt || !content || !author || !category) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    const duplicate = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);

    if (duplicate.length) {
      return NextResponse.json({ error: 'Ce slug existe déjà' }, { status: 409 });
    }

    const now = new Date().toISOString();

      await db.insert(blogPosts).values({
        title,
        slug,
        excerpt,
        content,
        author,
        category,
        featuredImageUrl: finalFeaturedImageUrl,
        published: Boolean(published),
        createdAt: body.createdAt || now,
        updatedAt: body.updatedAt || now,
      });

    return NextResponse.json({ message: 'Article créé' }, { status: 201 });
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authError = await requireEditor(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

      const body = await request.json();
      console.log('Received body:', { ...body, content: '...' });
      const { title, slug, excerpt, content, author, category, featuredImageUrl, published } = body;

      // Handle empty string as null explicitly
      const finalFeaturedImageUrl = (!featuredImageUrl || typeof featuredImageUrl !== 'string' || featuredImageUrl.trim() === '') ? null : featuredImageUrl;

      if (!title || !slug || !excerpt || !content || !author || !category) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    const existing = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    if (!existing.length) {
      return NextResponse.json({ error: 'Article introuvable' }, { status: 404 });
    }

    if (slug !== existing[0].slug) {
      const slugCheck = await db
        .select({ id: blogPosts.id })
        .from(blogPosts)
        .where(eq(blogPosts.slug, slug))
        .limit(1);

      if (slugCheck.length) {
        return NextResponse.json({ error: 'Ce slug existe déjà' }, { status: 409 });
      }
    }

      await db
        .update(blogPosts)
        .set({
          title,
          slug,
          excerpt,
          content,
          author,
          category,
          featuredImageUrl: finalFeaturedImageUrl,
          published: Boolean(published),
          updatedAt: body.updatedAt || new Date().toISOString(),
        })
        .where(eq(blogPosts.id, id));

    return NextResponse.json({ message: 'Article mis à jour' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const authError = await requireEditor(request);
    if (authError) return authError;

    const { searchParams } = new URL(request.url);
    const idParam = searchParams.get('id');
    const id = idParam ? Number(idParam) : null;

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    const existing = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    if (!existing.length) {
      return NextResponse.json({ error: 'Article introuvable' }, { status: 404 });
    }

    await db.delete(blogPosts).where(eq(blogPosts.id, id));
    return NextResponse.json({ message: 'Article supprimé' });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
