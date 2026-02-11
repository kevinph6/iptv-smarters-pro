import { NextRequest, NextResponse } from 'next/server';

// SEO target keywords for IPTV ranking
const PRIMARY_KEYWORDS = [
  'iptv', 'abonnement iptv', 'iptv smarters pro', 'iptv france',
  'iptv premium', 'iptv 4k', 'meilleur iptv', 'iptv pas cher',
  'iptv fiable', 'iptv stable',
];

const SECONDARY_KEYWORDS = [
  'iptv smart tv', 'iptv android', 'iptv apple tv', 'iptv samsung',
  'iptv lg', 'iptv firestick', 'iptv box', 'iptv activation instantanée',
  'iptv vod', 'iptv sport', 'chaînes iptv', 'iptv streaming', 'iptv 24/7',
  'iptv sans coupure', 'test iptv gratuit', 'iptv legal france',
];

const LONG_TAIL_KEYWORDS = [
  'Comment installer IPTV SMARTERS PRO sur Smart TV Samsung',
  'IPTV France guide complet des chaînes disponibles',
  'IPTV FireStick installation en 5 minutes',
  'Meilleur abonnement IPTV France 2026 comparatif',
  'IPTV 4K vs HD quelle qualité choisir',
  'IPTV sans coupure comment garantir la stabilité',
  'Abonnement IPTV pas cher et fiable en France',
  'IPTV Smarters Pro configuration complète',
];

