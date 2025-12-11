import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import Link from 'next/link';
import { ArrowRight, CheckCircle, AlertCircle, Download, Settings, Play, Smartphone } from 'lucide-react';
import Image from 'next/image';
import type { Metadata } from 'next';

const tutorialImages: Record<string, string[]> = {
  android: [
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/modern-smartphone-displaying-iptv-smarte-eb807e92-20251205183127.jpg',
  ],
  ios: [
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/iphone-displaying-iptv-streaming-app-wit-b31ace0e-20251205183127.jpg',
  ],
  'smart-tv': [
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/large-samsung-smart-tv-displaying-iptv-i-f0a6ddbf-20251205183126.jpg',
  ],
  'fire-tv': [
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/amazon-fire-tv-stick-4k-device-with-alex-3eff4fe7-20251205183127.jpg',
  ],
  'pc-mac': [
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/modern-desktop-computer-setup-showing-ip-a2ff9ce3-20251205183128.jpg',
  ],
  'android-tv': [
    'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/ba0e4002-35cb-42f6-b185-6a3961472a13/generated_images/android-tv-box-and-nvidia-shield-setup-s-6e871463-20251205183127.jpg',
  ],
};

type TutorialData = {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  requirements: string[];
  steps: {
    title: string;
    description: string;
    details: string[];
    imageAlt: string;
  }[];
  tips: string[];
  troubleshooting: {
    problem: string;
    solution: string;
  }[];
};

