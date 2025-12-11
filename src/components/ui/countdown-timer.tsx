'use client';

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export function CountdownTimer() {
  const [time, setTime] = useState({
    hours: 14,
    minutes: 32,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 14;
          minutes = 32;
          seconds = 18;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-5 h-5 text-red-400" />
        <h3 className="text-red-200 font-bold">L'offre expire dans :</h3>
      </div>
      
      <div className="flex gap-3 justify-center">
        <div className="flex flex-col items-center bg-black/40 rounded-xl px-4 py-3 min-w-[70px]">
          <span className="text-3xl font-black text-white">
            {String(time.hours).padStart(2, '0')}
          </span>
          <span className="text-xs text-white/60 uppercase mt-1">Heures</span>
        </div>
        
        <div className="flex items-center text-white/40 text-2xl font-bold">:</div>
        
        <div className="flex flex-col items-center bg-black/40 rounded-xl px-4 py-3 min-w-[70px]">
          <span className="text-3xl font-black text-white">
            {String(time.minutes).padStart(2, '0')}
          </span>
          <span className="text-xs text-white/60 uppercase mt-1">Minutes</span>
        </div>
        
        <div className="flex items-center text-white/40 text-2xl font-bold">:</div>
        
        <div className="flex flex-col items-center bg-black/40 rounded-xl px-4 py-3 min-w-[70px]">
          <span className="text-3xl font-black text-red-400 animate-pulse">
            {String(time.seconds).padStart(2, '0')}
          </span>
          <span className="text-xs text-white/60 uppercase mt-1">Secondes</span>
        </div>
      </div>
    </div>
  );
}
