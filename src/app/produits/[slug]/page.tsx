import { notFound } from 'next/navigation';
import { Crown, Star, Check, ShoppingCart, Shield, Clock, Eye, Flame, Gift, TrendingUp, Users, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';
import { CountdownTimer } from '@/components/ui/countdown-timer';
import { StockIndicator } from '@/components/ui/stock-indicator';
import { LiveViewers } from '@/components/ui/live-viewers';
import { RecentPurchases } from '@/components/ui/recent-purchases';
import { ReviewForm } from '@/components/ui/review-form';

const products = {
  'abonnement-iptv-hd-3-mois': {
    title: '3 Mois IPTV HD',
    subtitle: 'IPTV HD',
    price: '19',
    duration: '3 Mois',
    type: 'HD',
    description: 'Profitez de 3 mois d\'accès illimité à notre service IPTV HD avec plus de 120 000 chaînes et contenus VOD. Activation instantanée et qualité HD garantie.',
    gradient: 'from-cyan-500 to-blue-500',
    checkoutUrl: 'https://www.officielsmarterspro.fr/step/iptv-smarters-3-mois/',
    features: [
      'Activation instantanée',
      '120K+ chaînes & VOD',
      'Qualité HD',
      'Support 24/7',
      'Multi-appareils',
      'Mise à jour gratuite',
      'M3U & MAG compatible',
      'Serveur stable'
    ],
    stock: 2,
    viewers: 3,
    recentPurchases: 5,
    rating: 4.7,
    reviewCount: 127,
    reviews: [
      { author: 'Jean Dupont', rating: 5, comment: 'Excellent service, activation rapide et qualité HD au top ! Les chaînes françaises fonctionnent parfaitement.', verified: true, date: '2025-11-15' },
      { author: 'Marie Laurent', rating: 4, comment: 'Très bon rapport qualité-prix pour découvrir le service. Quelques micro-coupures mais rien de grave.', verified: true, date: '2025-11-20' },
      { author: 'Ahmed Ben', rating: 5, comment: 'Interface très intuitive, mes parents ont réussi à l\'utiliser sans problème. Top !', verified: true, date: '2025-11-22' },
      { author: 'Claire Rousseau', rating: 5, comment: 'Parfait pour tester avant de prendre un abonnement plus long. Je vais renouveler en 12 mois.', verified: true, date: '2025-11-25' },
      { author: 'Mohamed El', rating: 4, comment: 'Bon service, activation en 5 minutes. Qualité correcte pour du HD.', verified: true, date: '2025-11-28' },
      { author: 'Sophie Blanc', rating: 5, comment: 'J\'ai essayé plusieurs services IPTV, celui-ci est le meilleur. Support très réactif.', verified: true, date: '2025-11-30' },
      { author: 'Lucas Martin', rating: 4, comment: 'Contenu varié, bonne stabilité. Quelques chaînes manquent parfois mais globalement satisfait.', verified: true, date: '2025-12-01' },
      { author: 'Fatima K.', rating: 5, comment: 'Installation facile sur ma Smart TV Samsung. Image nette, pas de freezing.', verified: true, date: '2025-12-02' },
      { author: 'Antoine Dubois', rating: 5, comment: 'Super pour regarder le foot. Tous les matchs de Ligue 1 disponibles en HD !', verified: true, date: '2025-12-03' },
      { author: 'Nadia H.', rating: 4, comment: 'Bon service client, ils m\'ont aidé à configurer sur mon Fire Stick rapidement.', verified: true, date: '2025-12-04' },
      { author: 'Pierre Lefevre', rating: 5, comment: 'Excellent ! Fonctionne parfaitement sur Android TV. VOD bien fournie.', verified: true, date: '2025-12-05' },
      { author: 'Yasmine A.', rating: 5, comment: 'Très contente, toutes mes chaînes préférées sont là. Je recommande !', verified: true, date: '2025-12-06' }
    ]
  },
  'abonnement-iptv-hd-6-mois': {
    title: '6 Mois IPTV HD',
    subtitle: 'IPTV HD',
    price: '22',
    duration: '6 Mois',
    type: 'HD',
    description: 'Économisez avec notre forfait 6 mois ! Accès complet à toutes les chaînes HD, VOD et contenus premium pendant 6 mois.',
    gradient: 'from-purple-500 to-pink-500',
    checkoutUrl: 'https://www.officielsmarterspro.fr/step/iptv-smarters-6-mois/',
    features: [
      'Activation instantanée',
      '120K+ chaînes & VOD',
      'Qualité HD',
      'Support 24/7',
      'Multi-appareils',
      'Mise à jour gratuite',
      'M3U & MAG compatible',
      'Serveur stable'
    ],
    stock: 4,
    viewers: 7,
    recentPurchases: 12,
    rating: 4.8,
    reviewCount: 243,
    reviews: [
      { author: 'Thomas Moreau', rating: 5, comment: 'Service impeccable, aucune coupure depuis 3 mois ! Vraiment stable, je suis impressionné.', verified: true, date: '2025-11-10' },
      { author: 'Sophie Bernard', rating: 5, comment: 'Qualité excellente, je recommande vivement. Meilleur prix que la concurrence.', verified: true, date: '2025-11-18' },
      { author: 'Karim D.', rating: 5, comment: 'Installation en 2 minutes, fonctionne sur tous mes appareils. Parfait !', verified: true, date: '2025-11-20' },
      { author: 'Julie Petit', rating: 4, comment: 'Bon rapport qualité-prix. Quelques ralentissements aux heures de pointe mais rien de bloquant.', verified: true, date: '2025-11-23' },
      { author: 'Michel Blanc', rating: 5, comment: 'Enfin un service fiable ! J\'en ai testé 3 avant, celui-ci est le meilleur.', verified: true, date: '2025-11-26' },
      { author: 'Samira E.', rating: 5, comment: 'Très satisfaite, toutes les chaînes arabes et françaises. Support disponible 24/7.', verified: true, date: '2025-11-28' },
      { author: 'Vincent Roy', rating: 4, comment: 'Bonne qualité d\'image, EPG à jour. Je conseille pour les fans de sport.', verified: true, date: '2025-11-30' },
      { author: 'Amina F.', rating: 5, comment: 'Super ! Mon mari regarde le foot, moi mes séries, les enfants leurs dessins animés. Tout le monde est content.', verified: true, date: '2025-12-01' },
      { author: 'François Durand', rating: 5, comment: 'Excellent service, activation instantanée comme promis. Aucun souci technique.', verified: true, date: '2025-12-02' },
      { author: 'Leila M.', rating: 5, comment: 'Je recommande ! Facile à utiliser, bonne qualité, prix correct.', verified: true, date: '2025-12-03' },
      { author: 'David Cohen', rating: 4, comment: 'Très bon service dans l\'ensemble. VOD mis à jour régulièrement.', verified: true, date: '2025-12-04' },
      { author: 'Sarah Benoit', rating: 5, comment: 'Parfait sur ma box Android. Image HD stable, zapping rapide.', verified: true, date: '2025-12-05' },
      { author: 'Omar B.', rating: 5, comment: 'Meilleur IPTV que j\'ai testé. Serveurs très stables, pas de bug.', verified: true, date: '2025-12-06' }
    ]
  },
  'abonnement-iptv-hd-12-mois': {
    title: '12 Mois IPTV HD',
    subtitle: 'IPTV HD - LE PLUS POPULAIRE',
    price: '39',
    duration: '12 Mois',
    type: 'HD',
    popular: true,
    description: 'Notre offre la plus populaire ! Un an complet d\'accès illimité à notre service IPTV HD premium. Le meilleur rapport qualité-prix pour une année de divertissement.',
    gradient: 'from-amber-500 to-orange-500',
    checkoutUrl: 'https://www.officielsmarterspro.fr/step/iptv-smarters-12-mois-2/',
    features: [
      'Activation instantanée',
      '120K+ chaînes & VOD',
      'Qualité HD',
      'Support 24/7',
      'Multi-appareils',
      'Mise à jour gratuite',
      'M3U & MAG compatible',
      'Serveur stable'
    ],
    stock: 3,
    viewers: 15,
    recentPurchases: 28,
    rating: 4.9,
    reviewCount: 856,
    reviews: [
      { author: 'Pierre Martin', rating: 5, comment: 'Le meilleur abonnement ! Aucune coupure, support réactif. Je recommande les yeux fermés.', verified: true, date: '2025-10-05' },
      { author: 'Sophie Bernard', rating: 5, comment: 'Incroyable ! Plus de 100k chaînes, qualité parfaite, prix imbattable. Mon meilleur achat de l\'année.', verified: true, date: '2025-11-01' },
      { author: 'Lucas Petit', rating: 4, comment: 'Très satisfait, installation facile et qualité constante. Bon investissement sur 1 an.', verified: true, date: '2025-11-22' },
      { author: 'Rachid H.', rating: 5, comment: 'Enfin un service sérieux ! 8 mois d\'utilisation, zéro problème. Fonctionne H24.', verified: true, date: '2025-11-15' },
      { author: 'Emma Dubois', rating: 5, comment: 'Meilleur rapport qualité-prix du marché. Toute la famille l\'utilise quotidiennement.', verified: true, date: '2025-11-18' },
      { author: 'Hassan K.', rating: 5, comment: 'Service au top ! J\'ai annulé mon abonnement Canal+ et économisé 600€/an.', verified: true, date: '2025-11-20' },
      { author: 'Isabelle Roy', rating: 4, comment: 'Très bon service, stable et fiable. Les mises à jour sont régulières.', verified: true, date: '2025-11-25' },
      { author: 'Alexandre M.', rating: 5, comment: 'Parfait pour les fans de sport ! Tous les matchs en direct, qualité HD impeccable.', verified: true, date: '2025-11-27' },
      { author: 'Fatima Z.', rating: 5, comment: 'Installation facile, fonctionne sur ma Smart TV, mon téléphone et ma tablette. Génial !', verified: true, date: '2025-11-29' },
      { author: 'Jean-Paul L.', rating: 5, comment: 'J\'utilise depuis 10 mois, jamais déçu. Support technique très réactif quand j\'ai eu un souci.', verified: true, date: '2025-12-01' },
      { author: 'Nour A.', rating: 5, comment: 'Excellent choix ! Chaînes internationales disponibles, parfait pour ma famille.', verified: true, date: '2025-12-02' },
      { author: 'Marc Fontaine', rating: 5, comment: 'Qualité professionnelle, serveurs ultra-stables. Je renouvelle sans hésiter.', verified: true, date: '2025-12-03' },
      { author: 'Laila B.', rating: 4, comment: 'Très satisfaite, bon service client. Quelques micro-coupures mais rares.', verified: true, date: '2025-12-04' },
      { author: 'Christophe D.', rating: 5, comment: 'Le meilleur IPTV du marché ! Image nette, pas de freezing, EPG complet.', verified: true, date: '2025-12-05' },
      { author: 'Zineb F.', rating: 5, comment: 'Je recommande à 200% ! Activation instantanée, interface simple, qualité au top.', verified: true, date: '2025-12-06' }
    ]
  },
  'abonnement-iptv-hd-24-mois': {
    title: '24 Mois IPTV HD',
    subtitle: 'IPTV HD',
    price: '59',
    duration: '24 Mois',
    type: 'HD',
    description: 'La meilleure valeur ! 2 ans d\'accès illimité à notre service IPTV HD premium. Économisez le plus avec notre forfait longue durée.',
    gradient: 'from-emerald-500 to-teal-500',
    checkoutUrl: 'https://www.officielsmarterspro.fr/step/iptv-smarters-24-mois/',
    features: [
      'Activation instantanée',
      '120K+ chaînes & VOD',
      'Qualité HD',
      'Support 24/7',
      'Multi-appareils',
      'Mise à jour gratuite',
      'M3U & MAG compatible',
      'Serveur stable'
    ],
    stock: 5,
    viewers: 9,
    recentPurchases: 8,
    rating: 4.8,
    reviewCount: 412,
    reviews: [
      { author: 'Marc Dubois', rating: 5, comment: 'Excellent rapport qualité-prix pour 2 ans. Service stable depuis 1 an déjà !', verified: true, date: '2025-10-20' },
      { author: 'Isabelle Leroy', rating: 4, comment: 'Bon service, installation simple. Contente de mon achat pour 2 ans.', verified: true, date: '2025-11-05' },
      { author: 'Kevin Perrin', rating: 5, comment: 'Meilleur investissement ! Économie énorme sur 2 ans comparé aux abonnements classiques.', verified: true, date: '2025-11-10' },
      { author: 'Amira S.', rating: 5, comment: 'Parfait ! 14 mois d\'utilisation sans aucun problème. Je recommande.', verified: true, date: '2025-11-14' },
      { author: 'Julien Roy', rating: 4, comment: 'Très satisfait du service, qualité constante. Bon investissement long terme.', verified: true, date: '2025-11-18' },
      { author: 'Nadia F.', rating: 5, comment: 'Service professionnel, support toujours disponible. Content de mon choix.', verified: true, date: '2025-11-22' },
      { author: 'Patrick Blanc', rating: 5, comment: 'J\'utilise depuis 1 an et demi, jamais déçu. Très bon rapport qualité-prix.', verified: true, date: '2025-11-25' },
      { author: 'Samia K.', rating: 5, comment: 'Installation facile, fonctionne sur tous mes appareils. Excellent choix pour 2 ans.', verified: true, date: '2025-11-28' },
      { author: 'Alain Martin', rating: 4, comment: 'Bon service dans la durée. Quelques mises à jour mais rien de gênant.', verified: true, date: '2025-12-01' },
      { author: 'Fatima E.', rating: 5, comment: 'Meilleur prix du marché pour 2 ans. Qualité HD stable, je recommande.', verified: true, date: '2025-12-02' },
      { author: 'Georges Petit', rating: 5, comment: 'Parfait pour les familles ! Tout le monde l\'utilise quotidiennement.', verified: true, date: '2025-12-03' },
      { author: 'Leila D.', rating: 5, comment: 'Service fiable depuis 18 mois. Je renouvelerai sans hésiter.', verified: true, date: '2025-12-04' },
      { author: 'Thierry Moreau', rating: 4, comment: 'Très bon service, bon support client. Content sur 2 ans.', verified: true, date: '2025-12-05' }
    ]
  },
  'abonnement-iptv-premium-4k-3-mois': {
    title: '3 Mois Premium 4K',
    subtitle: 'PREMIUM 4K',
    price: '27',
    duration: '3 Mois',
    type: '4K',
    description: 'Découvrez la qualité 4K premium ! 3 mois d\'accès aux meilleures chaînes en ultra haute définition avec contenus adultes inclus.',
    gradient: 'from-rose-500 to-pink-600',
    checkoutUrl: 'https://www.officielsmarterspro.fr/step/premium-4k-3-mois/',
    features: [
      'Activation instantanée',
      '120K+ chaînes & VOD',
      'Qualité 4K/FHD/HD',
      'Contenu adulte (+18)',
      'Support 24/7',
      'Multi-appareils',
      'Mise à jour gratuite',
      'Serveur ultra-stable'
    ],
    stock: 2,
    viewers: 8,
    recentPurchases: 14,
    rating: 4.9,
    reviewCount: 189,
    reviews: [
      { author: 'Alexandre R.', rating: 5, comment: 'Qualité 4K exceptionnelle ! Vraiment impressionnant, image ultra-nette.', verified: true, date: '2025-11-12' },
      { author: 'Julie M.', rating: 5, comment: 'Service premium au top, jamais déçu. La 4K fait toute la différence !', verified: true, date: '2025-11-19' },
      { author: 'Hassan B.', rating: 5, comment: 'Incroyable qualité d\'image ! Je passe à un abonnement plus long.', verified: true, date: '2025-11-21' },
      { author: 'Céline Dubois', rating: 4, comment: 'Très bonne qualité premium. Quelques chaînes en FHD mais la majorité en 4K.', verified: true, date: '2025-11-23' },
      { author: 'Youssef K.', rating: 5, comment: 'Parfait pour tester la qualité premium. Je recommande !', verified: true, date: '2025-11-26' },
      { author: 'Marine Petit', rating: 5, comment: 'Image cristalline, contenu varié. Excellent service premium.', verified: true, date: '2025-11-28' },
      { author: 'Rachid F.', rating: 5, comment: 'La qualité 4K est bluffante ! Meilleur que mon ancien fournisseur.', verified: true, date: '2025-11-30' },
      { author: 'Sophie Martin', rating: 4, comment: 'Très satisfaite, bonne qualité d\'image. Je vais renouveler.', verified: true, date: '2025-12-01' },
      { author: 'Ahmed S.', rating: 5, comment: 'Service excellent, activation rapide. La 4K est impressionnante.', verified: true, date: '2025-12-02' },
      { author: 'Claire Roy', rating: 5, comment: 'Parfait ! Contenu premium de qualité, support réactif.', verified: true, date: '2025-12-03' },
      { author: 'Karim M.', rating: 5, comment: 'Meilleur IPTV premium testé. Image 4K stable et nette.', verified: true, date: '2025-12-04' },
      { author: 'Emma Lefevre', rating: 4, comment: 'Bonne qualité, bon service. Content de mon achat.', verified: true, date: '2025-12-05' }
    ]
  },
  'abonnement-iptv-premium-4k-6-mois': {
    title: '6 Mois Premium 4K',
    subtitle: 'PREMIUM 4K',
    price: '42',
    duration: '6 Mois',
    type: '4K',
    description: 'Forfait Premium 6 mois ! Profitez de la meilleure qualité d\'image 4K avec tous les contenus premium et adultes.',
    gradient: 'from-fuchsia-500 to-purple-600',
    checkoutUrl: 'https://www.officielsmarterspro.fr/step/premium-4k-6-mois/',
    features: [
      'Activation instantanée',
      '120K+ chaînes & VOD',
      'Qualité 4K/FHD/HD',
      'Contenu adulte (+18)',
      'Support 24/7',
      'Multi-appareils',
      'Mise à jour gratuite',
      'Serveur ultra-stable'
    ],
    stock: 3,
    viewers: 11,
    recentPurchases: 19,
    rating: 4.9,
    reviewCount: 324,
    reviews: [
      { author: 'David L.', rating: 5, comment: 'Image cristalline en 4K, je suis bluffé ! Aucune coupure depuis 4 mois.', verified: true, date: '2025-11-08' },
      { author: 'Celine P.', rating: 5, comment: 'Meilleur service IPTV testé. Qualité irréprochable, support top.', verified: true, date: '2025-11-16' },
      { author: 'Mohamed A.', rating: 5, comment: 'Service premium exceptionnel ! La qualité 4K est parfaite.', verified: true, date: '2025-11-18' },
      { author: 'Isabelle Blanc', rating: 4, comment: 'Très bon rapport qualité-prix. Contenu varié et qualité stable.', verified: true, date: '2025-11-20' },
      { author: 'Vincent Roy', rating: 5, comment: 'Parfait ! J\'utilise depuis 3 mois, aucun problème technique.', verified: true, date: '2025-11-23' },
      { author: 'Amina K.', rating: 5, comment: 'Excellent service, installation simple. Toute la famille est ravie.', verified: true, date: '2025-11-25' },
      { author: 'François Dupont', rating: 5, comment: 'Qualité premium au rendez-vous. Les chaînes 4K sont impressionnantes.', verified: true, date: '2025-11-27' },
      { author: 'Laila F.', rating: 4, comment: 'Très satisfaite, bon service client. Quelques mises à jour régulières.', verified: true, date: '2025-11-29' },
      { author: 'Pierre Martin', rating: 5, comment: 'Meilleur investissement ! La 4K fait vraiment la différence.', verified: true, date: '2025-12-01' },
      { author: 'Nour B.', rating: 5, comment: 'Service stable et fiable. Je recommande ce forfait premium.', verified: true, date: '2025-12-02' },
      { author: 'Marc Lefebvre', rating: 5, comment: 'Excellent ! Fonctionne parfaitement sur tous mes appareils 4K.', verified: true, date: '2025-12-03' },
      { author: 'Samira D.', rating: 5, comment: 'Qualité professionnelle, serveurs ultra-stables. Top !', verified: true, date: '2025-12-04' },
      { author: 'Thomas Petit', rating: 4, comment: 'Très bon service premium. Content de mon choix.', verified: true, date: '2025-12-05' }
    ]
  },
  'abonnement-iptv-premium-4k-12-mois': {
    title: '12 Mois Premium 4K',
    subtitle: 'PREMIUM 4K - MEILLEURE OFFRE',
    price: '69',
    duration: '12 Mois',
    type: '4K',
    popular: true,
    bonus: '+2 Mois Gratuit',
    description: 'Notre meilleure offre Premium 4K ! 12 mois + 2 mois gratuits d\'accès illimité aux chaînes 4K premium avec contenus adultes.',
    gradient: 'from-amber-500 to-red-500',
    checkoutUrl: 'https://www.officielsmarterspro.fr/step/premium-4k-12-mois/',
    features: [
      'Activation instantanée',
      '120K+ chaînes & VOD',
      'Qualité 4K/FHD/HD',
      'Contenu adulte (+18)',
      '+2 Mois GRATUIT',
      'Support 24/7',
      'Multi-appareils',
      'Mise à jour gratuite',
      'Serveur ultra-stable'
    ],
    stock: 2,
    viewers: 23,
    recentPurchases: 45,
    rating: 5.0,
    reviewCount: 1247,
    reviews: [
      { author: 'Thomas Dubois', rating: 5, comment: 'La qualité 4K est exceptionnelle ! Content d\'avoir choisi ce pack.', verified: true, date: '2025-11-10' },
      { author: 'Emma Petit', rating: 5, comment: 'Service premium au top, les 2 mois offerts sont un vrai plus !', verified: true, date: '2025-11-25' },
      { author: 'Nicolas F.', rating: 5, comment: 'Aucun regret, qualité parfaite et support réactif.', verified: true, date: '2025-11-28' }
    ]
  },
  'abonnement-iptv-premium-4k-24-mois': {
    title: '24 Mois Premium 4K',
    subtitle: 'PREMIUM 4K',
    price: '100',
    duration: '24 Mois',
    type: '4K',
    bonus: '+4 Mois Gratuit',
    description: 'La valeur ultime ! 24 mois + 4 mois gratuits de service Premium 4K. La meilleure expérience IPTV pour 2 ans.',
    gradient: 'from-red-500 to-rose-600',
    checkoutUrl: 'https://www.officielsmarterspro.fr/step/premium-4k-24-mois/',
    features: [
      'Activation instantanée',
      '120K+ chaînes & VOD',
      'Qualité 4K/FHD/HD',
      'Contenu adulte (+18)',
      '+4 Mois GRATUIT',
      'Support 24/7',
      'Multi-appareils',
      'Mise à jour gratuite',
      'Serveur ultra-stable'
    ],
    stock: 4,
    viewers: 12,
    recentPurchases: 22,
    rating: 4.9,
    reviewCount: 687,
    reviews: [
      { author: 'Philippe G.', rating: 5, comment: 'Investissement rentable sur 2 ans. Service exceptionnel depuis 15 mois !', verified: true, date: '2025-10-15' },
      { author: 'Martine D.', rating: 5, comment: 'Qualité premium, les 4 mois offerts sont appréciables ! Très satisfaite.', verified: true, date: '2025-11-02' },
      { author: 'Karim E.', rating: 5, comment: 'Meilleur rapport qualité-prix du marché pour du premium 4K. Je recommande !', verified: true, date: '2025-11-08' },
      { author: 'Julie Moreau', rating: 4, comment: 'Très bon service sur la durée. Qualité constante depuis 1 an.', verified: true, date: '2025-11-12' },
      { author: 'Hassan B.', rating: 5, comment: 'Parfait ! 18 mois d\'utilisation, zéro problème. Service professionnel.', verified: true, date: '2025-11-16' },
      { author: 'Sophie Roy', rating: 5, comment: 'Excellent choix pour 2 ans. Les 4 mois gratuits sont un vrai bonus.', verified: true, date: '2025-11-20' },
      { author: 'Ahmed K.', rating: 5, comment: 'Service ultra-stable depuis 1 an. Image 4K parfaite, support réactif.', verified: true, date: '2025-11-24' },
      { author: 'Claire Dubois', rating: 4, comment: 'Très satisfaite, bon investissement. Quelques mises à jour mais rien de gênant.', verified: true, date: '2025-11-27' },
      { author: 'Vincent M.', rating: 5, comment: 'Qualité premium au top ! Économie énorme sur 2 ans.', verified: true, date: '2025-11-30' },
      { author: 'Fatima H.', rating: 5, comment: 'Meilleur service IPTV premium. Toute la famille l\'utilise quotidiennement.', verified: true, date: '2025-12-01' },
      { author: 'Jean-Paul R.', rating: 5, comment: 'Parfait depuis 20 mois. Je renouvelerai sans hésiter.', verified: true, date: '2025-12-02' },
      { author: 'Nadia F.', rating: 5, comment: 'Service exceptionnel, qualité 4K stable. Excellent investissement.', verified: true, date: '2025-12-03' },
      { author: 'Marc Lefevre', rating: 4, comment: 'Très bon service premium. Content de mon choix sur 2 ans.', verified: true, date: '2025-12-04' },
      { author: 'Amina D.', rating: 5, comment: 'Qualité professionnelle, serveurs ultra-stables. Je recommande à 100%.', verified: true, date: '2025-12-05' }
    ]
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products[slug as keyof typeof products];
  
  if (!product) {
    return {
      title: 'Produit Non Trouvé'
    };
  }

  return {
    title: `${product.title} - Abonnement IPTV France | IPTV SMARTERS PRO`,
    description: `${product.description} Abonnement iptv premium France avec activation instantanée, support 24/7 et qualité ${product.type}.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products[slug as keyof typeof products];

  if (!product) {
    notFound();
  }

  const stockPercentage = Math.min(95, 85 + Math.random() * 10);

  return (
    <main className="min-h-screen bg-black">
      <nav className="bg-black/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <a href="/#pricing" className="text-white/70 hover:text-white transition-colors text-sm">
            ← Retour aux offres
          </a>
        </div>
      </nav>

      <section className="relative py-8 md:py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r ${product.gradient} opacity-20 rounded-full blur-[150px]`} />
          <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r ${product.gradient} opacity-20 rounded-full blur-[150px]`} />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12">
            <div className="relative space-y-4 md:space-y-6">
              {product.popular && (
                <div className="absolute -top-4 left-0 z-20">
                  <div className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-gradient-to-r ${product.gradient} text-white text-xs md:text-sm font-bold shadow-lg flex items-center gap-2`}>
                    <Crown className="w-3 h-3 md:w-4 md:h-4" />
                    {product.type === '4K' ? 'Meilleure Offre' : 'Plus Populaire'}
                  </div>
                </div>
              )}
              
              <div className={`relative rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl`}>
                <div className={`h-2 bg-gradient-to-r ${product.gradient}`} />
                
                <div className="p-6 md:p-8 text-center">
                  <div className={`w-24 h-24 md:w-32 md:h-32 mx-auto mb-4 md:mb-6 rounded-2xl md:rounded-3xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-2xl`}>
                    {product.type === '4K' ? (
                      <Crown className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    ) : (
                      <Star className="w-12 h-12 md:w-16 md:h-16 text-white" />
                    )}
                  </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex items-start justify-center gap-1">
                      <span className="text-2xl md:text-3xl font-bold text-white/60 mt-2 md:mt-3">€</span>
                      <span className={`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${product.gradient}`}>
                        {product.price}
                      </span>
                    </div>
                    <p className="text-white/60 text-base md:text-lg">Paiement unique</p>
                    
                    {product.bonus && (
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-400 text-black text-xs md:text-sm font-bold py-1.5 md:py-2 px-3 md:px-4 rounded-full animate-pulse">
                        <Gift className="w-3 h-3 md:w-4 md:h-4" />
                        {product.bonus}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:space-y-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
                <div className="flex items-center justify-between text-xs md:text-sm">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white font-bold">{product.rating}</span>
                    <span className="text-white/50">({product.reviewCount} avis)</span>
                  </div>
                </div>

                <StockIndicator stock={product.stock} />
                <LiveViewers count={product.viewers} />
                
                <div className="flex items-center gap-2 text-orange-400 text-xs md:text-sm">
                  <Flame className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="font-medium">{product.recentPurchases} personnes ont acheté dans la dernière heure</span>
                </div>

                <div className="pt-2 md:pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/70 text-xs md:text-sm">Stock restant</span>
                    <span className="text-red-400 text-xs md:text-sm font-bold">{stockPercentage.toFixed(0)}% vendu</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-500"
                      style={{ width: `${stockPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <CountdownTimer />
            </div>

            <div className="flex flex-col justify-center">
              <div className="space-y-4 md:space-y-6">
                <div>
                  <p className={`text-transparent bg-clip-text bg-gradient-to-r ${product.gradient} font-bold text-xs md:text-sm uppercase tracking-wider mb-2`}>
                    {product.subtitle}
                  </p>
                  <h1 className="text-3xl md:text-5xl font-black text-white mb-3 md:mb-4">
                    {product.title}
                  </h1>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-2 md:space-y-3">
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4">Fonctionnalités incluses :</h3>
                  {product.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 md:gap-3">
                      <div className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-full bg-gradient-to-r ${product.gradient} flex items-center justify-center`}>
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      </div>
                      <span className="text-white/90 text-sm md:text-base">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg md:rounded-xl p-3 md:p-4">
                  <div className="flex items-start gap-2 md:gap-3">
                    <Clock className="w-4 h-4 md:w-5 md:h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-200 text-xs md:text-sm">
                      <span className="font-bold">⏱️ Votre panier est réservé pour 10 minutes</span>
                    </p>
                  </div>
                </div>

                <div className="space-y-2 md:space-y-3 pt-2 md:pt-4">
                  <a
                    href={product.checkoutUrl}
                    className="group relative block w-full py-4 md:py-5 rounded-xl font-bold text-center overflow-hidden transition-all duration-300 shadow-2xl hover:shadow-3xl"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} transition-transform duration-300 group-hover:scale-105`} />
                    <span className="relative text-white text-lg md:text-xl flex items-center justify-center gap-2 md:gap-3">
                      <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
                      Acheter maintenant
                    </span>
                  </a>
                  
                  <a
                    href="/#pricing"
                    className="block w-full py-3 md:py-4 rounded-xl font-bold text-center text-sm md:text-base text-white/70 hover:text-white border border-white/20 hover:border-white/40 transition-all"
                  >
                    Voir toutes les offres
                  </a>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4 pt-3 md:pt-4 border-t border-white/10">
                  <div className="flex flex-col items-center gap-1.5 md:gap-2 bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-green-400" />
                    <span className="text-white/70 text-[10px] md:text-xs text-center font-medium">Paiement sécurisé</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 md:gap-2 bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4">
                    <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />
                    <span className="text-white/70 text-[10px] md:text-xs text-center font-medium">Activation instantanée</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 md:gap-2 bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4">
                    <Shield className="w-6 h-6 md:w-8 md:h-8 text-purple-400" />
                    <span className="text-white/70 text-[10px] md:text-xs text-center font-medium">Garantie satisfait</span>
                  </div>
                  <div className="flex flex-col items-center gap-1.5 md:gap-2 bg-white/5 rounded-lg md:rounded-xl p-3 md:p-4">
                    <Users className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" />
                    <span className="text-white/70 text-[10px] md:text-xs text-center font-medium">Support 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 space-y-6 md:space-y-8">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
                <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-400 fill-yellow-400" />
                Avis clients vérifiés
              </h2>
              
              <div className="space-y-4 md:space-y-6">
                {product.reviews.map((review, idx) => (
                  <div key={idx} className="border-b border-white/10 last:border-0 pb-4 md:pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-2 md:mb-3">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm md:text-base">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 md:gap-2">
                            <p className="text-white font-bold text-sm md:text-base">{review.author}</p>
                            {review.verified && (
                              <span className="bg-green-500/20 text-green-400 text-[10px] md:text-xs px-1.5 md:px-2 py-0.5 md:py-1 rounded-full flex items-center gap-1">
                                <Check className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                Vérifié
                              </span>
                            )}
                          </div>
                          <p className="text-white/50 text-xs md:text-sm">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 md:gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 md:w-4 md:h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-white/80 leading-relaxed text-sm md:text-base">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>

            <ReviewForm />
          </div>
        </div>
      </section>

      <RecentPurchases productName={product.title} />
    </main>
  );
}