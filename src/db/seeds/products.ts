import { db } from '../index';
import { products, productReviews } from '../schema';

const productsData = [
  {
    slug: 'iptv-hd-3-mois',
    title: '3 Mois',
    subtitle: 'IPTV HD',
    description: `Découvrez notre abonnement IPTV HD de 3 mois, parfait pour tester notre service premium. Profitez de 120 000+ chaînes en haute définition, incluant des chaînes françaises, internationales, sportives et de divertissement.

**Caractéristiques principales:**
- 📺 120 000+ chaînes live en HD
- 🎬 20 000+ films et séries VOD
- ⚡ Activation instantanée
- 🔄 Mise à jour gratuite
- 🌍 Chaînes du monde entier
- 💻 Compatible tous appareils
- 🔥 Serveur stable et rapide
- 💬 Support client 24/7

Idéal pour découvrir la télévision par internet avec une qualité HD exceptionnelle.`,
    price: '19',
    cents: '00',
    duration: '3 mois',
    type: 'HD',
    gradient: 'from-cyan-500 to-blue-500',
    icon: 'Zap',
    popular: false,
    checkoutUrl: '#',
    images: JSON.stringify([
      '/images/products/iptv-hd.jpg',
      '/images/products/channels.jpg',
      '/images/products/devices.jpg'
    ]),
    features: JSON.stringify([
      { text: "Activation instantanée !", icon: "⚡" },
      { text: "Mise à jour gratuite", icon: "🔄" },
      { text: "120K+ chaînes & VOD", icon: "📺" },
      { text: "Chaînes 4K FHD HD", icon: "🎬" },
      { text: "Chaînes Premium", icon: "⭐" },
      { text: "Rapide et stable", icon: "🚀" },
      { text: "M3U & MAG & Enigma", icon: "📱" },
      { text: "Smart TV & Mobile & PC", icon: "💻" },
      { text: "Serveur disponible", icon: "🔥" },
      { text: "Support 24/7", icon: "💬" }
    ]),
    rating: '4.7',
    reviewCount: 127,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'iptv-hd-6-mois',
    title: '6 Mois',
    subtitle: 'IPTV HD',
    description: `Notre abonnement IPTV HD de 6 mois offre le meilleur rapport qualité-prix. Profitez d'une expérience de streaming ininterrompue avec accès à 120 000+ chaînes en haute définition.

**Avantages:**
- 📺 Accès complet à toutes les chaînes HD
- 🎬 Bibliothèque VOD constamment mise à jour
- ⚡ Installation simple et rapide
- 🔄 Mises à jour automatiques
- 🌍 Chaînes françaises et internationales
- 💻 Multi-appareils (jusqu'à 2 connexions)
- 🔥 99.9% de disponibilité
- 💬 Support prioritaire 24/7

Économisez avec cet abonnement semestriel tout en profitant d'une qualité HD exceptionnelle.`,
    price: '22',
    cents: '00',
    duration: '6 mois',
    type: 'HD',
    gradient: 'from-purple-500 to-pink-500',
    icon: 'Star',
    popular: false,
    checkoutUrl: '#',
    images: JSON.stringify([
      '/images/products/iptv-hd.jpg',
      '/images/products/channels.jpg',
      '/images/products/devices.jpg'
    ]),
    features: JSON.stringify([
      { text: "Activation instantanée !", icon: "⚡" },
      { text: "Mise à jour gratuite", icon: "🔄" },
      { text: "120K+ chaînes & VOD", icon: "📺" },
      { text: "Chaînes 4K FHD HD", icon: "🎬" },
      { text: "Chaînes Premium", icon: "⭐" },
      { text: "Rapide et stable", icon: "🚀" },
      { text: "M3U & MAG & Enigma", icon: "📱" },
      { text: "Smart TV & Mobile & PC", icon: "💻" },
      { text: "Serveur disponible", icon: "🔥" },
      { text: "Support 24/7", icon: "💬" }
    ]),
    rating: '4.8',
    reviewCount: 243,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'iptv-hd-12-mois',
    title: '12 Mois',
    subtitle: 'IPTV HD',
    description: `L'abonnement IPTV HD le plus populaire ! 12 mois d'accès illimité à 120 000+ chaînes en haute définition. Notre offre la plus demandée avec le meilleur prix par mois.

**Pourquoi choisir ce pack:**
- 📺 120 000+ chaînes en HD/FHD
- 🎬 20 000+ films et séries en VOD
- ⚡ Activation en moins de 5 minutes
- 🔄 Mises à jour et maintenance incluses
- 🌍 Chaînes de 60+ pays
- 💻 Compatible tous appareils (Smart TV, Box, Mobile, PC)
- 🔥 Serveur ultra-stable, anti-freeze
- 💬 Support dédié 24/7 avec réponse rapide
- 🎁 Guide EPG complet

Meilleur choix pour une année complète de divertissement sans limite !`,
    price: '39',
    cents: '00',
    duration: '12 mois',
    type: 'HD',
    gradient: 'from-amber-500 to-orange-500',
    icon: 'Crown',
    popular: true,
    checkoutUrl: 'https://www.officielsmarterspro.fr/step/iptv-smarters-12-mois-2/',
    images: JSON.stringify([
      '/images/products/iptv-hd.jpg',
      '/images/products/channels.jpg',
      '/images/products/devices.jpg'
    ]),
    features: JSON.stringify([
      { text: "Activation instantanée !", icon: "⚡" },
      { text: "Mise à jour gratuite", icon: "🔄" },
      { text: "120K+ chaînes & VOD", icon: "📺" },
      { text: "Chaînes 4K FHD HD", icon: "🎬" },
      { text: "Chaînes Premium", icon: "⭐" },
      { text: "Rapide et stable", icon: "🚀" },
      { text: "M3U & MAG & Enigma", icon: "📱" },
      { text: "Smart TV & Mobile & PC", icon: "💻" },
      { text: "Serveur disponible", icon: "🔥" },
      { text: "Support 24/7", icon: "💬" }
    ]),
    rating: '4.9',
    reviewCount: 856,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'iptv-hd-24-mois',
    title: '24 Mois',
    subtitle: 'IPTV HD',
    description: `Profitez de 2 ans d'IPTV HD avec notre abonnement le plus économique ! Sécurisez votre accès à long terme avec le meilleur prix du marché.

**Avantages exclusifs:**
- 📺 120 000+ chaînes disponibles 24/7
- 🎬 Bibliothèque VOD premium illimitée
- ⚡ Configuration simple en quelques clics
- 🔄 Garantie de service pendant 24 mois
- 🌍 Couverture mondiale - tous les continents
- 💻 Multi-connexions sur tous vos appareils
- 🔥 Infrastructure serveur premium
- 💬 Support VIP 24/7 avec assistance prioritaire
- 🎁 Bonus: applications et guides inclus

Le choix intelligent pour 2 ans de divertissement sans souci au meilleur prix !`,
    price: '59',
    cents: '00',
    duration: '24 mois',
    type: 'HD',
    gradient: 'from-emerald-500 to-teal-500',
    icon: 'Rocket',
    popular: false,
    checkoutUrl: '#',
    images: JSON.stringify([
      '/images/products/iptv-hd.jpg',
      '/images/products/channels.jpg',
      '/images/products/devices.jpg'
    ]),
    features: JSON.stringify([
      { text: "Activation instantanée !", icon: "⚡" },
      { text: "Mise à jour gratuite", icon: "🔄" },
      { text: "120K+ chaînes & VOD", icon: "📺" },
      { text: "Chaînes 4K FHD HD", icon: "🎬" },
      { text: "Chaînes Premium", icon: "⭐" },
      { text: "Rapide et stable", icon: "🚀" },
      { text: "M3U & MAG & Enigma", icon: "📱" },
      { text: "Smart TV & Mobile & PC", icon: "💻" },
      { text: "Serveur disponible", icon: "🔥" },
      { text: "Support 24/7", icon: "💬" }
    ]),
    rating: '4.8',
    reviewCount: 412,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'iptv-premium-4k-3-mois',
    title: '3 Mois',
    subtitle: 'PREMIUM 4K',
    description: `Découvrez l'excellence avec notre abonnement Premium 4K de 3 mois. Profitez de la meilleure qualité d'image disponible avec nos serveurs premium ultra-rapides.

**Premium 4K inclut:**
- 📺 120 000+ chaînes en 4K/FHD/HD
- 🎬 20 000+ films et séries en 4K
- 🔞 Accès au contenu adulte premium (+18)
- ⚡ Activation immédiate
- 🔄 Mises à jour prioritaires
- 🌍 Tous les sports et événements en 4K
- 💻 Streaming jusqu'à 4K sur tous appareils
- 🔥 Serveurs dédiés premium - zéro lag
- 💬 Support VIP 24/7

La qualité 4K transformera votre expérience de visionnage !`,
    price: '27',
    cents: '00',
    duration: '3 mois',
    type: 'PREMIUM_4K',
    gradient: 'from-rose-500 to-pink-600',
    icon: 'Star',
    popular: false,
    checkoutUrl: '#',
    images: JSON.stringify([
      '/images/products/iptv-4k.jpg',
      '/images/products/premium-channels.jpg',
      '/images/products/devices.jpg'
    ]),
    features: JSON.stringify([
      { text: "Activation instantanée !", icon: "⚡" },
      { text: "Mise à jour gratuite", icon: "🔄" },
      { text: "120K+ chaînes & VOD", icon: "📺" },
      { text: "Chaînes 4K FHD HD", icon: "🎬" },
      { text: "Chaînes Premium", icon: "⭐" },
      { text: "Contenu adulte (+18)", icon: "🔞" },
      { text: "Rapide et stable", icon: "🚀" },
      { text: "M3U & MAG & Enigma", icon: "📱" },
      { text: "Smart TV & Mobile & PC", icon: "💻" },
      { text: "Serveur disponible", icon: "🔥" },
      { text: "Support 24/7", icon: "💬" }
    ]),
    rating: '4.9',
    reviewCount: 189,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'iptv-premium-4k-6-mois',
    title: '6 Mois',
    subtitle: 'PREMIUM 4K',
    description: `6 mois de streaming premium en 4K avec accès complet à tout notre contenu exclusif. La qualité ultime pour les vrais passionnés de télévision.

**Expérience Premium:**
- 📺 Toutes les chaînes en qualité 4K/FHD/HD
- 🎬 Bibliothèque VOD 4K exclusive
- 🔞 Contenu adulte premium illimité
- ⚡ Configuration express
- 🔄 Priorité sur les nouvelles chaînes
- 🌍 Sports internationaux en 4K
- 💻 Multi-écrans - jusqu'à 3 appareils
- 🔥 Bande passante premium garantie
- 💬 Support technique dédié 24/7
- 🎁 Applications premium incluses

Vivez vos programmes préférés comme au cinéma !`,
    price: '42',
    cents: '00',
    duration: '6 mois',
    type: 'PREMIUM_4K',
    gradient: 'from-fuchsia-500 to-purple-600',
    icon: 'Gem',
    popular: false,
    checkoutUrl: '#',
    images: JSON.stringify([
      '/images/products/iptv-4k.jpg',
      '/images/products/premium-channels.jpg',
      '/images/products/devices.jpg'
    ]),
    features: JSON.stringify([
      { text: "Activation instantanée !", icon: "⚡" },
      { text: "Mise à jour gratuite", icon: "🔄" },
      { text: "120K+ chaînes & VOD", icon: "📺" },
      { text: "Chaînes 4K FHD HD", icon: "🎬" },
      { text: "Chaînes Premium", icon: "⭐" },
      { text: "Contenu adulte (+18)", icon: "🔞" },
      { text: "Rapide et stable", icon: "🚀" },
      { text: "M3U & MAG & Enigma", icon: "📱" },
      { text: "Smart TV & Mobile & PC", icon: "💻" },
      { text: "Serveur disponible", icon: "🔥" },
      { text: "Support 24/7", icon: "💬" }
    ]),
    rating: '4.9',
    reviewCount: 324,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'iptv-premium-4k-12-mois',
    title: '12 Mois',
    subtitle: 'PREMIUM 4K',
    description: `Notre meilleure offre Premium 4K ! 12 mois + 2 MOIS GRATUITS d'accès VIP à tout notre contenu en ultra haute définition. L'abonnement le plus complet du marché.

**Pack Premium Ultime:**
- 📺 120 000+ chaînes en 4K/FHD/HD
- 🎬 20 000+ films et séries 4K exclusifs
- 🔞 Accès illimité au contenu adulte premium
- ⚡ Activation instantanée garantie
- 🔄 Mises à jour et nouvelles chaînes en priorité
- 🌍 Tous les championnats sportifs en 4K
- 💻 Streaming simultané sur 3 appareils
- 🔥 Serveurs premium dédiés - zéro buffering
- 💬 Support VIP prioritaire 24/7
- 🎁 BONUS: +2 mois gratuits + guides complets
- 🏆 Garantie satisfait ou remboursé

Le choix N°1 pour une année complète de divertissement premium !`,
    price: '69',
    cents: '00',
    duration: '12 mois',
    type: 'PREMIUM_4K',
    gradient: 'from-amber-500 to-red-500',
    icon: 'Crown',
    popular: true,
    bonus: '+2 Mois Gratuit',
    checkoutUrl: '#',
    images: JSON.stringify([
      '/images/products/iptv-4k.jpg',
      '/images/products/premium-channels.jpg',
      '/images/products/devices.jpg'
    ]),
    features: JSON.stringify([
      { text: "Activation instantanée !", icon: "⚡" },
      { text: "Mise à jour gratuite", icon: "🔄" },
      { text: "120K+ chaînes & VOD", icon: "📺" },
      { text: "Chaînes 4K FHD HD", icon: "🎬" },
      { text: "Chaînes Premium", icon: "⭐" },
      { text: "Contenu adulte (+18)", icon: "🔞" },
      { text: "Rapide et stable", icon: "🚀" },
      { text: "M3U & MAG & Enigma", icon: "📱" },
      { text: "Smart TV & Mobile & PC", icon: "💻" },
      { text: "Serveur disponible", icon: "🔥" },
      { text: "Support 24/7", icon: "💬" }
    ]),
    rating: '5.0',
    reviewCount: 1247,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    slug: 'iptv-premium-4k-24-mois',
    title: '24 Mois',
    subtitle: 'PREMIUM 4K',
    description: `L'offre ultime: 24 mois + 4 MOIS GRATUITS de Premium 4K ! Sécurisez 2 ans de divertissement premium au meilleur prix absolu.

**Avantages Exclusifs 24 Mois:**
- 📺 Accès VIP à vie à 120 000+ chaînes 4K
- 🎬 Bibliothèque VOD premium constamment enrichie
- 🔞 Contenu adulte exclusif sans limite
- ⚡ Installation VIP avec assistance personnalisée
- 🔄 Garantie de service premium 24 mois
- 🌍 Couverture mondiale complète en 4K
- 💻 Multi-connexions illimitées
- 🔥 Infrastructure serveur premium garantie
- 💬 Support VIP dédié 24/7 avec ligne directe
- 🎁 MEGA BONUS: +4 mois gratuits + pack applications
- 🏆 Protection prix - tarif gelé pendant 2 ans

L'investissement le plus intelligent pour 2 ans de streaming premium !`,
    price: '100',
    cents: '00',
    duration: '24 mois',
    type: 'PREMIUM_4K',
    gradient: 'from-red-500 to-rose-600',
    icon: 'Rocket',
    popular: false,
    bonus: '+4 Mois Gratuit',
    checkoutUrl: '#',
    images: JSON.stringify([
      '/images/products/iptv-4k.jpg',
      '/images/products/premium-channels.jpg',
      '/images/products/devices.jpg'
    ]),
    features: JSON.stringify([
      { text: "Activation instantanée !", icon: "⚡" },
      { text: "Mise à jour gratuite", icon: "🔄" },
      { text: "120K+ chaînes & VOD", icon: "📺" },
      { text: "Chaînes 4K FHD HD", icon: "🎬" },
      { text: "Chaînes Premium", icon: "⭐" },
      { text: "Contenu adulte (+18)", icon: "🔞" },
      { text: "Rapide et stable", icon: "🚀" },
      { text: "M3U & MAG & Enigma", icon: "📱" },
      { text: "Smart TV & Mobile & PC", icon: "💻" },
      { text: "Serveur disponible", icon: "🔥" },
      { text: "Support 24/7", icon: "💬" }
    ]),
    rating: '4.9',
    reviewCount: 687,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const reviewsData = [
  { productId: 1, author: 'Jean Dupont', rating: 5, comment: 'Excellent service, activation rapide et qualité HD au top !', verified: true, createdAt: '2025-11-15T10:30:00Z' },
  { productId: 1, author: 'Marie Laurent', rating: 4, comment: 'Très bon rapport qualité-prix pour découvrir le service.', verified: true, createdAt: '2025-11-20T14:22:00Z' },
  { productId: 3, author: 'Pierre Martin', rating: 5, comment: 'Le meilleur abonnement ! Aucune coupure, support réactif. Je recommande.', verified: true, createdAt: '2025-10-05T09:15:00Z' },
  { productId: 3, author: 'Sophie Bernard', rating: 5, comment: 'Incroyable ! Plus de 100k chaînes, qualité parfaite, prix imbattable.', verified: true, createdAt: '2025-11-01T16:45:00Z' },
  { productId: 7, author: 'Thomas Dubois', rating: 5, comment: 'La qualité 4K est exceptionnelle ! Content d\'avoir choisi ce pack.', verified: true, createdAt: '2025-11-10T11:30:00Z' },
  { productId: 7, author: 'Emma Petit', rating: 5, comment: 'Service premium au top, les 2 mois offerts sont un vrai plus !', verified: true, createdAt: '2025-11-25T13:20:00Z' },
];

async function seedProducts() {
  try {
    console.log('Seeding products...');
    
    for (const product of productsData) {
      await db.insert(products).values(product);
    }
    
    console.log('Products seeded successfully!');
    console.log('Seeding reviews...');
    
    for (const review of reviewsData) {
      await db.insert(productReviews).values(review);
    }
    
    console.log('Reviews seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

seedProducts();