export async function POST(req: NextRequest) {
  try {
    const { topic, keywords, language = 'fr', model = 'claude' } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
    }

    // Select model based on preference
    let modelId: string;
    switch (model) {
      case 'opus':
        modelId = 'anthropic/claude-sonnet-4';
        break;
      case 'sonnet':
        modelId = 'anthropic/claude-sonnet-4';
        break;
      case 'gpt':
        modelId = 'openai/gpt-4o';
        break;
      default:
        modelId = 'anthropic/claude-sonnet-4';
    }

    const userKeywords = keywords ? keywords.split(',').map((k: string) => k.trim()).filter(Boolean) : [];
    const allKeywords = [...new Set([...userKeywords, ...PRIMARY_KEYWORDS.slice(0, 5)])];
    const keywordsText = `Mots-clés SEO PRINCIPAUX à inclure naturellement et fréquemment: ${allKeywords.join(', ')}
    
Mots-clés SECONDAIRES à inclure quand pertinent: ${SECONDARY_KEYWORDS.slice(0, 8).join(', ')}`;

    const prompt = `Tu es un expert en rédaction SEO de niveau élite, spécialisé dans le domaine IPTV et streaming en France. Tu travailles pour le site "IPTV SMARTERS PRO" (officieliptvsmarterspro.fr).

SUJET DE L'ARTICLE: "${topic}"

${keywordsText}

=== INSTRUCTIONS SEO STRICTES ===

1. STRUCTURE HTML OPTIMISÉE SEO:
   - Utilise <h2> pour les titres principaux (3-5 minimum, chaque H2 doit contenir un mot-clé cible)
   - Utilise <h3> pour les sous-titres (2-3 par section H2)
   - Chaque paragraphe <p> doit faire 2-4 phrases minimum
   - Utilise <strong> pour les mots-clés importants (2-3 fois par section)
   - Utilise <em> pour l'emphase sur des points clés
   - Inclus des listes <ul><li> ou <ol><li> dans au moins 2 sections
   - NE PAS inclure de balises <h1> (titre ajouté séparément)

2. LONGUEUR ET PROFONDEUR:
   - L'article DOIT faire entre 2000-3500 mots minimum
   - Chaque section H2 doit avoir au moins 200-300 mots
   - Contenu substantiel, informatif et unique
   - Pas de contenu générique ou superficiel

3. OPTIMISATION SEO ON-PAGE:
   - Le mot-clé principal doit apparaître dans les 100 premiers mots
   - Densité de mots-clés: 1-2% pour le mot-clé principal
   - Utilise des variations sémantiques des mots-clés (LSI)
   - Inclus des questions fréquentes (au format H3 avec ?) pour le schema FAQ
   - Ajoute des liens internes vers: /abonnement-iptv/, /tutoriels, /chaines, /blog
   - Format des liens internes: <a href="/abonnement-iptv/">nos abonnements IPTV</a>

4. STRUCTURE DE L'ARTICLE:
   - Introduction accrocheuse (150+ mots) avec le mot-clé principal dans la première phrase
   - Table des matières implicite via les H2
   - 4-6 sections H2 principales
   - Section FAQ avec 3-5 questions/réponses (H3 terminant par ?)
   - Conclusion avec appel à l'action vers /abonnement-iptv/#pricing
   - Dernier paragraphe: lien vers <a href="/abonnement-iptv/#pricing">Découvrir nos abonnements IPTV</a>

5. TON ET STYLE:
   - Professionnel mais accessible
   - Français correct (France, pas Québec)
   - Utilise "vous" (vouvoiement)
   - Expert et rassurant
   - Ajoute des données chiffrées quand possible (160 000+ chaînes, 20 000+ VOD, etc.)

6. SEO TECHNIQUE:
   - Le titre SEO doit être entre 55-65 caractères et contenir le mot-clé principal
   - La meta description entre 145-160 caractères, incitative au clic avec mot-clé
   - L'extrait en 2 phrases percutantes
   - 7-10 mots-clés suggérés pertinents

=== FORMAT DE RÉPONSE (JSON STRICT) ===
{
  "title": "Titre SEO optimisé (55-65 chars, mot-clé principal inclus)",
  "metaDescription": "Meta description incitative (145-160 chars, mot-clé inclus)",
  "excerpt": "2 phrases percutantes résumant l'article",
  "suggestedKeywords": ["mot1", "mot2", "mot3", "mot4", "mot5", "mot6", "mot7"],
  "category": "Guides|Tutoriels|Comparatifs|Actualités|FAQ",
  "content": "<h2>Premier titre avec mot-clé</h2><p>Contenu riche et détaillé...</p>..."
}

IMPORTANT: Le JSON doit être valide. Le contenu HTML ne doit PAS contenir de sauts de ligne à l'intérieur des balises (tout sur une ligne pour le champ content).`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'https://officieliptvsmarterspro.fr',
        'X-Title': 'IPTV Blog Generator',
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          {
            role: 'system',
            content: `Tu es un rédacteur SEO de niveau expert pour le site IPTV SMARTERS PRO (officieliptvsmarterspro.fr). Tu crées du contenu optimisé pour le référencement Google en français. Tu réponds TOUJOURS en JSON valide uniquement, sans markdown, sans backticks, juste le JSON brut.`,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_tokens: 8192,
        temperature: 0.7,
        response_format: { type: 'json_object' },
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenRouter API error:', error);
      return NextResponse.json({ 
        error: `Failed to generate article: ${error?.error?.message || 'Unknown error'}`,
        details: error 
      }, { status: 500 });
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;
    
    // Parse the JSON, handling potential markdown wrapping
    let generatedContent;
    try {
      generatedContent = JSON.parse(rawContent);
    } catch {
      // Try to extract JSON from markdown code blocks
      const jsonMatch = rawContent.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (jsonMatch) {
        generatedContent = JSON.parse(jsonMatch[1].trim());
      } else {
        // Try to find JSON object in the response
        const jsonStart = rawContent.indexOf('{');
        const jsonEnd = rawContent.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          generatedContent = JSON.parse(rawContent.slice(jsonStart, jsonEnd + 1));
        } else {
          throw new Error('Could not parse AI response as JSON');
        }
      }
    }

    // Add model info to response
    generatedContent.modelUsed = modelId;

    return NextResponse.json(generatedContent);
  } catch (error) {
    console.error('Article generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
