"use client";

import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const reviews = [
  {
    id: 1,
    name: "Marie Dubois",
    date: "Il y a 2 jours",
    rating: 5,
    title: "Excellent service, très stable",
    content: "Abonné depuis 6 mois et vraiment satisfait. Les chaînes françaises sont en parfaite qualité, aucune coupure. Le service client répond rapidement sur WhatsApp. Je recommande vivement !",
    verified: true
  },
  {
    id: 2,
    name: "Laurent Petit",
    date: "Il y a 5 jours",
    rating: 5,
    title: "Meilleur IPTV que j'ai testé",
    content: "J'ai essayé plusieurs services IPTV avant celui-ci. IPTV Smarters Pro est de loin le plus stable avec une activation instantanée. Les matchs de Ligue 1 sont impeccables en 4K.",
    verified: true
  },
  {
    id: 3,
    name: "Sophie Martin",
    date: "Il y a 1 semaine",
    rating: 5,
    title: "Parfait pour toute la famille",
    content: "Nous avons pris l'abonnement 12 mois et c'est parfait. Les enfants regardent leurs dessins animés, mon mari les sports, et moi mes séries. Plus de 120 000 chaînes, on trouve tout !",
    verified: true
  },
  {
    id: 4,
    name: "Pierre Lefebvre",
    date: "Il y a 1 semaine",
    rating: 4,
    title: "Très bon rapport qualité-prix",
    content: "Service sérieux et professionnel. L'activation a pris seulement 3 minutes. Quelques micro-coupures de temps en temps mais rien de grave. Content de mon achat.",
    verified: true
  },
  {
    id: 5,
    name: "Camille Bernard",
    date: "Il y a 2 semaines",
    rating: 5,
    title: "Installation facile et rapide",
    content: "Même pour quelqu'un qui n'est pas très technique comme moi, l'installation était super simple. Le guide étape par étape est très clair. Fonctionne parfaitement sur ma Smart TV Samsung.",
    verified: true
  },
  {
    id: 6,
    name: "Thomas Rousseau",
    date: "Il y a 2 semaines",
    rating: 5,
    title: "Excellent pour le sport",
    content: "Fan de foot et de formule 1, j'ai tous les matchs en direct. La qualité 4K est incroyable, c'est comme être au stade. RMC Sport, Canal+, BeIN, tout est là !",
    verified: true
  },
  {
    id: 7,
    name: "Isabelle Moreau",
    date: "Il y a 3 semaines",
    rating: 5,
    title: "Service client au top",
    content: "J'avais un problème de configuration et le support m'a aidé en moins de 10 minutes via WhatsApp. Très réactifs et professionnels. Le service fonctionne à merveille maintenant.",
    verified: true
  },
  {
    id: 8,
    name: "Antoine Simon",
    date: "Il y a 3 semaines",
    rating: 4,
    title: "Bon service, quelques améliorations possibles",
    content: "Dans l'ensemble très satisfait. Les chaînes françaises sont excellentes. J'aimerais juste avoir plus de chaînes africaines. Sinon rien à redire, service stable et fiable.",
    verified: true
  },
  {
    id: 9,
    name: "Julie Garnier",
    date: "Il y a 1 mois",
    rating: 5,
    title: "Fonctionne sur tous mes appareils",
    content: "J'utilise l'abonnement sur mon iPhone, ma tablette et ma Fire TV Stick. Tout fonctionne parfaitement et je peux regarder dans toutes les pièces. Super pratique !",
    verified: true
  },
  {
    id: 10,
    name: "François Bonnet",
    date: "Il y a 1 mois",
    rating: 5,
    title: "Adieu Netflix et Canal+",
    content: "J'ai résilié tous mes abonnements streaming. Avec IPTV Smarters Pro j'ai tout ce qu'il me faut pour 10 fois moins cher. Films, séries, sports, documentaires... Un seul abonnement pour tout !",
    verified: true
  },
  {
    id: 11,
    name: "Nathalie Leroy",
    date: "Il y a 1 mois",
    rating: 5,
    title: "Qualité d'image exceptionnelle",
    content: "La qualité 4K est vraiment au rendez-vous. J'ai une TV 4K et l'image est parfaite. Les films et séries sont en haute définition, aucun souci de buffering.",
    verified: true
  },
  {
    id: 12,
    name: "Julien Fournier",
    date: "Il y a 2 mois",
    rating: 5,
    title: "Abonnement 24 mois excellent",
    content: "J'ai pris l'offre 24 mois avec les 4 mois gratuits. Excellent investissement ! Ça fait maintenant 5 mois et jamais eu le moindre problème. Service ultra stable.",
    verified: true
  }
];

export default function ReviewsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const scroll = () => {
      if (!isPaused && container) {
        scrollPosition += scrollSpeed;
        
        // Reset scroll when reaching halfway (seamless loop)
        if (scrollPosition >= container.scrollWidth / 2) {
          scrollPosition = 0;
        }
        
        container.scrollLeft = scrollPosition;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPaused]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-5 h-5 ${
              index < rating
                ? "fill-[#00b67a] text-[#00b67a]"
                : "fill-gray-300 text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <section className="bg-white py-20 overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-[#00b67a] text-[#00b67a]" />
              ))}
            </div>
            <span className="text-2xl font-bold text-gray-900">4.9/5</span>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-3">
            Avis de nos clients
          </h2>
          <p className="text-lg text-gray-600">
            Plus de 15 000 clients satisfaits nous font confiance
          </p>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        style={{ scrollBehavior: "auto" }}
      >
        {/* Duplicate reviews for seamless loop */}
        {[...reviews, ...reviews].map((review, index) => (
          <div
            key={`${review.id}-${index}`}
            className="flex-shrink-0 w-[380px] bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                {renderStars(review.rating)}
              </div>
              {review.verified && (
                <div className="flex items-center gap-1 text-xs text-[#00b67a] font-semibold">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                  Vérifié
                </div>
              )}
            </div>

            <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
              {review.title}
            </h3>

            <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-4">
              {review.content}
            </p>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {review.name}
                  </p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                  {review.name.charAt(0)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">
          Défilement automatique • Survolez pour mettre en pause
        </p>
      </div>
    </section>
  );
}
