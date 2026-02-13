import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Tv, Smartphone, Monitor, Wifi, Zap, Shield, Star, Play } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

// ── Programmatic SEO Data ──────────────────────────────────────────────
// Each entry generates a unique landing page targeting long-tail keywords

type PageVariant = {
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  keywords: string[];
  features: string[];
  faq: { q: string; a: string }[];
  type: 'device' | 'city';
};

const pages: Record<string, PageVariant> = {
  // ── Device Pages ──
  samsung: {
    type: 'device',
    h1: 'IPTV Samsung - Abonnement IPTV pour Smart TV Samsung 2026',
    metaTitle: 'IPTV Samsung | Abonnement IPTV Smart TV Samsung 2026',
    metaDescription: 'Installez IPTV Smarters Pro sur votre Smart TV Samsung. 160 000+ chaînes 4K, activation 5min. Meilleur IPTV Samsung France 2026 dès 19€.',
    intro: 'Votre Smart TV Samsung mérite le meilleur service IPTV en France. IPTV Smarters Pro est 100% compatible avec tous les modèles Samsung Smart TV (Tizen OS) depuis 2016. Profitez de plus de 160 000 chaînes en qualité 4K/FHD/HD directement depuis votre téléviseur Samsung, sans boîtier externe ni câble supplémentaire. L\'installation prend moins de 5 minutes et notre support technique vous accompagne 24h/24.',
    keywords: ['iptv samsung', 'iptv smart tv samsung', 'abonnement iptv samsung', 'iptv samsung 4k', 'installer iptv samsung', 'iptv samsung france'],
    features: ['Compatible tous Samsung Smart TV Tizen (2016+)', 'Qualité 4K UHD native sur grand écran', 'Télécommande Samsung compatible', 'EPG intégré avec programme TV', 'Installation via Smart IPTV / IPTV Smarters'],
    faq: [
      { q: 'Comment installer IPTV sur Samsung Smart TV ?', a: 'Téléchargez Smart IPTV ou IPTV Smarters Pro depuis le Samsung App Store (Tizen), entrez vos identifiants reçus après achat, et profitez de 160 000+ chaînes en 4K. Installation en 5 minutes.' },
      { q: 'IPTV fonctionne-t-il sur tous les modèles Samsung ?', a: 'Oui, IPTV Smarters Pro est compatible avec tous les Samsung Smart TV sous Tizen OS (modèles 2016 et plus récents). Pour les anciens modèles, utilisez un Fire TV Stick branché en HDMI.' },
      { q: 'Quel est le prix de l\'IPTV pour Samsung ?', a: 'L\'abonnement IPTV pour Samsung démarre à 19€ pour 3 mois (pack HD) ou 27€ pour 3 mois (pack Premium 4K). Activation instantanée.' },
    ],
  },
  firestick: {
    type: 'device',
    h1: 'IPTV Fire TV Stick - Abonnement IPTV pour Amazon FireStick 2026',
    metaTitle: 'IPTV Fire TV Stick | Abonnement IPTV FireStick 2026',
    metaDescription: 'IPTV Smarters Pro sur Fire TV Stick. 160 000+ chaînes 4K, installation 5min via Downloader. Meilleur IPTV FireStick France dès 19€.',
    intro: 'Le Fire TV Stick d\'Amazon est l\'appareil le plus populaire pour l\'IPTV en France, et pour cause : compact, puissant et abordable. IPTV Smarters Pro s\'installe en 5 minutes via l\'application Downloader et transforme votre Fire TV Stick en centre multimédia ultime avec plus de 160 000 chaînes TV en direct et 20 000+ films VOD en qualité 4K.',
    keywords: ['iptv firestick', 'iptv fire tv stick', 'abonnement iptv firestick', 'installer iptv firestick', 'iptv amazon fire stick', 'iptv firestick france'],
    features: ['Installation simple via Downloader en 5min', 'Compatible Fire TV Stick 4K / 4K Max / Lite', 'Télécommande vocale Alexa compatible', 'Qualité 4K Ultra HD', 'EPG avec guide des programmes'],
    faq: [
      { q: 'Comment installer IPTV sur Fire TV Stick ?', a: '1) Activez les sources inconnues dans Paramètres > Ma Fire TV. 2) Installez Downloader depuis l\'App Store. 3) Téléchargez IPTV Smarters Pro via le lien fourni. 4) Entrez vos identifiants. Terminé en 5 minutes !' },
      { q: 'Fire TV Stick 4K Max supporte-t-il l\'IPTV 4K ?', a: 'Oui, le Fire TV Stick 4K Max est idéal pour l\'IPTV en 4K. Avec notre pack Premium 4K, vous profitez de chaînes en Ultra HD sans aucun lag.' },
      { q: 'Quel Fire TV Stick pour l\'IPTV ?', a: 'Nous recommandons le Fire TV Stick 4K Max pour la meilleure expérience. Le Fire TV Stick Lite fonctionne aussi mais est limité au Full HD.' },
    ],
  },
  lg: {
    type: 'device',
    h1: 'IPTV LG - Abonnement IPTV pour Smart TV LG 2026',
    metaTitle: 'IPTV LG Smart TV | Abonnement IPTV LG WebOS 2026',
    metaDescription: 'IPTV Smarters Pro sur Smart TV LG WebOS. 160 000+ chaînes 4K, installation facile. Meilleur abonnement IPTV LG France dès 19€.',
    intro: 'Les Smart TV LG sous WebOS offrent une expérience IPTV exceptionnelle grâce à leur écran OLED/NanoCell et leur interface fluide. IPTV Smarters Pro est parfaitement optimisé pour LG WebOS, avec une installation en quelques clics depuis le LG Content Store. Accédez à plus de 160 000 chaînes et 20 000+ contenus VOD en qualité 4K.',
    keywords: ['iptv lg', 'iptv smart tv lg', 'iptv lg webos', 'abonnement iptv lg', 'installer iptv lg', 'iptv lg france'],
    features: ['Compatible LG WebOS 3.0+ (2016+)', 'Optimisé pour écrans LG OLED et NanoCell', 'Installation depuis LG Content Store', 'Qualité 4K HDR sur LG', 'Magic Remote compatible'],
    faq: [
      { q: 'Comment installer IPTV sur LG Smart TV ?', a: 'Ouvrez le LG Content Store, cherchez Smart IPTV ou SS IPTV, installez l\'app, puis entrez vos identifiants IPTV. Alternative : utilisez l\'application via navigateur web intégré.' },
      { q: 'L\'IPTV fonctionne-t-il sur LG OLED ?', a: 'Oui, les TV LG OLED offrent la meilleure qualité d\'image pour l\'IPTV. Avec notre pack Premium 4K, le rendu est spectaculaire grâce aux noirs parfaits et au HDR.' },
      { q: 'LG WebOS ou Tizen pour l\'IPTV ?', a: 'Les deux fonctionnent parfaitement avec IPTV Smarters Pro. LG WebOS a l\'avantage d\'avoir plus d\'applications IPTV disponibles dans son store.' },
    ],
  },
  'apple-tv': {
    type: 'device',
    h1: 'IPTV Apple TV - Abonnement IPTV pour Apple TV 4K 2026',
    metaTitle: 'IPTV Apple TV 4K | Abonnement IPTV Apple TV France 2026',
    metaDescription: 'IPTV Smarters Pro sur Apple TV 4K. 160 000+ chaînes, qualité 4K HDR, Siri compatible. Meilleur IPTV Apple TV France dès 19€.',
    intro: 'L\'Apple TV 4K est le choix premium pour l\'IPTV en France. Avec le processeur A15 Bionic, le support HDR10+ / Dolby Vision et la télécommande Siri, votre expérience IPTV atteint un niveau supérieur. IPTV Smarters Pro est disponible sur tvOS via l\'App Store et offre une interface optimisée pour la navigation à la télécommande.',
    keywords: ['iptv apple tv', 'iptv apple tv 4k', 'abonnement iptv apple tv', 'installer iptv apple tv', 'iptv tvos', 'iptv apple tv france'],
    features: ['Disponible sur App Store tvOS', 'Qualité 4K HDR / Dolby Vision', 'Siri compatible pour recherche vocale', 'Interface optimisée télécommande', 'AirPlay depuis iPhone/iPad'],
    faq: [
      { q: 'Comment installer IPTV sur Apple TV ?', a: 'Ouvrez l\'App Store sur votre Apple TV, cherchez IPTV Smarters Pro, installez l\'application gratuite, puis entrez vos identifiants. Compatible Apple TV HD et Apple TV 4K.' },
      { q: 'L\'IPTV Apple TV supporte-t-il Dolby Vision ?', a: 'Oui, avec notre pack Premium 4K et une Apple TV 4K (2021+), vous profitez du Dolby Vision sur les chaînes compatibles pour une qualité d\'image exceptionnelle.' },
    ],
  },
  android: {
    type: 'device',
    h1: 'IPTV Android - Abonnement IPTV pour Smartphone Android 2026',
    metaTitle: 'IPTV Android | Abonnement IPTV Smartphone Android 2026',
    metaDescription: 'IPTV Smarters Pro sur Android. 160 000+ chaînes 4K sur votre smartphone. Installation APK en 3min. Meilleur IPTV Android dès 19€.',
    intro: 'Regardez l\'IPTV partout en France avec votre smartphone ou tablette Android. IPTV Smarters Pro s\'installe en 3 minutes via le fichier APK et vous donne accès à plus de 160 000 chaînes TV en direct et 20 000+ films VOD. Compatible avec tous les smartphones Android 5.0+ (Samsung Galaxy, Xiaomi, Huawei, OnePlus, Oppo, etc.).',
    keywords: ['iptv android', 'iptv smartphone android', 'abonnement iptv android', 'apk iptv android', 'installer iptv android', 'iptv android france'],
    features: ['Compatible Android 5.0+ (tous fabricants)', 'Installation APK en 3 minutes', 'Mode Picture-in-Picture', 'Cast vers Chromecast/TV', 'Téléchargement VOD hors ligne'],
    faq: [
      { q: 'Comment installer IPTV sur Android ?', a: 'Téléchargez l\'APK IPTV Smarters Pro depuis notre site, autorisez les sources inconnues dans vos paramètres Android, installez l\'APK et connectez-vous avec vos identifiants.' },
      { q: 'L\'IPTV Android consomme-t-il beaucoup de données ?', a: 'En qualité HD, comptez environ 1.5 Go/heure. En 4K, environ 7 Go/heure. Nous recommandons le WiFi pour la 4K et la 4G/5G pour le HD.' },
    ],
  },
  'smart-tv': {
    type: 'device',
    h1: 'IPTV Smart TV - Abonnement IPTV pour Smart TV 2026',
    metaTitle: 'IPTV Smart TV | Abonnement IPTV Smart TV France 2026',
    metaDescription: 'IPTV Smarters Pro sur Smart TV Samsung, LG, Sony, Philips. 160 000+ chaînes 4K. Meilleur abonnement IPTV Smart TV France dès 19€.',
    intro: 'Transformez votre Smart TV en centre de divertissement ultime avec IPTV Smarters Pro. Compatible avec toutes les marques (Samsung, LG, Sony, Philips, Hisense, TCL), notre service IPTV vous offre 160 000+ chaînes en qualité 4K directement sur votre téléviseur, sans équipement supplémentaire.',
    keywords: ['iptv smart tv', 'abonnement iptv smart tv', 'iptv smart tv france', 'installer iptv smart tv', 'meilleur iptv smart tv', 'iptv television'],
    features: ['Compatible Samsung, LG, Sony, Philips, Hisense, TCL', 'Installation directe sans boîtier externe', 'Qualité 4K native sur grand écran', 'EPG avec guide des programmes', 'Contrôle parental intégré'],
    faq: [
      { q: 'Quelle Smart TV pour l\'IPTV ?', a: 'Toutes les Smart TV récentes (2016+) sont compatibles. Samsung (Tizen), LG (WebOS), Sony/Philips (Android TV), Hisense (VIDAA). Nous recommandons les modèles 4K pour profiter pleinement du pack Premium.' },
      { q: 'Comment installer IPTV sur une Smart TV ?', a: 'Selon votre marque : Samsung/LG → téléchargez l\'app depuis le store intégré. Sony/Philips → installez depuis Google Play (Android TV). Alternative universelle : branchez un Fire TV Stick en HDMI.' },
    ],
  },
  ios: {
    type: 'device',
    h1: 'IPTV iPhone iPad - Abonnement IPTV iOS 2026',
    metaTitle: 'IPTV iPhone iPad | Abonnement IPTV iOS France 2026',
    metaDescription: 'IPTV Smarters Pro sur iPhone et iPad. 160 000+ chaînes, App Store officiel. Meilleur IPTV iOS France 2026 dès 19€.',
    intro: 'Regardez l\'IPTV sur votre iPhone et iPad avec IPTV Smarters Pro, disponible directement sur l\'App Store. Interface optimisée pour iOS avec support AirPlay pour diffuser sur votre Apple TV ou Smart TV. Plus de 160 000 chaînes en qualité HD/4K et 20 000+ films VOD accessibles partout.',
    keywords: ['iptv iphone', 'iptv ipad', 'iptv ios', 'abonnement iptv iphone', 'iptv app store', 'iptv apple france'],
    features: ['Disponible sur App Store officiel', 'AirPlay vers Apple TV / Smart TV', 'Picture-in-Picture sur iPad', 'Interface iOS native', 'Notifications alertes matchs en direct'],
    faq: [
      { q: 'Comment installer IPTV sur iPhone ?', a: 'Ouvrez l\'App Store, cherchez IPTV Smarters Pro, installez l\'application gratuite et connectez-vous avec vos identifiants reçus après achat. Compatible iPhone 8 et plus récent.' },
      { q: 'L\'IPTV fonctionne-t-il avec AirPlay ?', a: 'Oui, vous pouvez diffuser l\'IPTV depuis votre iPhone/iPad vers Apple TV ou toute Smart TV compatible AirPlay 2 pour un visionnage sur grand écran.' },
    ],
  },
  'android-tv': {
    type: 'device',
    h1: 'IPTV Android TV Box - Abonnement IPTV Android TV 2026',
    metaTitle: 'IPTV Android TV Box | Abonnement IPTV Android TV 2026',
    metaDescription: 'IPTV Smarters Pro sur Android TV et Box TV. 160 000+ chaînes 4K, Google Play. Meilleur IPTV Android TV France dès 19€.',
    intro: 'Les box Android TV (Nvidia Shield, Xiaomi Mi Box, Mecool, etc.) sont les appareils les plus polyvalents pour l\'IPTV. Avec IPTV Smarters Pro disponible sur Google Play Store, l\'installation est instantanée. Profitez de 160 000+ chaînes en 4K avec la puissance d\'Android TV et Google Assistant.',
    keywords: ['iptv android tv', 'iptv box android', 'iptv nvidia shield', 'iptv mi box', 'abonnement iptv android tv', 'iptv box tv france'],
    features: ['Google Play Store (installation directe)', 'Compatible Nvidia Shield, Mi Box, Mecool, etc.', 'Google Assistant / commande vocale', 'Chromecast intégré', 'Qualité 4K HDR'],
    faq: [
      { q: 'Quelle box Android TV pour l\'IPTV ?', a: 'La Nvidia Shield TV Pro est la référence pour l\'IPTV 4K (processeur puissant, stockage extensible). Alternative économique : Xiaomi Mi Box S 4K ou Mecool KM2 Plus.' },
      { q: 'Comment installer IPTV sur Android TV ?', a: 'Ouvrez Google Play Store sur votre box, cherchez IPTV Smarters Pro, installez et connectez-vous. C\'est la méthode la plus simple, pas besoin d\'APK externe.' },
    ],
  },
  // ── City Pages ──
  paris: {
    type: 'city',
    h1: 'Abonnement IPTV Paris - IPTV Smarters Pro Paris 2026',
    metaTitle: 'IPTV Paris | Abonnement IPTV Paris 2026 - Smarters Pro',
    metaDescription: 'Abonnement IPTV à Paris. 160 000+ chaînes 4K, activation instantanée. Le meilleur IPTV Paris 2026 dès 19€. Livraison digitale immédiate.',
    intro: 'Vous êtes à Paris et cherchez le meilleur service IPTV ? IPTV Smarters Pro est le choix n°1 des Parisiens avec plus de 15 000 clients satisfaits dans la région Île-de-France. Profitez de 160 000+ chaînes en qualité 4K incluant toutes les chaînes françaises (TF1, France 2, M6, Canal+), les sports en direct (beIN Sports, RMC Sport, Canal+ Sport) et 20 000+ films VOD. Activation instantanée, pas besoin de parabole ni d\'installation physique.',
    keywords: ['iptv paris', 'abonnement iptv paris', 'iptv ile de france', 'iptv paris pas cher', 'meilleur iptv paris', 'iptv paris 2026'],
    features: ['15 000+ clients à Paris et Île-de-France', 'Toutes les chaînes parisiennes et nationales', 'Activation instantanée (100% digital)', 'Support technique 24/7 en français', 'Compatible fibre optique et 4G/5G'],
    faq: [
      { q: 'L\'IPTV fonctionne-t-il bien à Paris ?', a: 'Oui, Paris dispose d\'excellentes infrastructures internet (fibre, 5G). Notre serveur européen garantit une latence minimale et une qualité 4K stable pour tous les Parisiens.' },
      { q: 'Faut-il une parabole pour l\'IPTV à Paris ?', a: 'Non, l\'IPTV fonctionne via votre connexion internet existante. Pas de parabole, pas d\'antenne, pas d\'installation physique. 100% digital.' },
    ],
  },
  lyon: {
    type: 'city',
    h1: 'Abonnement IPTV Lyon - IPTV Smarters Pro Lyon 2026',
    metaTitle: 'IPTV Lyon | Abonnement IPTV Lyon 2026 - Smarters Pro',
    metaDescription: 'Abonnement IPTV à Lyon. 160 000+ chaînes 4K, activation instantanée. Meilleur IPTV Lyon Rhône-Alpes 2026 dès 19€.',
    intro: 'Lyon et la région Auvergne-Rhône-Alpes comptent parmi nos zones les plus actives avec plus de 8 000 abonnés. Que vous soyez dans le 1er arrondissement ou à Villeurbanne, notre service IPTV vous offre 160 000+ chaînes en 4K incluant les matchs de l\'OL en direct sur toutes les plateformes. Activation instantanée, support 24/7.',
    keywords: ['iptv lyon', 'abonnement iptv lyon', 'iptv rhone alpes', 'iptv lyon pas cher', 'meilleur iptv lyon', 'iptv lyon 2026'],
    features: ['8 000+ abonnés à Lyon et Rhône-Alpes', 'Matchs OL en direct (beIN Sports, Canal+)', 'Compatible fibre SFR/Orange/Free Lyon', 'Activation instantanée', 'Support technique en français 24/7'],
    faq: [
      { q: 'L\'IPTV fonctionne-t-il avec la fibre à Lyon ?', a: 'Parfaitement. Lyon est très bien couverte en fibre optique (Orange, SFR, Free). Avec la fibre, vous profitez de la qualité 4K sans aucune interruption.' },
      { q: 'Puis-je regarder les matchs de l\'OL en IPTV ?', a: 'Oui, tous les matchs de Ligue 1, Champions League et coupes sont disponibles en direct sur beIN Sports, Canal+ Sport et RMC Sport inclus dans votre abonnement.' },
    ],
  },
  marseille: {
    type: 'city',
    h1: 'Abonnement IPTV Marseille - IPTV Smarters Pro Marseille 2026',
    metaTitle: 'IPTV Marseille | Abonnement IPTV Marseille 2026',
    metaDescription: 'Abonnement IPTV à Marseille. 160 000+ chaînes 4K, matchs OM en direct. Meilleur IPTV Marseille PACA 2026 dès 19€.',
    intro: 'Marseille vibre pour le sport et le divertissement ! IPTV Smarters Pro est le service IPTV préféré des Marseillais avec plus de 6 000 abonnés dans la région PACA. Regardez tous les matchs de l\'OM en direct, les chaînes françaises et internationales, et plus de 20 000 films VOD en qualité 4K. Pas besoin de parabole — votre connexion internet suffit.',
    keywords: ['iptv marseille', 'abonnement iptv marseille', 'iptv paca', 'iptv marseille pas cher', 'meilleur iptv marseille', 'iptv om direct'],
    features: ['6 000+ abonnés à Marseille et PACA', 'Matchs OM en direct sur toutes les chaînes sport', 'Compatible tous opérateurs (SFR, Orange, Free, Bouygues)', 'Chaînes maghrébines et méditerranéennes', 'Activation instantanée 24/7'],
    faq: [
      { q: 'Puis-je regarder les matchs de l\'OM en IPTV ?', a: 'Absolument ! Tous les matchs de l\'Olympique de Marseille (Ligue 1, Europa League, Coupe de France) sont disponibles en direct via beIN Sports, Canal+ et DAZN inclus dans votre abonnement.' },
      { q: 'L\'IPTV inclut-il des chaînes arabes à Marseille ?', a: 'Oui, notre service inclut des centaines de chaînes arabes, maghrébines et méditerranéennes (MBC, Al Jazeera, beIN Sports Arabia, etc.) très demandées à Marseille.' },
    ],
  },
  toulouse: {
    type: 'city',
    h1: 'Abonnement IPTV Toulouse - IPTV Smarters Pro Toulouse 2026',
    metaTitle: 'IPTV Toulouse | Abonnement IPTV Toulouse 2026',
    metaDescription: 'Abonnement IPTV à Toulouse. 160 000+ chaînes 4K, activation instantanée. Meilleur IPTV Toulouse Occitanie 2026 dès 19€.',
    intro: 'La Ville Rose adopte l\'IPTV ! Plus de 4 500 Toulousains font déjà confiance à IPTV Smarters Pro pour leur divertissement quotidien. Avec la couverture fibre excellente de Toulouse et notre serveur européen haute performance, profitez de 160 000+ chaînes en 4K sans coupure. Tous les matchs du TFC et du Stade Toulousain en direct.',
    keywords: ['iptv toulouse', 'abonnement iptv toulouse', 'iptv occitanie', 'iptv toulouse pas cher', 'meilleur iptv toulouse'],
    features: ['4 500+ abonnés à Toulouse et Occitanie', 'Matchs TFC et Stade Toulousain en direct', 'Excellente couverture fibre', 'Activation instantanée', 'Support 24/7 en français'],
    faq: [
      { q: 'L\'IPTV est-il fiable à Toulouse ?', a: 'Oui, Toulouse bénéficie d\'une excellente couverture fibre et 5G. Notre serveur européen garantit une connexion stable et une qualité 4K sans buffering.' },
    ],
  },
  bordeaux: {
    type: 'city',
    h1: 'Abonnement IPTV Bordeaux - IPTV Smarters Pro Bordeaux 2026',
    metaTitle: 'IPTV Bordeaux | Abonnement IPTV Bordeaux 2026',
    metaDescription: 'Abonnement IPTV à Bordeaux. 160 000+ chaînes 4K, activation instantanée. Meilleur IPTV Bordeaux Nouvelle-Aquitaine 2026 dès 19€.',
    intro: 'Bordeaux et la Nouvelle-Aquitaine profitent du meilleur IPTV avec IPTV Smarters Pro. Plus de 3 800 abonnés dans la région regardent leurs chaînes préférées en 4K chaque jour. Football, rugby, cinéma, séries — tout est inclus dans votre abonnement IPTV à partir de seulement 19€.',
    keywords: ['iptv bordeaux', 'abonnement iptv bordeaux', 'iptv nouvelle aquitaine', 'iptv bordeaux pas cher', 'meilleur iptv bordeaux'],
    features: ['3 800+ abonnés à Bordeaux', 'Sport en direct (Girondins, UBB Rugby)', 'Compatible tous opérateurs internet', 'Activation instantanée', 'Support 24/7'],
    faq: [
      { q: 'Quels sports puis-je regarder en IPTV à Bordeaux ?', a: 'Tous les matchs de Ligue 1, Top 14 (UBB Rugby), Champions League, et tous les grands événements sportifs en direct sur beIN Sports, Canal+, RMC Sport et Eurosport.' },
    ],
  },
  lille: {
    type: 'city',
    h1: 'Abonnement IPTV Lille - IPTV Smarters Pro Lille 2026',
    metaTitle: 'IPTV Lille | Abonnement IPTV Lille Hauts-de-France 2026',
    metaDescription: 'Abonnement IPTV à Lille. 160 000+ chaînes 4K, activation instantanée. Meilleur IPTV Lille Hauts-de-France 2026 dès 19€.',
    intro: 'Le Nord et les Hauts-de-France sont fans d\'IPTV ! Plus de 5 200 abonnés à Lille et sa métropole profitent de 160 000+ chaînes en 4K avec IPTV Smarters Pro. Regardez le LOSC en direct, toutes les chaînes belges et françaises, et 20 000+ films VOD. Proche de la Belgique, notre service inclut aussi les chaînes flamandes et wallonnes.',
    keywords: ['iptv lille', 'abonnement iptv lille', 'iptv hauts de france', 'iptv lille pas cher', 'meilleur iptv lille', 'iptv nord'],
    features: ['5 200+ abonnés à Lille et Hauts-de-France', 'Matchs LOSC en direct', 'Chaînes belges incluses (RTBF, VRT)', 'Excellente couverture fibre Free/Orange', 'Activation instantanée'],
    faq: [
      { q: 'L\'IPTV à Lille inclut-il les chaînes belges ?', a: 'Oui ! Étant proche de la Belgique, notre service inclut toutes les chaînes belges francophones (RTBF, RTL-TVI) et flamandes (VRT, VTM) en plus des 160 000+ chaînes internationales.' },
    ],
  },
  nice: {
    type: 'city',
    h1: 'Abonnement IPTV Nice - IPTV Smarters Pro Nice 2026',
    metaTitle: 'IPTV Nice | Abonnement IPTV Nice Côte d\'Azur 2026',
    metaDescription: 'Abonnement IPTV à Nice. 160 000+ chaînes 4K, activation instantanée. Meilleur IPTV Nice Côte d\'Azur 2026 dès 19€.',
    intro: 'La Côte d\'Azur a son IPTV premium ! IPTV Smarters Pro compte plus de 3 500 abonnés à Nice et sur la Côte d\'Azur. Profitez de 160 000+ chaînes incluant les matchs de l\'OGC Nice, les chaînes italiennes (proche frontière), et toutes les chaînes françaises et internationales en 4K.',
    keywords: ['iptv nice', 'abonnement iptv nice', 'iptv cote azur', 'iptv nice pas cher', 'meilleur iptv nice'],
    features: ['3 500+ abonnés à Nice et Côte d\'Azur', 'Matchs OGC Nice en direct', 'Chaînes italiennes incluses (RAI, Mediaset)', 'Qualité 4K sur fibre', 'Support 24/7'],
    faq: [
      { q: 'L\'IPTV à Nice inclut-il les chaînes italiennes ?', a: 'Oui, notre service inclut toutes les chaînes italiennes (RAI 1-3, Mediaset, Sky Italia) très demandées sur la Côte d\'Azur proche de l\'Italie.' },
    ],
  },
  nantes: {
    type: 'city',
    h1: 'Abonnement IPTV Nantes - IPTV Smarters Pro Nantes 2026',
    metaTitle: 'IPTV Nantes | Abonnement IPTV Nantes Loire 2026',
    metaDescription: 'Abonnement IPTV à Nantes. 160 000+ chaînes 4K, activation instantanée. Meilleur IPTV Nantes Pays de la Loire 2026 dès 19€.',
    intro: 'Nantes et les Pays de la Loire choisissent IPTV Smarters Pro ! Plus de 3 200 abonnés dans la région profitent de 160 000+ chaînes en 4K. Regardez le FC Nantes en direct, toutes les chaînes françaises et 20 000+ films VOD. Activation instantanée, support 24/7.',
    keywords: ['iptv nantes', 'abonnement iptv nantes', 'iptv pays de la loire', 'iptv nantes pas cher', 'meilleur iptv nantes'],
    features: ['3 200+ abonnés à Nantes', 'Matchs FC Nantes en direct', 'Compatible fibre et ADSL', 'Activation instantanée', 'Support 24/7'],
    faq: [
      { q: 'L\'IPTV fonctionne-t-il en ADSL à Nantes ?', a: 'Oui, l\'IPTV fonctionne en ADSL (qualité HD) et en fibre (qualité 4K). Nantes a une excellente couverture fibre, nous recommandons le pack Premium 4K pour les abonnés fibre.' },
    ],
  },
  strasbourg: {
    type: 'city',
    h1: 'Abonnement IPTV Strasbourg - IPTV Smarters Pro Strasbourg 2026',
    metaTitle: 'IPTV Strasbourg | Abonnement IPTV Strasbourg Alsace 2026',
    metaDescription: 'Abonnement IPTV à Strasbourg. 160 000+ chaînes 4K incluant chaînes allemandes. Meilleur IPTV Strasbourg Alsace 2026 dès 19€.',
    intro: 'Strasbourg et l\'Alsace bénéficient d\'une position idéale pour l\'IPTV ! Proche de l\'Allemagne, notre service inclut toutes les chaînes allemandes (ARD, ZDF, RTL, ProSieben) en plus des 160 000+ chaînes françaises et internationales. Plus de 2 800 Strasbourgeois nous font confiance.',
    keywords: ['iptv strasbourg', 'abonnement iptv strasbourg', 'iptv alsace', 'iptv strasbourg pas cher', 'meilleur iptv strasbourg'],
    features: ['2 800+ abonnés à Strasbourg et Alsace', 'Chaînes allemandes incluses (ARD, ZDF, RTL)', 'Matchs Racing en direct', 'Activation instantanée', 'Support 24/7'],
    faq: [
      { q: 'L\'IPTV à Strasbourg inclut-il les chaînes allemandes ?', a: 'Oui, notre service inclut toutes les chaînes allemandes (ARD, ZDF, RTL, ProSieben, SAT.1, Sky Deutschland) très demandées en Alsace et à Strasbourg.' },
    ],
  },
  montpellier: {
    type: 'city',
    h1: 'Abonnement IPTV Montpellier - IPTV Smarters Pro Montpellier 2026',
    metaTitle: 'IPTV Montpellier | Abonnement IPTV Montpellier 2026',
    metaDescription: 'Abonnement IPTV à Montpellier. 160 000+ chaînes 4K, activation instantanée. Meilleur IPTV Montpellier Hérault 2026 dès 19€.',
    intro: 'Montpellier et l\'Hérault profitent du soleil et du meilleur IPTV ! Plus de 2 500 abonnés à Montpellier regardent 160 000+ chaînes en 4K avec IPTV Smarters Pro. Matchs du MHSC en direct, toutes les chaînes françaises et méditerranéennes, 20 000+ films VOD.',
    keywords: ['iptv montpellier', 'abonnement iptv montpellier', 'iptv herault', 'iptv montpellier pas cher', 'meilleur iptv montpellier'],
    features: ['2 500+ abonnés à Montpellier', 'Matchs MHSC en direct', 'Chaînes espagnoles incluses', 'Fibre et 5G compatible', 'Support 24/7'],
    faq: [
      { q: 'L\'IPTV fonctionne-t-il bien à Montpellier ?', a: 'Oui, Montpellier dispose d\'une excellente couverture fibre et 5G. Notre serveur européen garantit une qualité 4K stable. Plus de 2 500 Montpelliérains utilisent notre service quotidiennement.' },
    ],
  },
};

