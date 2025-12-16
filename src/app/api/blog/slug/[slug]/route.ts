import { NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { and, eq } from 'drizzle-orm';

export const runtime = 'nodejs';

export async function GET(_request: Request, props: { params: Promise<{ slug: string }> }) {
  try {
    const params = await props.params;
    const { slug } = params;

    const posts = await db
      .select()
      .from(blogPosts)
      .where(and(eq(blogPosts.slug, slug), eq(blogPosts.published, true)))
      .limit(1);

    if (!posts.length) {
      return NextResponse.json({ error: 'Article introuvable' }, { status: 404 });
    }

    return NextResponse.json(posts[0]);
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}
