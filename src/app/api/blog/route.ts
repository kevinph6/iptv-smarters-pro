import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { eq, like, and, or, desc } from 'drizzle-orm';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Single blog post by ID
    if (id) {
      if (!id || isNaN(parseInt(id))) {
        return NextResponse.json({ 
          error: "Valid ID is required",
          code: "INVALID_ID" 
        }, { status: 400 });
      }

      const blogPost = await db.select()
        .from(blogPosts)
        .where(eq(blogPosts.id, parseInt(id)))
        .limit(1);

      if (blogPost.length === 0) {
        return NextResponse.json({ 
          error: 'Blog post not found',
          code: 'NOT_FOUND' 
        }, { status: 404 });
      }

      return NextResponse.json(blogPost[0], { status: 200 });
    }

    // List blog posts with filters and pagination
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '10'), 100);
    const offset = parseInt(searchParams.get('offset') ?? '0');
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const publishedParam = searchParams.get('published');

    let query = db.select().from(blogPosts);

    // Build where conditions
    const conditions = [];

    if (category) {
      conditions.push(eq(blogPosts.category, category));
    }

    if (publishedParam !== null) {
      const published = publishedParam === 'true';
      conditions.push(eq(blogPosts.published, published));
    }

    if (search) {
      const searchCondition = or(
        like(blogPosts.title, `%${search}%`),
        like(blogPosts.excerpt, `%${search}%`),
        like(blogPosts.content, `%${search}%`)
      );
      conditions.push(searchCondition);
    }

    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }

    const results = await query
      .orderBy(desc(blogPosts.createdAt))
      .limit(limit)
      .offset(offset);

    return NextResponse.json(results, { status: 200 });

  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, author, category, featuredImageUrl, published } = body;

    // Validate required fields
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      return NextResponse.json({ 
        error: "Title is required and must be a non-empty string",
        code: "MISSING_TITLE" 
      }, { status: 400 });
    }

    if (!slug || typeof slug !== 'string' || slug.trim().length === 0) {
      return NextResponse.json({ 
        error: "Slug is required and must be a non-empty string",
        code: "MISSING_SLUG" 
      }, { status: 400 });
    }

    if (!excerpt || typeof excerpt !== 'string' || excerpt.trim().length === 0) {
      return NextResponse.json({ 
        error: "Excerpt is required and must be a non-empty string",
        code: "MISSING_EXCERPT" 
      }, { status: 400 });
    }

    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return NextResponse.json({ 
        error: "Content is required and must be a non-empty string",
        code: "MISSING_CONTENT" 
      }, { status: 400 });
    }

    if (!author || typeof author !== 'string' || author.trim().length === 0) {
      return NextResponse.json({ 
        error: "Author is required and must be a non-empty string",
        code: "MISSING_AUTHOR" 
      }, { status: 400 });
    }

    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      return NextResponse.json({ 
        error: "Category is required and must be a non-empty string",
        code: "MISSING_CATEGORY" 
      }, { status: 400 });
    }

    // Validate slug format (lowercase, hyphens only)
    const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    const trimmedSlug = slug.trim().toLowerCase();
    if (!slugPattern.test(trimmedSlug)) {
      return NextResponse.json({ 
        error: "Slug must be URL-friendly (lowercase letters, numbers, and hyphens only)",
        code: "INVALID_SLUG_FORMAT" 
      }, { status: 400 });
    }

    // Check slug uniqueness
    const existingSlug = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.slug, trimmedSlug))
      .limit(1);

    if (existingSlug.length > 0) {
      return NextResponse.json({ 
        error: "A blog post with this slug already exists",
        code: "SLUG_CONFLICT" 
      }, { status: 409 });
    }

    // Prepare insert data
    const insertData = {
      title: title.trim(),
      slug: trimmedSlug,
      excerpt: excerpt.trim(),
      content: content.trim(),
      author: author.trim(),
      category: category.trim(),
      featuredImageUrl: featuredImageUrl ? featuredImageUrl.trim() : null,
      published: typeof published === 'boolean' ? published : true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const newBlogPost = await db.insert(blogPosts)
      .values(insertData)
      .returning();

    return NextResponse.json(newBlogPost[0], { status: 201 });

  } catch (error) {
    console.error('POST error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if blog post exists
    const existing = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Blog post not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    const body = await request.json();
    const { title, slug, excerpt, content, author, category, featuredImageUrl, published } = body;

    // Start with existing post data and updatedAt
    const updates = {
      ...existing[0],
      updatedAt: new Date().toISOString()
    };

    // Validate and prepare updates
    if (title !== undefined) {
      if (typeof title !== 'string' || title.trim().length === 0) {
        return NextResponse.json({ 
          error: "Title must be a non-empty string",
          code: "INVALID_TITLE" 
        }, { status: 400 });
      }
      updates.title = title.trim();
    }

    if (slug !== undefined) {
      if (typeof slug !== 'string' || slug.trim().length === 0) {
        return NextResponse.json({ 
          error: "Slug must be a non-empty string",
          code: "INVALID_SLUG" 
        }, { status: 400 });
      }

      const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
      const trimmedSlug = slug.trim().toLowerCase();
      if (!slugPattern.test(trimmedSlug)) {
        return NextResponse.json({ 
          error: "Slug must be URL-friendly (lowercase letters, numbers, and hyphens only)",
          code: "INVALID_SLUG_FORMAT" 
        }, { status: 400 });
      }

      // Check slug uniqueness (excluding current post)
      const existingSlug = await db.select()
        .from(blogPosts)
        .where(eq(blogPosts.slug, trimmedSlug))
        .limit(1);

      if (existingSlug.length > 0 && existingSlug[0].id !== parseInt(id)) {
        return NextResponse.json({ 
          error: "A blog post with this slug already exists",
          code: "SLUG_CONFLICT" 
        }, { status: 409 });
      }

      updates.slug = trimmedSlug;
    }

    if (excerpt !== undefined) {
      if (typeof excerpt !== 'string' || excerpt.trim().length === 0) {
        return NextResponse.json({ 
          error: "Excerpt must be a non-empty string",
          code: "INVALID_EXCERPT" 
        }, { status: 400 });
      }
      updates.excerpt = excerpt.trim();
    }

    if (content !== undefined) {
      if (typeof content !== 'string' || content.trim().length === 0) {
        return NextResponse.json({ 
          error: "Content must be a non-empty string",
          code: "INVALID_CONTENT" 
        }, { status: 400 });
      }
      updates.content = content.trim();
    }

    if (author !== undefined) {
      if (typeof author !== 'string' || author.trim().length === 0) {
        return NextResponse.json({ 
          error: "Author must be a non-empty string",
          code: "INVALID_AUTHOR" 
        }, { status: 400 });
      }
      updates.author = author.trim();
    }

    if (category !== undefined) {
      if (typeof category !== 'string' || category.trim().length === 0) {
        return NextResponse.json({ 
          error: "Category must be a non-empty string",
          code: "INVALID_CATEGORY" 
        }, { status: 400 });
      }
      updates.category = category.trim();
    }

    if (featuredImageUrl !== undefined) {
      updates.featuredImageUrl = featuredImageUrl && typeof featuredImageUrl === 'string' ? featuredImageUrl.trim() : null;
    }

    if (published !== undefined) {
      if (typeof published !== 'boolean') {
        return NextResponse.json({ 
          error: "Published must be a boolean value",
          code: "INVALID_PUBLISHED" 
        }, { status: 400 });
      }
      updates.published = published;
    }

    const updated = await db.update(blogPosts)
      .set(updates)
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    return NextResponse.json(updated[0], { status: 200 });

  } catch (error) {
    console.error('PUT error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + (error instanceof Error ? error.message : String(error))
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ 
        error: "Valid ID is required",
        code: "INVALID_ID" 
      }, { status: 400 });
    }

    // Check if blog post exists
    const existing = await db.select()
      .from(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .limit(1);

    if (existing.length === 0) {
      return NextResponse.json({ 
        error: 'Blog post not found',
        code: 'NOT_FOUND' 
      }, { status: 404 });
    }

    const deleted = await db.delete(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    return NextResponse.json({ 
      message: "Blog post deleted successfully",
      deletedPost: {
        id: deleted[0].id,
        title: deleted[0].title
      }
    }, { status: 200 });

  } catch (error) {
    console.error('DELETE error:', error);
    return NextResponse.json({ 
      error: 'Internal server error: ' + error.message 
    }, { status: 500 });
  }
}