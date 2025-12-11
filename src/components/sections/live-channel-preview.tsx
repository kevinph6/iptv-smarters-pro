'use client';

import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const channels = [
  {
    id: 1,
    name: 'BeIN Sports',
    category: 'Sport IPTV',
    description: 'Champions League, Ligue 1, Premier League en direct',
    thumbnail: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/modern-streaming-channel-preview-thumbna-f5358c20-20251205185305.jpg',
    quality: '4K'
  },
  {
    id: 2,
    name: 'Cinéma Premium',
    category: 'Films & Séries',
    description: 'Netflix, Amazon Prime, films en première diffusion',
    thumbnail: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/modern-streaming-channel-preview-thumbna-f5358c20-20251205185305.jpg',
    quality: 'FHD'
  },
  {
    id: 3,
    name: 'News 24/7',
    category: 'Actualités',
    description: 'BFM TV, France Info, CNN en temps réel',
    thumbnail: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/modern-streaming-channel-preview-thumbna-f5358c20-20251205185305.jpg',
    quality: 'HD'
  },
  {
    id: 4,
    name: 'Documentaires',
    category: 'Culture',
    description: 'National Geographic, Discovery, Arte',
    thumbnail: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/modern-streaming-channel-preview-thumbna-f5358c20-20251205185305.jpg',
    quality: 'FHD'
  },
  {
    id: 5,
    name: 'Enfants',
    category: 'Kids',
    description: 'Disney Channel, Cartoon Network, Nickelodeon',
    thumbnail: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/modern-streaming-channel-preview-thumbna-f5358c20-20251205185305.jpg',
    quality: 'HD'
  },
  {
    id: 6,
    name: 'Musique',
    category: 'Entertainment',
    description: 'MTV, NRJ Hits, concerts en direct',
    thumbnail: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/modern-streaming-channel-preview-thumbna-f5358c20-20251205185305.jpg',
    quality: '4K'
  }
];

export default function LiveChannelPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, channels.length - 2));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, channels.length - 2)) % Math.max(1, channels.length - 2));
  };

  return (
    <section className="relative py-20 px-6 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(168,85,247,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(6,182,212,0.1),transparent_50%)]" />
      
      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 text-sm font-bold uppercase tracking-wider mb-4">
            Aperçu en Direct
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Découvrez Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Chaînes Populaires</span>
          </h2>
          <p className="text-white/70 text-lg max-w-3xl mx-auto">
            Plus de <span className="text-cyan-400 font-bold">160 000 chaînes</span> disponibles en qualité 4K, Full HD et HD. 
            Explorez nos catégories Sport, Cinéma, News, Documentaires et plus encore.
          </p>
        </div>

        {/* Channel Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            aria-label="Previous channels"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-cyan-400" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 rounded-full p-3 transition-all duration-300 hover:scale-110 group"
            aria-label="Next channels"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-cyan-400" />
          </button>

          {/* Channel Cards */}
          <div className="overflow-hidden px-12">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
            >
              {channels.map((channel) => (
                <div
                  key={channel.id}
                  className="flex-shrink-0 w-full md:w-[calc(33.33%-16px)] group cursor-pointer"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2">
                    {/* Thumbnail */}
                    <div className="relative aspect-video bg-gradient-to-br from-purple-900/20 to-cyan-900/20">
                      <Image
                        src={channel.thumbnail}
                        alt={channel.name}
                        fill
                        className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-300">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                          <Play className="w-7 h-7 text-white fill-white ml-1" />
                        </div>
                      </div>
                      
                      {/* Quality Badge */}
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold shadow-lg">
                        {channel.quality}
                      </div>
                      
                      {/* Live Indicator */}
                      <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/90 backdrop-blur-sm">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span className="text-white text-xs font-bold uppercase">En Direct</span>
                      </div>
                    </div>
                    
                    {/* Channel Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {channel.name}
                        </h3>
                        <span className="text-xs text-cyan-400 font-semibold bg-cyan-500/10 px-2 py-1 rounded">
                          {channel.category}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              160K+
            </div>
            <div className="text-white/60 text-sm font-medium">Chaînes Disponibles</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              20K+
            </div>
            <div className="text-white/60 text-sm font-medium">Films & Séries VOD</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              100+
            </div>
            <div className="text-white/60 text-sm font-medium">Pays Couverts</div>
          </div>
          
          <div className="text-center p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10">
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-2">
              4K
            </div>
            <div className="text-white/60 text-sm font-medium">Qualité Ultra HD</div>
          </div>
        </div>
      </div>
    </section>
  );
}
