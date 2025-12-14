import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic, keywords, language = 'fr' } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
    }

    const keywordsText = keywords ? `Mots-clés SEO à inclure naturellement: ${keywords}` : '';

    const prompt = `Tu es un expert en rédaction SEO pour un site IPTV français (IPTV SMARTERS PRO). 
Rédige un article de blog complet et optimisé SEO en français sur le sujet suivant: "${topic}"

${keywordsText}

INSTRUCTIONS IMPORTANTES:
1. L'article doit faire entre 1500-2500 mots
2. Structure avec des balises HTML: <h2>, <h3>, <p>, <ul>, <li>, <strong>, <em>
3. Inclure une introduction accrocheuse
4. Utiliser des sous-titres H2 et H3 pertinents
5. Ajouter des listes à puces quand pertinent
6. Conclure avec un appel à l'action vers nos abonnements IPTV
7. Optimiser pour les mots-clés IPTV, streaming, IPTV France, IPTV SMARTERS PRO
8. Ton professionnel mais accessible
9. NE PAS inclure de balises <h1> (le titre sera ajouté séparément)
10. NE PAS inclure de métadonnées ou commentaires, seulement le contenu HTML

Génère également:
- Un titre SEO accrocheur (60-70 caractères max)
- Une méta description (150-160 caractères)
- Un extrait court (2 phrases max)
- 5-7 mots-clés suggérés

FORMAT DE RÉPONSE (JSON):
{
  "title": "Titre SEO ici",
  "metaDescription": "Meta description ici",
  "excerpt": "Extrait court ici",
  "suggestedKeywords": ["mot1", "mot2", "mot3"],
  "content": "<h2>Premier titre</h2><p>Contenu...</p>"
}`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        'X-Title': 'IPTV Blog Generator',
      },
      body: JSON.stringify({
        model: 'openai/gpt-5.2-pro',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en rédaction SEO spécialisé dans le domaine IPTV et streaming. Tu réponds toujours en JSON valide.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 4096,
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenRouter API error:', error);
      return NextResponse.json({ error: 'Failed to generate article' }, { status: 500 });
    }

    const data = await response.json();
    const generatedContent = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(generatedContent);
  } catch (error) {
    console.error('Article generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}