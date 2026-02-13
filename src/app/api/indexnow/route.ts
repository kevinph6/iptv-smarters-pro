import { NextResponse } from 'next/server';

// IndexNow API key — also needs to be served at /{key}.txt
// Set INDEXNOW_KEY in your environment, or default is used.
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'iptvsmarterspro2026indexnow';

/**
 * POST /api/indexnow
 * Body: { urls: string[] }
 *
 * Submits URLs to Bing/Yandex/Naver/Seznam via the IndexNow protocol
 * for near-instant indexing. Call this after publishing a blog post,
 * creating a product, or updating important pages.
 *
 * Example:
 *   fetch('/api/indexnow', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json' },
 *     body: JSON.stringify({ urls: ['https://officieliptvsmarterspro.fr/blog/new-post'] })
 *   })
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const urls: string[] = body.urls;

    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'urls array is required' }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
    const host = new URL(baseUrl).host;

    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: `${baseUrl}/${INDEXNOW_KEY}.txt`,
      urlList: urls.slice(0, 10000), // IndexNow max 10k per request
    };

    // Submit to multiple IndexNow endpoints simultaneously
    const endpoints = [
      'https://api.indexnow.org/indexnow',
      'https://www.bing.com/indexnow',
      'https://yandex.com/indexnow',
    ];

    const results = await Promise.allSettled(
      endpoints.map((endpoint) =>
        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify(payload),
        }).then(async (res) => ({
          endpoint,
          status: res.status,
          ok: res.ok,
        }))
      )
    );

    const summary = results.map((r) => {
      if (r.status === 'fulfilled') return r.value;
      return { endpoint: 'unknown', status: 0, ok: false, error: String(r.reason) };
    });

    return NextResponse.json({
      success: true,
      submitted: urls.length,
      results: summary,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit to IndexNow', details: String(error) },
      { status: 500 }
    );
  }
}

/**
 * GET /api/indexnow — health check / info
 */
export function GET() {
  return NextResponse.json({
    protocol: 'IndexNow',
    key: INDEXNOW_KEY,
    usage: 'POST /api/indexnow with { urls: ["https://..."] }',
    endpoints: ['api.indexnow.org', 'bing.com', 'yandex.com'],
  });
}
