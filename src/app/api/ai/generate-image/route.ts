import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic, style = 'vivid' } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenRouter API key not configured' }, { status: 500 });
    }

    const prompt = `Create a professional, modern featured image for a blog article about "${topic}" in the IPTV and streaming industry. 
The image should be:
- Clean and professional design
- Modern tech aesthetic with gradient colors (purple, cyan, blue)
- Abstract or conceptual representation
- Suitable for a technology/streaming blog
- NO text or words in the image
- High quality, suitable for web use
- Futuristic streaming/entertainment vibe
- Aspect ratio 16:9`;

    console.log(`Generating image with Gemini for: "${topic}"...`);

    // Use Gemini via Chat Completions
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
        'X-Title': 'IPTV Blog Generator',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-image-preview',
        max_tokens: 1024,
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt }
            ]
          }
        ],
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenRouter/Gemini API error:', error);
      
      // Fallback
      return NextResponse.json({ 
        imageUrl: `https://placehold.co/1792x1024/6366f1/ffffff?text=${encodeURIComponent(topic.substring(0, 30))}`,
        message: 'Image generation failed, using placeholder'
      });
    }

    const data = await response.json();
    
    // Extract image
    let imageUrl = null;
    if (data.choices && data.choices[0] && data.choices[0].message) {
      if (data.choices[0].message.images && data.choices[0].message.images.length > 0) {
        imageUrl = data.choices[0].message.images[0];
      } else if (data.choices[0].message.content && data.choices[0].message.content.startsWith('http')) {
        imageUrl = data.choices[0].message.content;
      }
    }

    if (!imageUrl) {
        console.error('No image in Gemini response:', data);
        return NextResponse.json({ 
            imageUrl: `https://placehold.co/1792x1024/6366f1/ffffff?text=${encodeURIComponent(topic.substring(0, 30))}`,
            message: 'No image generated'
        });
    }

    return NextResponse.json({ imageUrl, revisedPrompt: prompt });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
