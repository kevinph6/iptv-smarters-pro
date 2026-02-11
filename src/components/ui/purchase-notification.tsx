"use client";

import { useEffect, useState } from "react";
import { ShoppingCart, X, CheckCircle2 } from "lucide-react";

interface PurchaseNotification {
  id: string;
  name: string;
  plan: string;
  time: string;
}

const notifications: PurchaseNotification[] = [
  { id: "1", name: "Mohammed", plan: "12 mois IPTV Premium", time: "Il y a 2 minutes" },
  { id: "2", name: "Sophie", plan: "6 Mois IPTV", time: "Il y a 5 minutes" },
  { id: "3", name: "Alexandre", plan: "24 Mois IPTV Premium", time: "Il y a 8 minutes" },
  { id: "4", name: "Fatima", plan: "12 mois IPTV", time: "Il y a 12 minutes" },
  { id: "5", name: "Jean", plan: "3 Mois IPTV Premium", time: "Il y a 15 minutes" },
  { id: "6", name: "Amina", plan: "6 Mois IPTV Premium", time: "Il y a 18 minutes" },
  { id: "7", name: "Thomas", plan: "12 mois IPTV", time: "Il y a 22 minutes" },
  { id: "8", name: "Yasmine", plan: "24 Mois IPTV Premium", time: "Il y a 25 minutes" },
];

function maskName(name: string): string {
  if (name.length <= 2) return name;
  const firstChar = name[0];
  const stars = "*".repeat(name.length - 1);
  return firstChar + stars;
}

function getInitials(name: string): string {
  return name.charAt(0).toUpperCase();
}

function getRandomGradient(name: string): string {
  const gradients = [
    "bg-gradient-to-br from-purple-600 to-purple-800",
    "bg-gradient-to-br from-pink-600 to-pink-800",
    "bg-gradient-to-br from-indigo-600 to-indigo-800",
    "bg-gradient-to-br from-violet-600 to-violet-800",
    "bg-gradient-to-br from-fuchsia-600 to-fuchsia-800",
  ];
  const index = name.charCodeAt(0) % gradients.length;
  return gradients[index];
}

export function PurchaseNotification() {
  const [currentNotification, setCurrentNotification] = useState<PurchaseNotification | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed) return;

    const showRandomNotification = () => {
      const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
      setCurrentNotification(randomNotification);
      setIsVisible(true);

      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(showRandomNotification, 5000);

    // Show subsequent notifications every 60-90 seconds
    const interval = setInterval(() => {
      if (!isVisible) {
        showRandomNotification();
      }
    }, Math.random() * 30000 + 60000); // Random between 60-90 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [isVisible, isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
  };

  if (!currentNotification || isDismissed) return null;

  return (
    <div
      className={`hidden md:block fixed md:left-6 md:bottom-6 z-50 transition-all duration-700 ease-out ${
        isVisible
          ? "translate-x-0 opacity-100 scale-100"
          : "-translate-x-full opacity-0 scale-95 pointer-events-none"
      }`}
    >
      <div className="bg-white rounded-xl shadow-[0_20px_50px_rgba(93,63,211,0.25)] border border-purple-100/50 overflow-hidden w-[200px] md:w-[280px] backdrop-blur-xl hover:shadow-[0_25px_60px_rgba(93,63,211,0.35)] transition-all duration-300">
        {/* Animated gradient border */}
        <div className="h-0.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
        
        <div className="p-2.5 md:p-3 relative">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-700 transition-all duration-200 p-0.5 rounded-lg hover:bg-gray-100 group"
            aria-label="Fermer la notification"
          >
            <X className="w-3 h-3 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="flex items-start gap-2 md:gap-2.5 mb-2 md:mb-2.5">
            {/* Avatar with gradient */}
            <div className="relative flex-shrink-0">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full ${getRandomGradient(
                  currentNotification.name
                )} flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-purple-100/50`}
              >
                {getInitials(currentNotification.name)}
              </div>
              {/* Shopping cart badge */}
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-2 h-2 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pt-0.5">
              <div className="flex items-center gap-1 mb-1">
                <p className="text-[10px] md:text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  Nouvel achat vérifié
                </p>
                <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0" />
              </div>
              
              <p className="text-xs md:text-sm text-gray-900 font-bold mb-0.5 md:mb-1">
                {maskName(currentNotification.name)}
              </p>
              
              <p className="text-[10px] md:text-xs text-gray-700 leading-relaxed mb-1">
                vient d'acheter{" "}
                <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                  {currentNotification.plan}
                </span>
              </p>
              
              <p className="text-[10px] md:text-xs text-gray-500 flex items-center gap-1">
                <span className="w-1 h-1 bg-gray-400 rounded-full" />
                {currentNotification.time}
              </p>
            </div>
          </div>

          {/* Bottom bar with pulse effect */}
          <div className="pt-2 md:pt-2.5 border-t border-gray-100">
            <div className="flex items-center gap-1.5 md:gap-2">
              <div className="relative flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping absolute" />
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full relative" />
              </div>
              <span className="text-[10px] md:text-xs font-semibold text-green-600">
                Commande vérifiée
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}