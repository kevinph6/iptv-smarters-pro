import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { topic, style = 'vivid' } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'OpenAI API key not configured' }, { status: 500 });
    }

    const prompt = `Create a professional, modern featured image for a blog article about "${topic}" in the IPTV and streaming industry. 
The image should be:
- Clean and professional design
- Modern tech aesthetic with gradient colors (purple, cyan, blue)
- Abstract or conceptual representation
- Suitable for a technology/streaming blog
- NO text or words in the image
- High quality, suitable for web use
- Futuristic streaming/entertainment vibe`;

    const response = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'dall-e-3',
        prompt: prompt,
        n: 1,
        size: '1792x1024',
        quality: 'standard',
        style: style,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('DALL-E API error:', error);
      return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
    }

    const data = await response.json();
    const imageUrl = data.data[0].url;

    return NextResponse.json({ imageUrl, revisedPrompt: data.data[0].revised_prompt });
  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
