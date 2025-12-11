'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface LiveViewersProps {
  count: number;
}

export function LiveViewers({ count }: LiveViewersProps) {
  const [viewers, setViewers] = useState(count);

  useEffect(() => {
    const interval = setInterval(() => {
      const change = Math.random() > 0.5 ? 1 : -1;
      setViewers(prev => Math.max(1, Math.min(prev + change, count + 5)));
    }, 3000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="flex items-center gap-2 text-blue-400 text-sm">
      <Eye className="w-4 h-4 animate-pulse" />
      <span className="font-medium">
        👁️ <span className="font-bold">{viewers}</span> personnes consultent cette offre en ce moment
      </span>
    </div>
  );
}
