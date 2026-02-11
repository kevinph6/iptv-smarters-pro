import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

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
- Abstract or conceptual representation of streaming/IPTV
- Suitable for a technology/streaming blog
- NO text or words in the image at all
- High quality, suitable for web use
- Futuristic streaming/entertainment vibe
- Include visual elements related to: TV screens, streaming waves, satellite signals, remote controls, smart devices
- Aspect ratio 16:9
- Resolution: 1792x1024`;

    console.log(`Generating image with Gemini Flash for: "${topic}"...`);

    // Use Gemini Flash via OpenRouter for image generation
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'https://officieliptvsmarterspro.fr',
        'X-Title': 'IPTV Blog Image Generator',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-preview:thinking',
        max_tokens: 2048,
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
      
      // Try alternative model
      console.log('Trying alternative image generation...');
      return await generateFallbackImage(apiKey, topic);
    }

    const data = await response.json();
    
    // Extract image from response
    let imageUrl = null;
    let imageBase64 = null;
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      const message = data.choices[0].message;
      
      // Check for inline images (base64)
      if (message.content && Array.isArray(message.content)) {
        for (const part of message.content) {
          if (part.type === 'image_url' && part.image_url?.url) {
            if (part.image_url.url.startsWith('data:')) {
              imageBase64 = part.image_url.url;
            } else {
              imageUrl = part.image_url.url;
            }
          }
        }
      }
      
      // Check for images array
      if (!imageUrl && !imageBase64 && message.images && message.images.length > 0) {
        const img = message.images[0];
        if (img.startsWith('data:')) {
          imageBase64 = img;
        } else {
          imageUrl = img;
        }
      }
      
      // Check for direct URL in content
      if (!imageUrl && !imageBase64 && typeof message.content === 'string' && message.content.startsWith('http')) {
        imageUrl = message.content;
      }
    }

    // If we got base64, save it locally
    if (imageBase64) {
      const savedPath = await saveBase64Image(imageBase64, topic);
      if (savedPath) {
        return NextResponse.json({ imageUrl: savedPath, revisedPrompt: prompt });
      }
    }

    // If we got a URL, download and save locally
    if (imageUrl) {
      const savedPath = await downloadAndSaveImage(imageUrl, topic);
      if (savedPath) {
        return NextResponse.json({ imageUrl: savedPath, revisedPrompt: prompt });
      }
      // If local save fails, return the URL directly
      return NextResponse.json({ imageUrl, revisedPrompt: prompt });
    }

    // No image generated, use a themed placeholder
    console.error('No image in Gemini response:', JSON.stringify(data).substring(0, 500));
    return NextResponse.json({ 
      imageUrl: generatePlaceholderUrl(topic),
      message: 'Using placeholder - image generation returned no image'
    });

  } catch (error) {
    console.error('Image generation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateFallbackImage(apiKey: string, topic: string): Promise<NextResponse> {
  try {
    // Try with a different Gemini model
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_BASE_URL || 'https://officieliptvsmarterspro.fr',
        'X-Title': 'IPTV Blog Image Generator',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-preview:thinking',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: `Generate a professional blog featured image about "${topic}" for an IPTV streaming technology website. Modern, clean, purple/cyan gradient tech aesthetic. No text in the image. 16:9 aspect ratio.`
          }
        ],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      if (data.choices?.[0]?.message?.images?.[0]) {
        const img = data.choices[0].message.images[0];
        if (img.startsWith('data:')) {
          const savedPath = await saveBase64Image(img, topic);
          if (savedPath) {
            return NextResponse.json({ imageUrl: savedPath });
          }
        }
        return NextResponse.json({ imageUrl: img });
      }
    }
  } catch (e) {
    console.error('Fallback image generation failed:', e);
  }
  
  return NextResponse.json({ 
    imageUrl: generatePlaceholderUrl(topic),
    message: 'Using placeholder image'
  });
}

function generatePlaceholderUrl(topic: string): string {
  const shortTopic = topic.substring(0, 30).replace(/[^a-zA-Z0-9\s]/g, '');
  return `https://placehold.co/1792x1024/6366f1/ffffff?text=${encodeURIComponent(shortTopic)}`;
}

async function saveBase64Image(base64Data: string, topic: string): Promise<string | null> {
  try {
    // Extract the actual base64 data
    const matches = base64Data.match(/^data:image\/(\w+);base64,(.+)$/);
    if (!matches) return null;

    const ext = matches[1] === 'jpeg' ? 'jpg' : matches[1];
    const buffer = Buffer.from(matches[2], 'base64');
    
    // Generate a slug-based filename
    const slug = topic.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);
    
    const timestamp = Date.now();
    const filename = `blog-${slug}-${timestamp}.${ext}`;
    
    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'blog');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);
    
    console.log(`Image saved to: /uploads/blog/${filename}`);
    return `/uploads/blog/${filename}`;
  } catch (error) {
    console.error('Failed to save base64 image:', error);
    return null;
  }
}

async function downloadAndSaveImage(url: string, topic: string): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
    const buffer = Buffer.from(await response.arrayBuffer());
    
    const slug = topic.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .substring(0, 50);
    
    const timestamp = Date.now();
    const filename = `blog-${slug}-${timestamp}.${ext}`;
    
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'blog');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }
    
    const filePath = path.join(uploadsDir, filename);
    await writeFile(filePath, buffer);
    
    console.log(`Image downloaded and saved to: /uploads/blog/${filename}`);
    return `/uploads/blog/${filename}`;
  } catch (error) {
    console.error('Failed to download and save image:', error);
    return null;
  }
}
