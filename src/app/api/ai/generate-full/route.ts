import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { blogPosts } from '@/db/schema';
import { auth } from '@/lib/auth';
import { eq } from 'drizzle-orm';

export const runtime = 'nodejs';
export const maxDuration = 60;

const editorRoles = new Set(['admin', 'dev', 'writer']);

// SEO keywords baked in
const PRIMARY_KEYWORDS = [
  'iptv', 'abonnement iptv', 'iptv smarters pro', 'iptv france',
  'iptv premium', 'iptv 4k', 'meilleur iptv', 'iptv pas cher',
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
    default: return 'anthropic/claude-sonnet-4';
  }
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
      max_tokens: 8192,
      temperature: 0.7,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`OpenRouter error: ${err?.error?.message || JSON.stringify(err)}`);
  }

  const data = await response.json();
  const raw = data.choices[0].message.content;

  // Parse JSON robustly
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

    // Step 1: Generate article directly via OpenRouter
    console.log(`[FULL GEN] Generating article for "${topic}" with model: ${model}...`);
    const articleData = await generateArticle(topic, keywords, model, apiKey);
    console.log(`[FULL GEN] Article generated: "${articleData.title}"`);

    // Step 2: Save to database (skip image gen on Vercel to avoid timeout)
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
      featuredImageUrl: null,
      published: autoPublish,
      createdAt: now,
      updatedAt: now,
    });

    console.log(`[FULL GEN] Saved: /blog/${slug} (published: ${autoPublish})`);

    return NextResponse.json({
      success: true,
      post: {
        title: articleData.title,
        slug,
        excerpt: articleData.excerpt,
        metaDescription: articleData.metaDescription,
        category,
        author,
        featuredImageUrl: null,
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
