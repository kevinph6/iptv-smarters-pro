"use client";

import { Share2 } from 'lucide-react';
import { toast } from 'sonner';

export function ShareButton({ title, excerpt }: { title: string; excerpt: string }) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        toast.success('Lien copie dans le presse-papier !');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Lien copie dans le presse-papier !');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
    >
      <Share2 className="w-4 h-4" />
      <span>Partager</span>
    </button>
  );
}