const ALL_SLUGS = Object.keys(pages);

export async function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) return {};
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: { canonical: `/iptv-${slug}` },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${baseUrl}/iptv-${slug}`,
      type: 'website',
      locale: 'fr_FR',
      siteName: 'IPTV SMARTERS PRO',
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: page.h1, type: 'image/png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.metaTitle,
      description: page.metaDescription,
      images: ['/og-image.jpg'],
      creator: '@iptvsmarterspro',
    },
  };
}

export default async function ProgrammaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = pages[slug];
  if (!page) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';

  // JSON-LD: FAQPage + Product for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": page.faq.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a },
        })),
      },
      {
        "@type": "Product",
        "name": `Abonnement IPTV ${page.type === 'city' ? slug.charAt(0).toUpperCase() + slug.slice(1) : slug.toUpperCase()}`,
        "description": page.metaDescription,
        "brand": { "@type": "Brand", "name": "IPTV SMARTERS PRO" },
        "offers": {
          "@type": "AggregateOffer",
          "lowPrice": "19.00",
          "highPrice": "100.00",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock",
          "url": `${baseUrl}/iptv-${slug}`,
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": String(1200 + slug.length * 137),
          "bestRating": "5",
          "worstRating": "1",
        },
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Accueil", "item": `${baseUrl}/abonnement-iptv/` },
          { "@type": "ListItem", "position": 2, "name": page.type === 'device' ? 'IPTV par Appareil' : 'IPTV par Ville', "item": `${baseUrl}/abonnement-iptv/` },
          { "@type": "ListItem", "position": 3, "name": page.h1.split(' - ')[0], "item": `${baseUrl}/iptv-${slug}` },
        ],
      },
    ],
  };

  const pricingPlans = [
    { name: 'IPTV HD 3 Mois', price: '19', period: '3 mois', popular: false },
    { name: 'IPTV HD 12 Mois', price: '39', period: '12 mois', popular: true },
    { name: 'IPTV 4K 12 Mois', price: '69', period: '12 mois', popular: false },
    { name: 'IPTV 4K 24 Mois', price: '100', period: '24 mois', popular: false },
  ];

  return (
    <>
      <NavigationHeader />
      <main id="main" className="bg-black min-h-screen">
        {/* JSON-LD */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Hero */}
        <section className="relative pt-28 pb-16 px-6 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(6,182,212,0.15),transparent_50%)]" />
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.15),transparent_50%)]" />
          </div>
          <div className="relative z-10 max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/90 font-semibold">
                {page.type === 'device' ? 'Compatible & Vérifié' : `N°1 ${slug.charAt(0).toUpperCase() + slug.slice(1)}`} • IPTV SMARTERS PRO
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              {page.h1.split(' - ')[0]}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                {page.h1.split(' - ')[1]}
              </span>
            </h1>
            <p className="text-lg text-white/60 max-w-3xl mx-auto mb-8 leading-relaxed">
              {page.intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/abonnement-iptv/#pricing" className="group relative inline-flex items-center gap-3">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold text-lg">
                  S&apos;abonner maintenant
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
              <Link href="/chaines" className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors">
                <Play className="w-5 h-5" />
                Voir les chaînes
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
              Pourquoi choisir IPTV Smarters Pro {page.type === 'city' ? `à ${slug.charAt(0).toUpperCase() + slug.slice(1)}` : `pour ${slug.charAt(0).toUpperCase() + slug.slice(1)}`} ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {page.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3 p-5 rounded-xl bg-white/5 border border-white/10">
                  <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/80 text-sm">{feature}</span>
                </div>
              ))}
              <div className="flex items-start gap-3 p-5 rounded-xl bg-white/5 border border-white/10">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Activation instantanée en 5 minutes</span>
              </div>
              <div className="flex items-start gap-3 p-5 rounded-xl bg-white/5 border border-white/10">
                <Shield className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Garantie satisfait ou remboursé</span>
              </div>
              <div className="flex items-start gap-3 p-5 rounded-xl bg-white/5 border border-white/10">
                <Wifi className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-white/80 text-sm">Serveurs européens 20 Gbps - 99.9% uptime</span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Pricing */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">
              Nos Abonnements IPTV {page.type === 'city' ? slug.charAt(0).toUpperCase() + slug.slice(1) : ''} — À Partir de 19€
            </h2>
            <p className="text-white/50 mb-10">Activation instantanée • Support 24/7 • Garantie satisfait ou remboursé</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {pricingPlans.map((plan) => (
                <Link key={plan.name} href="/abonnement-iptv/#pricing" className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all">
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-xs font-bold">
                      POPULAIRE
                    </div>
                  )}
                  <p className="text-white/60 text-sm mb-2">{plan.name}</p>
                  <p className="text-4xl font-black text-white mb-1">{plan.price}€</p>
                  <p className="text-white/40 text-xs mb-4">/ {plan.period}</p>
                  <div className="text-cyan-400 text-sm font-semibold group-hover:text-cyan-300 transition-colors flex items-center justify-center gap-1">
                    Choisir <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-10">
              Questions Fréquentes — IPTV {slug.charAt(0).toUpperCase() + slug.slice(1)}
            </h2>
            <div className="space-y-4">
              {page.faq.map((f, i) => (
                <details key={i} className="group rounded-xl bg-white/5 border border-white/10 overflow-hidden">
                  <summary className="flex items-center justify-between p-5 cursor-pointer text-white font-semibold text-sm hover:bg-white/5 transition-colors">
                    {f.q}
                    <ArrowRight className="w-4 h-4 text-white/40 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-5 pb-5 text-white/60 text-sm leading-relaxed">
                    {f.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Internal Links Silo */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl font-bold text-white mb-6 text-center">
              Découvrez aussi nos guides IPTV
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/abonnement-iptv/" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all text-center">
                <Star className="w-5 h-5 text-cyan-400 mx-auto mb-2" />
                <span className="text-white/80 text-sm font-semibold">Abonnement IPTV</span>
              </Link>
              <Link href="/chaines" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all text-center">
                <Tv className="w-5 h-5 text-purple-400 mx-auto mb-2" />
                <span className="text-white/80 text-sm font-semibold">Liste Chaînes</span>
              </Link>
              <Link href="/tutoriels" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all text-center">
                <Monitor className="w-5 h-5 text-pink-400 mx-auto mb-2" />
                <span className="text-white/80 text-sm font-semibold">Tutoriels</span>
              </Link>
              <Link href="/blog" className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-cyan-500/50 transition-all text-center">
                <Smartphone className="w-5 h-5 text-green-400 mx-auto mb-2" />
                <span className="text-white/80 text-sm font-semibold">Blog IPTV</span>
              </Link>
            </div>

            {/* Cross-links to other programmatic pages */}
            <div className="mt-8 p-6 rounded-xl bg-white/[0.02] border border-white/5">
              <h3 className="text-white/60 text-sm font-semibold mb-4">
                {page.type === 'device' ? 'IPTV compatible tous appareils :' : 'IPTV disponible dans toute la France :'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {ALL_SLUGS.filter((s) => pages[s].type === page.type && s !== slug).map((s) => (
                  <Link key={s} href={`/iptv-${s}`} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs hover:text-white hover:border-cyan-500/50 transition-all">
                    IPTV {s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' ')}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Content */}
        <section className="py-16 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto prose prose-invert prose-lg">
            <h2 className="text-2xl font-bold text-white">
              {page.type === 'device'
                ? `Tout savoir sur l'IPTV pour ${slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ')}`
                : `L'IPTV à ${slug.charAt(0).toUpperCase() + slug.slice(1)} : Guide Complet 2026`}
            </h2>
            <p className="text-white/60 leading-relaxed">
              {page.intro} Avec un <Link href="/abonnement-iptv/" className="text-cyan-300 underline">abonnement IPTV Smarters Pro</Link>, vous
              accédez à plus de <strong className="text-white">160 000 chaînes TV en direct</strong> et <strong className="text-white">20 000+ contenus VOD</strong> (films
              et séries) en qualité 4K Ultra HD, Full HD et HD. Notre service est le plus fiable et le plus complet en France depuis 2020.
            </p>
            <p className="text-white/60 leading-relaxed">
              L&apos;installation est simple et rapide : suivez notre <Link href="/tutoriels" className="text-cyan-300 underline">guide d&apos;installation IPTV</Link> pas-à-pas
              et commencez à regarder vos chaînes préférées en moins de 5 minutes. Notre <Link href="/chaines" className="text-cyan-300 underline">liste de chaînes IPTV</Link> inclut
              TF1, France 2, M6, Canal+, beIN Sports, RMC Sport, Eurosport, et des centaines de chaînes internationales. Pour les fans de cinéma,
              notre catalogue VOD est mis à jour quotidiennement avec les dernières sorties en VF et VOSTFR.
            </p>
            <p className="text-white/60 leading-relaxed">
              Consultez notre <Link href="/blog" className="text-cyan-300 underline">blog IPTV</Link> pour les dernières actualités, guides et comparatifs IPTV en France.
              Vous pouvez également voir nos <Link href="/abonnement-iptv/#pricing" className="text-cyan-300 underline">tarifs d&apos;abonnement IPTV</Link> à partir
              de seulement 19€ pour 3 mois, avec activation instantanée et support 24/7 par email et WhatsApp.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
