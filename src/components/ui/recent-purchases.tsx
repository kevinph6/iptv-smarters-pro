'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

interface RecentPurchasesProps {
  productName: string;
}

const purchaseNotifications = [
  { name: 'John', location: 'USA', time: 5 },
  { name: 'Marie', location: 'France', time: 12 },
  { name: 'Ahmed', location: 'Canada', time: 8 },
  { name: 'Sofia', location: 'Espagne', time: 3 },
  { name: 'Lucas', location: 'Belgique', time: 15 },
  { name: 'Emma', location: 'Suisse', time: 7 },
  { name: 'Mohammed', location: 'Maroc', time: 10 },
  { name: 'Sarah', location: 'Allemagne', time: 6 }
];

export function RecentPurchases({ productName }: RecentPurchasesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showInterval = setInterval(() => {
      setIsVisible(true);
      setCurrentIndex(prev => (prev + 1) % purchaseNotifications.length);
      
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, 8000);

    setIsVisible(true);

    return () => clearInterval(showInterval);
  }, []);

  const notification = purchaseNotifications[currentIndex];

  return (
    <div className={`fixed bottom-6 left-6 z-50 transition-all duration-500 ${
      isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-2xl p-4 max-w-sm border border-green-400/30">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <Check className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm">
              ✅ {notification.name} de {notification.location}
            </p>
            <p className="text-white/90 text-xs mt-1">
              vient d'acheter il y a {notification.time} minutes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
