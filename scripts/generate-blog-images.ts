
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';

// Define schema locally to avoid import issues
const blogPosts = sqliteTable('blog_posts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  author: text('author').notNull(),
  category: text('category').notNull(),
  featuredImageUrl: text('featured_image_url'),
  published: integer('published', { mode: 'boolean' }).notNull().default(true),
  createdAt: text('created_at').notNull(),
  updatedAt: text('updated_at').notNull(),
});

const client = createClient({
  url: process.env.TURSO_CONNECTION_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

const db = drizzle(client);

async function generateImage(title: string, excerpt: string) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is not set');

  const prompt = `Create a high-quality, professional, and modern featured image for a blog post titled "${title}". 
Context: ${excerpt.substring(0, 100)}...
Style: Modern technology, streaming, digital entertainment, IPTV, sleek, vibrant colors (purple, cyan, dark theme), cinematic lighting. 
No text in the image. 16:9 aspect ratio.`;

  console.log(`Generating image for: "${title}"...`);

  try {
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
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt }
            ]
          }
        ],
        // No explicit "modalities" param needed for OpenRouter usually if using the image model,
        // but docs said "modalities parameter set to include both 'image' and 'text'".
        // However, OpenRouter's OpenAI compatible endpoint often auto-handles this if the model is image-only or multimodal.
        // Let's try standard chat completion first.
        // If it fails, I might need to check specific OpenRouter format.
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} ${response.statusText}`, errorText);
      return null;
    }

    const data = await response.json();
    
    // Check for image in response
    // According to OpenRouter docs for this model: "the assistant message includes an images field containing the generated images as base64-encoded data URLs"
    // The response structure might be slightly different than standard OpenAI.
    // Let's inspect the response if we can.
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      // Check for 'images' field in message or content
      // Some providers put it in data.choices[0].message.images (if using non-standard key)
      // Or in content as markdown?
      // OpenRouter docs said "assistant message includes an images field".
      
      const message = data.choices[0].message;
      let imageUrl = null;

      // Case 1: images field in message (OpenRouter specific extension)
      if (message.images && message.images.length > 0) {
        imageUrl = message.images[0];
      }
      // Case 2: content contains url (less likely for this model based on docs, but possible)
      else if (message.content && message.content.startsWith('http')) {
         imageUrl = message.content;
      }
      
      // If imageUrl is base64 (data:image/png;base64,...), we need to save it.
      return imageUrl;
    }
    
    console.log('Unexpected response format:', JSON.stringify(data).substring(0, 200));
    return null;

  } catch (error) {
    console.error('Error calling OpenRouter:', error);
    return null;
  }
}

async function main() {
  console.log('Starting blog image generation...');
  
  // Ensure directory exists
  const publicDir = path.join(process.cwd(), 'public');
  const blogImagesDir = path.join(publicDir, 'images', 'blog');
  
  if (!fs.existsSync(blogImagesDir)) {
    console.log(`Creating directory: ${blogImagesDir}`);
    fs.mkdirSync(blogImagesDir, { recursive: true });
  }

  const posts = await db.select().from(blogPosts);
  console.log(`Found ${posts.length} posts.`);

  for (const post of posts) {
    console.log(`Processing post: ${post.id} - ${post.title}`);
    
    // Generate Image
    const imageData = await generateImage(post.title, post.excerpt);
    
    if (imageData) {
      // Save image
      const filename = `${post.slug}.png`;
      const filePath = path.join(blogImagesDir, filename);
      const publicPath = `/images/blog/${filename}`;
      
      try {
        if (imageData.startsWith('data:image')) {
          // Base64
          const base64Data = imageData.split(';base64,').pop();
          if (base64Data) {
            fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });
            console.log(`Saved image to ${filePath}`);
            
            // Update DB
            await db.update(blogPosts)
              .set({ featuredImageUrl: publicPath })
              .where(eq(blogPosts.id, post.id));
            console.log(`Updated database for post ${post.id}`);
          }
        } else if (imageData.startsWith('http')) {
          // URL - download it
          const imgRes = await fetch(imageData);
          if (imgRes.ok) {
            const buffer = await imgRes.arrayBuffer();
            fs.writeFileSync(filePath, Buffer.from(buffer));
            console.log(`Downloaded and saved image to ${filePath}`);
            
            // Update DB
            await db.update(blogPosts)
              .set({ featuredImageUrl: publicPath })
              .where(eq(blogPosts.id, post.id));
             console.log(`Updated database for post ${post.id}`);
          }
        } else {
            console.log('Unknown image data format');
        }
      } catch (err) {
        console.error(`Error saving image for post ${post.id}:`, err);
      }
    } else {
      console.log(`Failed to generate image for post ${post.id}`);
    }
    
    // Wait a bit to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log('Done!');
}

main().catch(console.error);
