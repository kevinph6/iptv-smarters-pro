'use client';

import { AlertTriangle } from 'lucide-react';

interface StockIndicatorProps {
  stock: number;
}

export function StockIndicator({ stock }: StockIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-red-400 text-sm animate-pulse">
      <AlertTriangle className="w-4 h-4" />
      <span className="font-bold">⚠️ Seulement {stock} serveurs restants en stock !</span>
    </div>
  );
}