const tutorialsData: Record<string, TutorialData> = {
  android: {
    title: 'Installation IPTV SMARTERS PRO sur Android',
    description: 'Guide complet pour installer et configurer votre abonnement IPTV SMARTERS PRO sur smartphone et tablette Android',
    duration: '5 minutes',
    difficulty: 'Facile',
    requirements: [
      'Smartphone ou tablette Android 5.0+',
      'Connexion Internet stable (WiFi ou 4G/5G)',
      'Abonnement IPTV SMARTERS PRO actif',
      'Codes d\'activation (reçus par email/WhatsApp)',
    ],
    steps: [
      {
        title: 'Télécharger l\'Application IPTV SMARTERS PRO',
        description: 'Installez l\'application depuis Google Play Store ou APK',
        details: [
          'Ouvrez le Google Play Store sur votre appareil Android',
          'Recherchez "IPTV Smarters Pro" dans la barre de recherche',
          'Sélectionnez l\'application officielle (développeur: WHMCS SMARTERS)',
          'Appuyez sur "Installer" et attendez la fin du téléchargement',
          'Alternative : Téléchargez l\'APK depuis notre site web',
        ],
        imageAlt: 'Google Play Store IPTV Smarters Pro Download',
      },
      {
        title: 'Ouvrir et Configurer l\'Application',
        description: 'Lancez IPTV SMARTERS PRO et configurez votre premier profil',
        details: [
          'Ouvrez l\'application IPTV SMARTERS PRO installée',
          'Sur l\'écran d\'accueil, sélectionnez "Ajouter un Utilisateur"',
          'Choisissez "Login with Xtream Codes API" comme type de connexion',
          'Cette option permet la connexion avec votre abonnement IPTV',
          'Préparez vos identifiants reçus par email ou WhatsApp',
        ],
        imageAlt: 'IPTV Smarters Pro Welcome Screen Android',
      },
      {
        title: 'Entrer vos Identifiants IPTV',
        description: 'Saisissez les informations de votre abonnement IPTV SMARTERS PRO',
        details: [
          'Nom d\'utilisateur : Entrez votre username IPTV',
          'Mot de passe : Saisissez votre password IPTV',
          'URL du serveur : Collez l\'URL fournie (format: http://exemple.com:port)',
          'Vérifiez que tous les champs sont correctement remplis',
          'Cliquez sur "Ajouter Utilisateur" pour valider',
        ],
        imageAlt: 'IPTV Login Credentials Android Configuration',
      },
      {
        title: 'Activation et Vérification',
        description: 'Attendez la connexion aux serveurs IPTV et la synchronisation',
        details: [
          'L\'application se connecte aux serveurs IPTV (5-10 secondes)',
          'Chargement de vos 160 000+ chaînes IPTV et VOD',
          'Une fois connecté, vous verrez le menu principal',
          'Explorez les catégories : Live TV, Films, Séries, Catch-Up',
          'Testez quelques chaînes pour vérifier la qualité streaming',
        ],
        imageAlt: 'IPTV Smarters Pro Main Interface Android',
      },
      {
        title: 'Paramètres et Optimisation',
        description: 'Configurez les paramètres pour une expérience optimale',
        details: [
          'Accédez au menu Paramètres (icône engrenage)',
          'Player Settings : Sélectionnez "ExoPlayer" pour meilleure performance',
          'Qualité vidéo : Choisissez "Auto" ou "4K/Full HD" selon votre connexion',
          'EPG (Guide TV) : Activez pour voir les programmes à venir',
          'Contrôle parental : Activez un code PIN pour contenus adultes (Premium)',
        ],
        imageAlt: 'IPTV Smarters Pro Settings Android Optimization',
      },
    ],
    tips: [
      'Utilisez une connexion WiFi 5 GHz ou 4G/5G pour streaming 4K optimal',
      'Fermez les applications en arrière-plan pour libérer la RAM',
      'Activez le mode "Ne pas déranger" pendant le visionnage IPTV',
      'Mettez à jour régulièrement IPTV SMARTERS PRO depuis Play Store',
      'Sauvegardez vos identifiants IPTV dans un endroit sûr',
      'Utilisez un VPN pour une confidentialité maximale (optionnel)',
    ],
    troubleshooting: [
      {
        problem: 'L\'application ne se connecte pas au serveur IPTV',
        solution: 'Vérifiez votre connexion Internet, l\'URL du serveur (inclure http://), et que votre abonnement IPTV est actif. Redémarrez l\'application.',
      },
      {
        problem: 'Buffering constant ou coupures pendant le streaming',
        solution: 'Testez votre vitesse Internet (minimum 10 Mbps pour HD, 25 Mbps pour 4K). Changez de serveur IPTV dans les paramètres. Réduisez la qualité vidéo.',
      },
      {
        problem: 'Les chaînes ne se chargent pas ou écran noir',
        solution: 'Changez le lecteur vidéo dans Paramètres (ExoPlayer recommandé). Videz le cache de l\'application. Réinstallez IPTV SMARTERS PRO si nécessaire.',
      },
      {
        problem: 'Erreur "Invalid Credentials" lors de la connexion',
        solution: 'Vérifiez que username, password et URL sont exacts (sensible aux majuscules). Contactez le support pour vérifier que votre abonnement IPTV est bien activé.',
      },
    ],
  },
  ios: {
    title: 'Installation IPTV SMARTERS PRO sur iOS',
    description: 'Guide complet pour installer et configurer votre abonnement IPTV sur iPhone et iPad',
    duration: '5 minutes',
    difficulty: 'Facile',
    requirements: [
      'iPhone ou iPad avec iOS 12.0 ou supérieur',
      'Connexion Internet WiFi ou données mobiles',
      'Abonnement IPTV SMARTERS PRO actif',
      'Identifiants de connexion IPTV',
    ],
    steps: [
      {
        title: 'Télécharger depuis l\'App Store',
        description: 'Installez l\'application officielle IPTV SMARTERS PRO',
        details: [
          'Ouvrez l\'App Store sur votre iPhone ou iPad',
          'Recherchez "IPTV Smarters Pro" dans la barre de recherche',
          'Téléchargez l\'application officielle WHMCS SMARTERS',
          'Entrez votre mot de passe Apple ID ou utilisez Touch ID/Face ID',
          'Attendez la fin de l\'installation (environ 30 secondes)',
        ],
        imageAlt: 'App Store IPTV Smarters Pro iOS Download',
      },
      {
        title: 'Configuration Initiale iOS',
        description: 'Première ouverture et ajout de votre profil IPTV',
        details: [
          'Lancez IPTV SMARTERS PRO depuis l\'écran d\'accueil',
          'Acceptez les autorisations demandées (notifications optionnelles)',
          'Appuyez sur "Add New User" pour créer votre profil',
          'Sélectionnez "Login with Xtream Codes API"',
          'Préparez vos identifiants d\'abonnement IPTV reçus',
        ],
        imageAlt: 'IPTV Smarters iOS First Launch Setup',
      },
      {
        title: 'Saisie des Identifiants',
        description: 'Entrez vos informations d\'abonnement IPTV SMARTERS PRO',
        details: [
          'Username : Votre nom d\'utilisateur IPTV',
          'Password : Votre mot de passe IPTV',
          'Server URL : L\'adresse du serveur (http://serveur:port)',
          'Utilisez le clavier iOS pour saisir précisément',
          'Touchez "Add User" pour finaliser',
        ],
        imageAlt: 'iOS IPTV Login Screen Configuration',
      },
      {
        title: 'Connexion et Synchronisation',
        description: 'Chargement de vos chaînes et contenu VOD',
        details: [
          'L\'app se connecte aux serveurs IPTV',
          'Synchronisation des 160 000+ chaînes en cours',
          'Téléchargement des images et métadonnées',
          'Interface principale affichée avec toutes vos options',
          'Navigation : Live TV, Movies, Series, Settings',
        ],
        imageAlt: 'IPTV Smarters Pro iOS Main Dashboard',
      },
      {
        title: 'Paramètres iOS Optimaux',
        description: 'Optimisez l\'application pour iOS',
        details: [
          'Ouvrez Settings depuis le menu',
          'Player : Sélectionnez "AVPlayer" (natif iOS)',
          'Qualité : "Auto" pour adaptation automatique',
          'Sous-titres : Activez si nécessaire',
          'EPG : Synchronisez le guide TV',
        ],
        imageAlt: 'IPTV Smarters iOS Settings Configuration',
      },
    ],
    tips: [
      'Connectez-vous en WiFi pour le premier chargement (économie de données)',
      'Ajoutez IPTV SMARTERS à votre dock iOS pour accès rapide',
      'Activez le mode Picture-in-Picture dans les paramètres iOS',
      'Utilisez AirPlay pour diffuser sur Apple TV',
      'Mettez l\'app à jour régulièrement depuis l\'App Store',
      'Créez plusieurs profils IPTV pour différents membres de la famille',
    ],
    troubleshooting: [
      {
        problem: 'L\'application crash au démarrage sur iOS',
        solution: 'Redémarrez votre iPhone/iPad. Désinstallez et réinstallez IPTV SMARTERS PRO. Vérifiez que vous avez iOS 12.0 minimum. Libérez de l\'espace de stockage.',
      },
      {
        problem: 'Impossible de télécharger depuis l\'App Store',
        solution: 'Vérifiez votre connexion Internet. Assurez-vous que votre Apple ID est valide. Essayez de vous déconnecter/reconnecter à l\'App Store. Redémarrez l\'appareil.',
      },
      {
        problem: 'Le streaming lag ou se coupe sur iPhone',
        solution: 'Passez en WiFi plutôt que 4G. Fermez toutes les apps en arrière-plan. Baissez la qualité vidéo dans les paramètres IPTV. Testez votre vitesse Internet.',
      },
      {
        problem: 'Les chaînes mettent du temps à charger',
        solution: 'Videz le cache dans les paramètres de l\'app. Changez de serveur IPTV. Vérifiez que votre abonnement IPTV n\'est pas expiré. Contactez le support.',
      },
    ],
  },
  'smart-tv': {
    title: 'Installation IPTV sur Smart TV Samsung & LG',
    description: 'Configuration complète de votre abonnement IPTV SMARTERS PRO sur Smart TV',
    duration: '10 minutes',
    difficulty: 'Moyen',
    requirements: [
      'Smart TV Samsung (Tizen 2016+) ou LG (webOS 3.0+)',
      'Connexion Internet Ethernet ou WiFi',
      'Télécommande Smart TV',
      'Abonnement IPTV SMARTERS PRO avec URL M3U',
    ],
    steps: [
      {
        title: 'Installer Smart IPTV ou SS IPTV',
        description: 'Téléchargez l\'application IPTV depuis le store de votre TV',
        details: [
          'Samsung : Ouvrez "Apps" puis cherchez "Smart IPTV" ou "SS IPTV"',
          'LG : Ouvrez "LG Content Store" puis "Apps"',
          'Recherchez "Smart IPTV", "SS IPTV" ou "IPTV Smarters"',
          'Installez l\'application sélectionnée',
          'Attendez la fin du téléchargement (1-2 minutes)',
        ],
        imageAlt: 'Smart TV App Store IPTV Installation',
      },
      {
        title: 'Lancer et Configurer l\'Application',
        description: 'Première configuration sur votre Smart TV',
        details: [
          'Ouvrez l\'application IPTV installée',
          'Notez le code MAC address affiché à l\'écran (si Smart IPTV)',
          'Pour SS IPTV : Choisissez "External Playlist"',
          'Préparez votre URL de playlist M3U',
          'Utilisez la télécommande pour naviguer',
        ],
        imageAlt: 'Smart TV IPTV App First Launch',
      },
      {
        title: 'Ajouter la Playlist IPTV M3U',
        description: 'Configuration de votre liste de chaînes IPTV',
        details: [
          'Méthode 1 : Entrez l\'URL M3U directement sur la TV',
          'Méthode 2 : Allez sur le site Smart IPTV depuis un PC',
          'Entrez le code MAC de votre TV + URL M3U',
          'Pour SS IPTV : Settings > Content > External Playlists',
          'Collez votre URL d\'abonnement IPTV SMARTERS PRO',
        ],
        imageAlt: 'Smart TV M3U Playlist Configuration',
      },
      {
        title: 'Chargement des Chaînes',
        description: 'Synchronisation de votre abonnement IPTV',
        details: [
          'L\'application télécharge la liste des chaînes IPTV',
          'Temps de chargement : 2-5 minutes selon le nombre de chaînes',
          'Les catégories s\'affichent : Sport, Cinéma, Séries, etc.',
          'Logos des chaînes se téléchargent progressivement',
          'Une fois terminé, naviguez dans vos 160 000+ chaînes',
        ],
        imageAlt: 'Smart TV IPTV Channels Loading',
      },
      {
        title: 'Optimisation et Paramètres TV',
        description: 'Configuration optimale pour streaming 4K',
        details: [
          'Paramètres réseau : Privilégiez Ethernet pour stabilité',
          'Paramètres d\'image : Mode "Film" ou "Standard" recommandé',
          'Buffer : Augmentez la mise en mémoire tampon si buffering',
          'EPG : Ajoutez l\'URL du guide TV électronique',
          'Favoris : Marquez vos chaînes IPTV préférées',
        ],
        imageAlt: 'Smart TV IPTV Settings Optimization',
      },
    ],
    tips: [
      'Utilisez un câble Ethernet pour connexion stable (recommandé pour 4K)',
      'Redémarrez votre Smart TV après installation pour meilleure performance',
      'Smart IPTV nécessite activation payante après 7 jours d\'essai (6€)',
      'SS IPTV est gratuit mais avec publicités',
      'Mettez à jour le firmware de votre Smart TV régulièrement',
      'Créez des listes de favoris par catégorie (Sport, Films, Actualités)',
    ],
    troubleshooting: [
      {
        problem: 'L\'application IPTV n\'apparaît pas dans le store',
        solution: 'Vérifiez que votre Smart TV est bien connectée à Internet. Changez de région dans les paramètres TV. Pour Samsung ancien modèle, utilisez clé USB avec APK. Contactez support Samsung/LG.',
      },
      {
        problem: 'Les chaînes IPTV ne se chargent pas',
        solution: 'Vérifiez que l\'URL M3U est correcte et active. Testez l\'URL sur un PC avec VLC. Redémarrez l\'application et la TV. Vérifiez que votre abonnement IPTV n\'est pas expiré.',
      },
      {
        problem: 'Image saccadée ou buffering constant',
        solution: 'Passez en connexion Ethernet. Vérifiez vitesse Internet (minimum 25 Mbps pour 4K). Réduisez qualité dans paramètres. Fermez autres applications Smart TV. Redémarrez le routeur.',
      },
      {
        problem: 'Smart IPTV demande activation après 7 jours',
        solution: 'C\'est normal, Smart IPTV nécessite paiement unique de 6€. Allez sur siptv.eu, entrez MAC address de votre TV, payez par carte. Alternative gratuite : utilisez SS IPTV.',
      },
    ],
  },
  'fire-tv': {
    title: 'Installation IPTV sur Amazon Fire TV Stick',
    description: 'Guide complet pour Fire TV Stick 4K, Fire TV Stick et Fire TV Cube',
    duration: '8 minutes',
    difficulty: 'Facile',
    requirements: [
      'Amazon Fire TV Stick, Fire TV Stick 4K ou Fire TV Cube',
      'Télécommande Fire TV',
      'Connexion Internet WiFi stable',
      'Abonnement IPTV SMARTERS PRO actif',
    ],
    steps: [
      {
        title: 'Autoriser Sources Inconnues',
        description: 'Activez l\'installation d\'applications tierces',
        details: [
          'Allez dans "Paramètres" depuis l\'écran d\'accueil Fire TV',
          'Sélectionnez "My Fire TV" ou "Ma Fire TV"',
          'Choisissez "Options pour les développeurs"',
          'Activez "Apps provenant de sources inconnues"',
          'Confirmez le message d\'avertissement',
        ],
        imageAlt: 'Fire TV Settings Unknown Sources Enable',
      },
      {
        title: 'Installer Downloader App',
        description: 'Téléchargez l\'outil pour installer IPTV SMARTERS',
        details: [
          'Retournez à l\'écran d\'accueil Fire TV',
          'Utilisez la recherche (icône loupe) et tapez "Downloader"',
          'Sélectionnez l\'app "Downloader" (par AFTVnews)',
          'Cliquez sur "Télécharger" ou "Get"',
          'Attendez la fin de l\'installation',
        ],
        imageAlt: 'Fire TV Downloader App Installation',
      },
      {
        title: 'Télécharger IPTV SMARTERS PRO APK',
        description: 'Utilisez Downloader pour obtenir l\'application IPTV',
        details: [
          'Ouvrez l\'application Downloader',
          'Dans le champ URL, entrez : https://bit.ly/iptvsmarterspro',
          'Ou utilisez le code fourni par notre support',
          'Cliquez sur "Go" pour lancer le téléchargement',
          'L\'APK IPTV SMARTERS PRO se télécharge (15-30 secondes)',
        ],
        imageAlt: 'Fire TV Downloader IPTV Smarters APK Download',
      },
      {
        title: 'Installer IPTV SMARTERS PRO',
        description: 'Installation de l\'application sur Fire TV',
        details: [
          'Une fois le téléchargement terminé, cliquez sur "Install"',
          'L\'installation démarre automatiquement',
          'Attendez le message "App installed" (10-20 secondes)',
          'Cliquez sur "Done" (ne pas ouvrir tout de suite)',
          'Supprimez l\'APK pour libérer de l\'espace',
        ],
        imageAlt: 'Fire TV IPTV Smarters Installation Complete',
      },
      {
        title: 'Configuration et Connexion IPTV',
        description: 'Configurez votre abonnement IPTV SMARTERS PRO',
        details: [
          'Ouvrez IPTV SMARTERS PRO depuis "Your Apps & Channels"',
          'Sélectionnez "Add New User"',
          'Choisissez "Login with Xtream Codes API"',
          'Entrez vos identifiants : Username, Password, Server URL',
          'Validez et attendez la connexion aux serveurs IPTV',
        ],
        imageAlt: 'Fire TV IPTV Smarters Login Configuration',
      },
    ],
    tips: [
      'Ajoutez IPTV SMARTERS à vos favoris Fire TV pour accès rapide',
      'Utilisez WiFi 5 GHz pour meilleure qualité streaming 4K',
      'Redémarrez Fire TV Stick après installation pour optimisation',
      'Désactivez les mises à jour automatiques d\'Amazon pour stabilité',
      'Utilisez une souris Bluetooth pour navigation plus facile',
      'Nettoyez le cache régulièrement dans "Applications"',
    ],
    troubleshooting: [
      {
        problem: 'Downloader n\'apparaît pas dans la recherche Fire TV',
        solution: 'Allez dans Amazon Appstore depuis un navigateur, cherchez Downloader, et envoyez-le vers votre Fire TV. Ou recherchez "Downloader by AFTVnews" exactement.',
      },
      {
        problem: 'Erreur "Installation bloquée" lors de l\'install APK',
        solution: 'Retournez dans Paramètres > My Fire TV > Options développeurs et vérifiez que "Sources inconnues" est bien activé. Redémarrez Fire TV et réessayez.',
      },
      {
        problem: 'IPTV SMARTERS lag ou crash sur Fire TV Stick',
        solution: 'Videz le cache : Paramètres > Applications > Gérer applications > IPTV Smarters > Vider cache. Fermez apps en arrière-plan. Redémarrez Fire TV Stick.',
      },
      {
        problem: 'Pas de son ou image noire sur certaines chaînes',
        solution: 'Changez le lecteur dans paramètres IPTV (ExoPlayer). Vérifiez les paramètres audio Fire TV. Testez avec une autre chaîne. Réinstallez l\'app si problème persiste.',
      },
    ],
  },
  'pc-mac': {
    title: 'Installation IPTV sur PC Windows & Mac',
    description: 'Configuration IPTV SMARTERS PRO sur ordinateur Windows et MacOS',
    duration: '7 minutes',
    difficulty: 'Facile',
    requirements: [
      'PC Windows 7+ ou Mac OS X 10.10+',
      'Connexion Internet haut débit',
      'Abonnement IPTV SMARTERS PRO',
      'URL de playlist M3U ou identifiants Xtream',
    ],
    steps: [
      {
        title: 'Télécharger IPTV SMARTERS Windows/Mac',
        description: 'Installation de l\'application bureau',
        details: [
          'Windows : Visitez le site officiel whmcssmarters.com',
          'Mac : Téléchargez depuis l\'App Store ou site officiel',
          'Cliquez sur "Download for Windows" ou "Download for Mac"',
          'Enregistrez le fichier d\'installation (exe/dmg)',
          'Attendez la fin du téléchargement (50-100 Mo)',
        ],
        imageAlt: 'PC Mac IPTV Smarters Download Website',
      },
      {
        title: 'Installation sur PC/Mac',
        description: 'Installer l\'application sur votre ordinateur',
        details: [
          'Windows : Double-cliquez sur le fichier .exe téléchargé',
          'Mac : Ouvrez le fichier .dmg et glissez l\'app dans Applications',
          'Suivez l\'assistant d\'installation (Next > Accept > Install)',
          'Autorisez l\'installation si Windows Defender ou Gatekeeper demande',
          'Lancez IPTV SMARTERS PRO une fois installé',
        ],
        imageAlt: 'IPTV Smarters PC Mac Installation Wizard',
      },
      {
        title: 'Connexion avec Identifiants',
        description: 'Ajoutez votre abonnement IPTV',
        details: [
          'Cliquez sur "Add User" ou "Ajouter Utilisateur"',
          'Sélectionnez "Login with Xtream Codes API"',
          'Remplissez : Username, Password, Server URL',
          'Ou choisissez "Load Your Playlist or File/URL" pour M3U',
          'Cliquez "Add User" et attendez la connexion',
        ],
        imageAlt: 'PC IPTV Smarters Login Screen',
      },
      {
        title: 'Navigation Interface PC',
        description: 'Découvrez l\'interface IPTV sur ordinateur',
        details: [
          'Menu latéral gauche : Live TV, Movies, Series, Settings',
          'Grille de chaînes avec logos et noms',
          'Double-cliquez sur une chaîne pour lancer le streaming',
          'Barre de recherche en haut pour trouver chaînes rapidement',
          'Utilisez clavier (flèches, espace, F) pour contrôles',
        ],
        imageAlt: 'IPTV Smarters PC Interface Dashboard',
      },
      {
        title: 'Configuration Avancée PC',
        description: 'Optimisez les paramètres pour PC/Mac',
        details: [
          'Settings > Player Settings : Choisissez "VLC" ou "Default"',
          'Qualité vidéo : Sélectionnez "4K" ou "Auto"',
          'EPG : Synchronisez le guide TV électronique',
          'Sous-titres : Configurez taille et position',
          'Raccourcis clavier : Personnalisez les touches',
        ],
        imageAlt: 'PC IPTV Smarters Advanced Settings',
      },
    ],
    tips: [
      'Installez VLC Media Player pour meilleure compatibilité codecs',
      'Utilisez mode plein écran (F ou F11) pour expérience optimale',
      'Connectez votre PC à la TV via HDMI pour grand écran',
      'Créez un raccourci bureau pour IPTV SMARTERS',
      'Utilisez souris ou clavier pour navigation rapide',
      'Activez accélération matérielle GPU dans paramètres vidéo',
    ],
    troubleshooting: [
      {
        problem: 'L\'application ne s\'installe pas sur Windows',
        solution: 'Désactivez temporairement l\'antivirus. Exécutez le fichier en tant qu\'administrateur (clic droit > Exécuter en tant qu\'administrateur). Vérifiez que Windows est à jour.',
      },
      {
        problem: 'Mac bloque l\'ouverture de l\'application',
        solution: 'Allez dans Préférences Système > Sécurité et Confidentialité > Général. Cliquez "Ouvrir quand même" à côté du message bloqué. Ou : clic droit sur l\'app > Ouvrir.',
      },
      {
        problem: 'Écran noir ou pas de vidéo sur PC',
        solution: 'Installez VLC Media Player. Changez le lecteur dans Settings. Mettez à jour vos pilotes graphiques (NVIDIA/AMD). Désactivez accélération matérielle si problème.',
      },
      {
        problem: 'Streaming lag ou saccadé sur ordinateur',
        solution: 'Fermez les programmes en arrière-plan. Vérifiez utilisation CPU/RAM (Gestionnaire tâches). Baissez la qualité vidéo. Utilisez connexion Ethernet plutôt que WiFi.',
      },
    ],
  },
  'android-tv': {
    title: 'Installation IPTV sur Android TV & Box IPTV',
    description: 'Guide pour Android TV, Nvidia Shield, Mi Box, Box IPTV',
    duration: '6 minutes',
    difficulty: 'Facile',
    requirements: [
      'Android TV, Nvidia Shield, Mi Box ou Box IPTV',
      'Android TV 8.0 ou supérieur recommandé',
      'Télécommande ou souris USB/Bluetooth',
      'Abonnement IPTV SMARTERS PRO actif',
    ],
    steps: [
      {
        title: 'Installer depuis Google Play Store',
        description: 'Téléchargement direct sur Android TV',
        details: [
          'Ouvrez le Play Store sur votre Android TV',
          'Utilisez la recherche et tapez "IPTV Smarters Pro"',
          'Sélectionnez l\'application officielle',
          'Cliquez sur "Installer" avec la télécommande',
          'Attendez le téléchargement et installation automatique',
        ],
        imageAlt: 'Android TV Play Store IPTV Installation',
      },
      {
        title: 'Lancement et Configuration',
        description: 'Première ouverture sur Android TV',
        details: [
          'Ouvrez IPTV SMARTERS PRO depuis le lanceur d\'apps',
          'Interface optimisée Android TV s\'affiche',
          'Sélectionnez "Add New User" avec la télécommande',
          'Choisissez "Login with Xtream Codes API"',
          'Préparez vos identifiants d\'abonnement IPTV',
        ],
        imageAlt: 'Android TV IPTV Smarters First Launch',
      },
      {
        title: 'Saisie Identifiants avec Télécommande',
        description: 'Entrez vos informations IPTV',
        details: [
          'Utilisez le clavier virtuel Android TV',
          'Username : Votre nom d\'utilisateur IPTV',
          'Password : Votre mot de passe IPTV',
          'Server URL : L\'adresse complète du serveur',
          'Validez avec le bouton OK de la télécommande',
        ],
        imageAlt: 'Android TV Virtual Keyboard IPTV Login',
      },
      {
        title: 'Synchronisation Chaînes',
        description: 'Chargement du contenu IPTV',
        details: [
          'Connexion aux serveurs IPTV en cours',
          'Téléchargement liste 160 000+ chaînes',
          'Interface Android TV adaptée au format TV',
          'Navigation : Flèches directionnelles télécommande',
          'Testez quelques chaînes pour vérifier',
        ],
        imageAlt: 'Android TV IPTV Content Loaded',
      },
      {
        title: 'Paramètres Android TV Optimaux',
        description: 'Configuration pour meilleure expérience',
        details: [
          'Settings > Player : Sélectionnez "ExoPlayer"',
          'Qualité : "Auto" ou "4K" selon votre TV',
          'Interface : Mode "Android TV Leanback"',
          'EPG : Activez guide TV électronique',
          'Contrôle parental : PIN pour contenus adultes',
        ],
        imageAlt: 'Android TV IPTV Settings Configuration',
      },
    ],
    tips: [
      'Nvidia Shield offre les meilleures performances pour 4K',
      'Utilisez souris Bluetooth pour navigation plus rapide',
      'Activez "Restez connecté" pour ne pas ressaisir identifiants',
      'Créez des favoris pour accès rapide à vos chaînes',
      'Mettez à jour Android TV et IPTV SMARTERS régulièrement',
      'Utilisez VPN sur Android TV pour confidentialité accrue',
    ],
    troubleshooting: [
      {
        problem: 'Play Store n\'est pas disponible sur ma Box IPTV',
        solution: 'Utilisez méthode APK : Téléchargez IPTV Smarters APK sur clé USB, connectez à la box, installez avec un gestionnaire de fichiers. Ou activez sources inconnues et utilisez Downloader.',
      },
      {
        problem: 'L\'application freeze ou crash sur Android TV',
        solution: 'Videz le cache : Settings > Apps > IPTV Smarters > Clear cache. Redémarrez Android TV. Vérifiez mémoire disponible (minimum 1 GB recommandé). Fermez apps en arrière-plan.',
      },
      {
        problem: 'Qualité vidéo mauvaise malgré connexion rapide',
        solution: 'Forcez qualité "4K" ou "Full HD" dans paramètres. Changez de serveur IPTV. Désactivez upscaling automatique TV. Vérifiez résolution sortie Android TV (4K@60Hz).',
      },
      {
        problem: 'Télécommande ne répond pas dans l\'application',
        solution: 'Appairez à nouveau la télécommande dans paramètres Android TV. Utilisez une souris USB comme alternative. Vérifiez que les piles sont chargées. Redémarrez l\'appareil.',
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = tutorialsData[slug];
  
  if (!tutorial) {
    return {
      title: 'Tutoriel IPTV - IPTV SMARTERS PRO',
    };
  }

  return {
    title: `${tutorial.title} - Guide Complet IPTV`,
    description: tutorial.description,
    keywords: `tutoriel ${slug} iptv, installer iptv ${slug}, configuration iptv smarters pro, guide iptv, abonnement iptv`,
  };
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = tutorialsData[slug];

  if (!tutorial) {
    return (
      <main className="min-h-screen bg-black">
        <NavigationHeader />
        <div className="pt-32 pb-20 px-6 text-center">
          <h1 className="text-4xl font-black text-white mb-4">Tutoriel non trouvé</h1>
          <Link href="/tutoriels" className="text-cyan-400 hover:underline">
            Retour aux tutoriels
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black">
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        
        <div className="relative max-w-5xl mx-auto">
          <Link 
            href="/tutoriels"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition-colors mb-8"
          >
            ← Retour aux tutoriels
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
              {tutorial.title}
            </h1>
            <p className="text-xl text-white/70 mb-6">
              {tutorial.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                <span className="text-sm font-bold text-cyan-400">⏱️ {tutorial.duration}</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                <span className="text-sm font-bold text-green-400">📊 {tutorial.difficulty}</span>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              Prérequis
            </h3>
            <ul className="space-y-2">
              {tutorial.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3 text-white/70">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span>{req}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            Guide Étape par <span className="text-cyan-400">Étape</span>
          </h2>

          <div className="space-y-8">
            {tutorial.steps.map((step, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/60">{step.description}</p>
                  </div>
                </div>

                <div className="ml-16">
                  <ul className="space-y-3 mb-6">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/70">
                        <ArrowRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Placeholder for image */}
                  <div className="rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-white/10 p-8 text-center">
                    <Smartphone className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                    <p className="text-white/60 text-sm">{step.imageAlt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-purple-900/10 to-cyan-900/10">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            Conseils <span className="text-cyan-400">Pratiques</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            {tutorial.tips.map((tip, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-white/70">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-12 text-center">
            Dépannage <span className="text-cyan-400">IPTV</span>
          </h2>

          <div className="space-y-6">
            {tutorial.troubleshooting.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/30"
              >
                <div className="flex items-start gap-3 mb-3">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-white">{item.problem}</h3>
                </div>
                <p className="ml-9 text-white/70 leading-relaxed">{item.solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-sm border border-cyan-500/20">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Besoin d'Aide ?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Notre support 24/7 est là pour vous aider avec l'installation de votre <strong>abonnement IPTV SMARTERS PRO</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
              >
                Contacter le Support
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/#pricing"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                S'abonner Maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}