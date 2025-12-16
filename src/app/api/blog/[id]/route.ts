import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = Number(params.id);
    if (!id) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    const posts = await db.select().from(blogPosts).where(eq(blogPosts.id, id)).limit(1);
    if (!posts.length) {
      return NextResponse.json({ error: 'Article introuvable' }, { status: 404 });
    }

    return NextResponse.json(posts[0]);
  } catch (error) {
    console.error('Error fetching post by id:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    const id = Number(params.id);
    if (!id) {
      return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
    }

    await db.delete(blogPosts).where(eq(blogPosts.id, id));

    return NextResponse.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
