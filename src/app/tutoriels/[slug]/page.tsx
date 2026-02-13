import NavigationHeader from '@/components/sections/navigation-header';
import Footer from '@/components/sections/footer';
import InternalLinksSilo from '@/components/sections/internal-links-silo';
import Link from 'next/link';
import { ArrowRight, CheckCircle, AlertCircle, Download, Settings, Play, Smartphone, Tv, Monitor, Shield, Search, LogIn, Wifi, Zap, Info } from 'lucide-react';
import type { Metadata } from 'next';

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
    note?: string;
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
    description: 'Guide complet pas-à-pas pour installer et configurer IPTV SMARTERS PRO sur votre smartphone ou tablette Android en quelques minutes',
    duration: '5 minutes',
    difficulty: 'Facile',
    requirements: [
      'Smartphone ou tablette Android version 5.0 ou supérieur',
      'Connexion Internet stable (WiFi recommandé, 4G/5G possible)',
      'Un abonnement IPTV SMARTERS PRO actif',
      'Vos identifiants de connexion IPTV (Username, Password, URL serveur) reçus par email ou WhatsApp après achat',
    ],
    steps: [
      {
        title: 'Télécharger l\'application IPTV Smarters Pro',
        description: 'L\'application IPTV Smarters Pro n\'est plus disponible sur le Google Play Store officiel. Vous devez télécharger le fichier APK.',
        details: [
          'Ouvrez le navigateur de votre téléphone Android (Chrome, Firefox, etc.)',
          'Rendez-vous sur le site officiel : iptvsmarters.com puis cliquez sur "Downloads"',
          'Sélectionnez "Download for Android" pour obtenir le fichier APK',
          'Si votre navigateur affiche un avertissement de sécurité, appuyez sur "Télécharger quand même" — le fichier est sans danger',
          'Attendez la fin du téléchargement du fichier APK (environ 30 secondes)',
        ],
        note: 'Important : L\'application sur le Google Play Store n\'est PAS la version officielle complète. Utilisez toujours l\'APK du site officiel pour avoir toutes les fonctionnalités.',
        imageAlt: 'Téléchargement APK IPTV Smarters Pro depuis le site officiel',
      },
      {
        title: 'Autoriser l\'installation depuis des sources inconnues',
        description: 'Android bloque par défaut l\'installation d\'applications hors Play Store. Vous devez autoriser cette permission.',
        details: [
          'Allez dans les Paramètres de votre téléphone Android',
          'Cherchez "Sécurité" ou "Confidentialité" (selon votre version Android)',
          'Trouvez l\'option "Sources inconnues" ou "Installer des apps inconnues"',
          'Sur Android 8.0 et plus : autorisez votre navigateur (Chrome) à installer des apps',
          'Sur Android plus ancien : activez simplement "Sources inconnues"',
          'Validez le message d\'avertissement en appuyant sur "OK" ou "Autoriser"',
        ],
        note: 'Cette étape est obligatoire. Sans cette autorisation, Android refusera d\'installer le fichier APK.',
        imageAlt: 'Paramètres Android — Autoriser sources inconnues',
      },
      {
        title: 'Installer et ouvrir IPTV Smarters Pro',
        description: 'Installez le fichier APK téléchargé et lancez l\'application pour la première fois.',
        details: [
          'Ouvrez votre gestionnaire de fichiers ou allez dans "Téléchargements"',
          'Appuyez sur le fichier "iptv-smarters-pro.apk" téléchargé',
          'Appuyez sur "Installer" quand Android vous le propose',
          'Attendez quelques secondes que l\'installation se termine',
          'Appuyez sur "Ouvrir" pour lancer IPTV Smarters Pro',
          'Au premier lancement, choisissez le mode "Mobile" et appuyez sur "SAVE"',
          'Lisez et acceptez les conditions d\'utilisation en appuyant sur "Accept"',
        ],
        imageAlt: 'Installation APK IPTV Smarters Pro sur Android',
      },
      {
        title: 'Connecter votre abonnement IPTV',
        description: 'Entrez vos identifiants pour accéder à vos chaînes. Vous avez reçu ces informations par email ou WhatsApp après votre achat.',
        details: [
          'Sur l\'écran d\'accueil de l\'app, appuyez sur "Add New User" (Ajouter Utilisateur)',
          'Choisissez "Login with Xtream Codes API" — c\'est la méthode la plus simple',
          'Remplissez les 3 champs avec les informations reçues :',
          '— "Any Name" : Donnez un nom à votre profil (exemple : "Mon IPTV")',
          '— "Username" : Collez votre nom d\'utilisateur exactement comme reçu',
          '— "Password" : Collez votre mot de passe exactement comme reçu',
          '— "Server URL" : Collez l\'URL du serveur (format : http://xxxxx.com:port)',
          'Vérifiez bien qu\'il n\'y a pas d\'espace avant ou après vos identifiants',
          'Appuyez sur "Add User" pour vous connecter',
        ],
        note: 'Attention : les identifiants sont sensibles aux majuscules/minuscules. Copiez-collez les directement depuis l\'email ou WhatsApp reçu pour éviter les erreurs.',
        imageAlt: 'Écran de connexion IPTV Smarters Pro — Xtream Codes API',
      },
      {
        title: 'Naviguer et profiter de vos chaînes IPTV',
        description: 'Votre compte est connecté ! Découvrez comment naviguer dans l\'application et optimiser votre expérience.',
        details: [
          'L\'application charge automatiquement toutes vos chaînes (patientez 10-30 secondes)',
          'Menu principal : "Live TV" pour les chaînes en direct, "Movies" pour les films, "Series" pour les séries',
          'Dans "Live TV", les chaînes sont classées par pays et catégories (Sport, Cinéma, Actualités...)',
          'Appuyez sur une chaîne pour lancer la lecture vidéo',
          'Pour ajouter une chaîne en favori : appuyez longuement dessus et sélectionnez "Add to Favorites"',
          'Pour les paramètres : allez dans "Settings" > "Player Selection" > choisissez "ExoPlayer" (recommandé)',
          'Pour le guide TV (EPG) : allez dans "Install EPG" depuis le menu principal',
        ],
        imageAlt: 'Interface principale IPTV Smarters Pro avec catégories de chaînes',
      },
    ],
    tips: [
      'Utilisez le WiFi plutôt que les données mobiles pour éviter la consommation de votre forfait — le streaming IPTV utilise beaucoup de données',
      'Fermez les autres applications en arrière-plan avant de regarder l\'IPTV pour éviter les lags et les coupures',
      'Si une chaîne ne marche pas, essayez-en une autre — certaines chaînes peuvent être temporairement hors ligne',
      'Pour la qualité 4K, vous avez besoin d\'une connexion Internet d\'au moins 25 Mbps — testez votre débit sur speedtest.net',
      'Sauvegardez vos identifiants (username, password, URL) dans vos notes — vous en aurez besoin si vous réinstallez l\'app',
      'Si vous avez du buffering, changez le lecteur vidéo dans Settings > Player Selection (essayez ExoPlayer ou VLC)',
    ],
    troubleshooting: [
      {
        problem: 'Le fichier APK ne s\'installe pas — message "Installation bloquée"',
        solution: 'Vous n\'avez pas autorisé les sources inconnues. Allez dans Paramètres > Sécurité > Sources inconnues et activez l\'option pour votre navigateur. Puis réessayez l\'installation.',
      },
      {
        problem: 'Erreur "Invalid Credentials" ou "Authentication Failed" lors de la connexion',
        solution: 'Vos identifiants sont incorrects. Vérifiez que vous avez copié-collé exactement le username, password et URL serveur depuis l\'email/WhatsApp reçu. Attention aux espaces avant/après et aux majuscules. Si le problème persiste, contactez notre support.',
      },
      {
        problem: 'Les chaînes chargent mais l\'écran reste noir ou le son ne fonctionne pas',
        solution: 'Allez dans Settings > Player Selection et changez le lecteur vidéo. Essayez "ExoPlayer" d\'abord, puis "VLC" si ça ne marche pas. Vous pouvez aussi vider le cache : allez dans Paramètres Android > Applications > IPTV Smarters > Vider le cache.',
      },
      {
        problem: 'Buffering constant — la vidéo se coupe et recharge sans arrêt',
        solution: 'Votre connexion Internet est trop lente. Testez votre débit sur speedtest.net (minimum 10 Mbps pour HD, 25 Mbps pour 4K). Connectez-vous en WiFi 5 GHz si possible. Fermez toutes les autres apps. En dernier recours, contactez notre support pour changer de serveur.',
      },
      {
        problem: 'L\'application crash ou se ferme toute seule',
        solution: 'Désinstallez complètement IPTV Smarters Pro, puis retéléchargez la dernière version de l\'APK depuis le site officiel. Si votre téléphone est ancien, libérez de l\'espace de stockage et de la RAM en fermant les autres applications.',
      },
    ],
  },
  ios: {
    title: 'Installation IPTV SMARTERS PRO sur iPhone & iPad',
    description: 'Guide complet pour installer et configurer votre abonnement IPTV sur iOS avec l\'application Smarters Player Lite',
    duration: '5 minutes',
    difficulty: 'Facile',
    requirements: [
      'iPhone ou iPad avec iOS 13.0 ou supérieur',
      'Connexion Internet WiFi stable',
      'Un abonnement IPTV SMARTERS PRO actif',
      'Vos identifiants de connexion IPTV (Username, Password, URL serveur)',
    ],
    steps: [
      {
        title: 'Télécharger Smarters Player Lite depuis l\'App Store',
        description: 'Sur iOS, l\'application s\'appelle "Smarters Player Lite" sur l\'App Store. C\'est l\'application officielle.',
        details: [
          'Ouvrez l\'App Store sur votre iPhone ou iPad',
          'Appuyez sur l\'icône de recherche (loupe) en bas de l\'écran',
          'Tapez "Smarters Player Lite" dans la barre de recherche',
          'Trouvez l\'application avec le logo IPTV Smarters (vérifiez les avis et notes)',
          'Appuyez sur "Obtenir" ou le bouton de téléchargement',
          'Confirmez avec Face ID, Touch ID ou votre mot de passe Apple ID',
          'Attendez la fin du téléchargement et de l\'installation automatique',
        ],
        note: 'Attention : ne confondez pas avec d\'autres applications similaires. L\'application officielle s\'appelle "Smarters Player Lite". Vérifiez les avis avant de télécharger.',
        imageAlt: 'App Store — Téléchargement Smarters Player Lite',
      },
      {
        title: 'Ouvrir l\'application et accepter les conditions',
        description: 'Lancez l\'application pour la première fois et configurez-la.',
        details: [
          'Retrouvez l\'icône "Smarters Player Lite" sur votre écran d\'accueil',
          'Appuyez dessus pour ouvrir l\'application',
          'Si demandé, appuyez sur "Autoriser" ou "Ne pas autoriser" pour les notifications (au choix)',
          'Lisez les conditions d\'utilisation affichées à l\'écran',
          'Appuyez sur "Accept" pour accepter et continuer',
          'L\'écran de connexion s\'affiche avec les options disponibles',
        ],
        imageAlt: 'Premier lancement Smarters Player Lite sur iOS',
      },
      {
        title: 'Connecter votre abonnement IPTV',
        description: 'Entrez vos identifiants de connexion reçus après votre achat pour accéder à vos chaînes.',
        details: [
          'Sur l\'écran de connexion, choisissez "Login with Xtream Codes API"',
          'Remplissez les champs suivants avec les informations reçues par email/WhatsApp :',
          '— "Any Name" : Donnez un nom (exemple : "Mon Abonnement IPTV")',
          '— "Username" : Votre nom d\'utilisateur IPTV',
          '— "Password" : Votre mot de passe IPTV',
          '— "Server URL" : L\'adresse du serveur au format http://xxxxx.com:port',
          'Vérifiez bien chaque champ — pas d\'espace en trop, majuscules/minuscules respectées',
          'Appuyez sur "Add User" pour lancer la connexion',
          'Patientez quelques secondes pendant que l\'app se connecte au serveur',
        ],
        note: 'Copiez-collez vos identifiants directement depuis l\'email ou le message WhatsApp pour éviter toute erreur de frappe.',
        imageAlt: 'Écran de connexion Xtream Codes sur iOS',
      },
      {
        title: 'Découvrir l\'interface et regarder vos chaînes',
        description: 'Votre compte est connecté ! Voici comment naviguer dans l\'application et regarder vos chaînes.',
        details: [
          'L\'écran d\'accueil affiche les catégories principales : Live TV, Movies, Series, Catch-Up TV',
          'Appuyez sur "Live TV" pour voir toutes vos chaînes en direct',
          'Les chaînes sont organisées par groupes : France, Sport, Cinéma, Enfants, etc.',
          'Appuyez sur un groupe pour voir la liste des chaînes de cette catégorie',
          'Appuyez sur une chaîne pour lancer le streaming vidéo',
          'Utilisez les contrôles en bas de l\'écran : pause, volume, plein écran',
          'Pour revenir en arrière, appuyez sur la flèche en haut à gauche',
        ],
        imageAlt: 'Interface principale IPTV Smarters sur iPhone avec liste de chaînes',
      },
      {
        title: 'Optimiser les paramètres pour iOS',
        description: 'Quelques réglages pour une meilleure expérience de streaming sur votre iPhone ou iPad.',
        details: [
          'Depuis l\'écran d\'accueil de l\'app, appuyez sur "Settings" (Paramètres)',
          'Player Selection : Gardez "AVPlayer" qui est le lecteur natif iOS (meilleur pour iPhone/iPad)',
          'Si vous avez des problèmes de lecture, essayez de changer vers un autre lecteur',
          'Sous-titres : Activez si besoin dans les paramètres du lecteur vidéo',
          'Picture-in-Picture : Sur iOS, vous pouvez regarder l\'IPTV en mode flottant — activez PiP dans Réglages iOS > Général > PiP',
          'Pour diffuser sur votre TV : utilisez AirPlay en appuyant sur l\'icône AirPlay pendant la lecture',
        ],
        imageAlt: 'Paramètres Smarters Player Lite optimisés pour iOS',
      },
    ],
    tips: [
      'Connectez-vous en WiFi plutôt qu\'en 4G/5G pour économiser votre forfait mobile et avoir une meilleure qualité vidéo',
      'Activez le mode Picture-in-Picture (PiP) pour continuer à regarder la TV tout en utilisant d\'autres applications',
      'Utilisez AirPlay pour diffuser le contenu IPTV sur une Apple TV ou une TV compatible AirPlay',
      'Pour les familles : vous pouvez créer plusieurs profils dans l\'app avec des identifiants différents',
      'Mettez l\'application à jour régulièrement depuis l\'App Store pour profiter des corrections de bugs',
      'En cas de problème de son, vérifiez que le mode silencieux de votre iPhone est bien désactivé (bouton sur le côté)',
    ],
    troubleshooting: [
      {
        problem: 'Je ne trouve pas l\'application sur l\'App Store',
        solution: 'Cherchez exactement "Smarters Player Lite" (pas "IPTV Smarters Pro"). Si vous ne la trouvez toujours pas, changez la région de votre Apple ID ou essayez la version web : webtv-new.iptvsmarters.com depuis Safari.',
      },
      {
        problem: 'Erreur de connexion ou "Invalid Credentials"',
        solution: 'Vérifiez chaque identifiant un par un. Le Username et Password sont sensibles aux majuscules. L\'URL du serveur doit commencer par http:// et inclure le port (exemple : http://serveur.com:8080). Copiez-collez directement depuis votre email.',
      },
      {
        problem: 'Le streaming lag ou se coupe régulièrement',
        solution: 'Passez en WiFi plutôt que 4G/5G. Rapprochez-vous de votre box Internet. Fermez toutes les applications en arrière-plan (double-clic bouton Home ou swipe up). Si le problème persiste, testez votre vitesse Internet sur speedtest.net.',
      },
      {
        problem: 'L\'application se ferme toute seule (crash)',
        solution: 'Mettez à jour vers la dernière version depuis l\'App Store. Si ça persiste, désinstallez l\'application (appui long > Supprimer) et réinstallez-la. Vérifiez aussi que votre iOS est à jour dans Réglages > Général > Mise à jour logicielle.',
      },
      {
        problem: 'Pas de son malgré le volume au maximum',
        solution: 'Vérifiez que le bouton de silence sur le côté de votre iPhone est désactivé (pas de ligne orange visible). Vérifiez aussi que le volume média est bien monté (pas seulement le volume sonnerie). Essayez de brancher puis débrancher des écouteurs.',
      },
    ],
  },
  'smart-tv': {
    title: 'Installation IPTV sur Smart TV Samsung & LG',
    description: 'Guide pas-à-pas pour configurer votre abonnement IPTV sur votre télévision Samsung Tizen ou LG webOS',
    duration: '10 minutes',
    difficulty: 'Moyen',
    requirements: [
      'Smart TV Samsung (modèle 2016 ou plus récent) ou LG (webOS 3.0 ou plus récent)',
      'Connexion Internet sur la TV (WiFi ou câble Ethernet — Ethernet recommandé)',
      'Télécommande de votre Smart TV',
      'Un abonnement IPTV SMARTERS PRO actif',
      'Vos identifiants de connexion ou votre URL de playlist M3U',
    ],
    steps: [
      {
        title: 'Choisir et installer l\'application IPTV sur votre TV',
        description: 'Plusieurs applications compatibles existent pour Smart TV. Voici les meilleures options selon votre marque.',
        details: [
          'SAMSUNG : Appuyez sur le bouton "Home" de la télécommande > Allez dans "Apps" > Recherchez "Smart IPTV" ou "IPTV Smarters"',
          'LG : Appuyez sur "Home" > Allez dans "LG Content Store" > Recherchez "Smart IPTV" ou "SS IPTV"',
          'Applications recommandées par ordre de préférence : 1) Smart IPTV, 2) IPTV Smarters, 3) SS IPTV',
          'Smart IPTV est le plus fiable mais nécessite une activation de 5,49€ après 7 jours d\'essai gratuit',
          'SS IPTV est entièrement gratuit (avec quelques publicités)',
          'Sélectionnez l\'application et appuyez sur "Installer" ou "Télécharger"',
          'Attendez 1-2 minutes que l\'installation soit terminée',
        ],
        note: 'Si aucune de ces applications n\'apparaît dans le store de votre TV, votre modèle est peut-être trop ancien. Dans ce cas, utilisez une Amazon Fire TV Stick branchée sur votre TV (voir tutoriel Fire TV).',
        imageAlt: 'Store Samsung TV montrant les applications IPTV disponibles',
      },
      {
        title: 'Lancer l\'application et noter votre adresse MAC',
        description: 'Au premier lancement, l\'application affiche des informations importantes dont vous aurez besoin.',
        details: [
          'Ouvrez l\'application IPTV que vous venez d\'installer',
          'Si vous utilisez Smart IPTV : l\'écran affiche votre adresse MAC (format XX:XX:XX:XX:XX:XX) — NOTEZ-LA sur papier ou prenez une photo',
          'Si vous utilisez SS IPTV : l\'app s\'ouvre directement sur le menu principal',
          'Si vous utilisez IPTV Smarters : un écran de connexion s\'affiche (passez directement à l\'étape 4)',
          'L\'adresse MAC est unique à votre TV et nécessaire pour la méthode d\'activation à distance',
        ],
        note: 'Pour Smart IPTV : vous aurez besoin de l\'adresse MAC pour ajouter votre playlist depuis un ordinateur ou téléphone — c\'est plus facile que de taper une longue URL avec la télécommande.',
        imageAlt: 'Écran Smart IPTV affichant l\'adresse MAC de la TV',
      },
      {
        title: 'Ajouter votre playlist IPTV (Méthode Smart IPTV)',
        description: 'Ajoutez votre liste de chaînes depuis un ordinateur ou téléphone — c\'est beaucoup plus facile que de taper avec la télécommande.',
        details: [
          'Sur votre ordinateur ou téléphone, ouvrez un navigateur web',
          'Allez sur le site : siptv.eu/mylist (c\'est le site officiel de Smart IPTV)',
          'Dans le champ "MAC Address", entrez l\'adresse MAC notée à l\'étape précédente',
          'Dans le champ "Playlist URL (link)", collez l\'URL M3U fournie avec votre abonnement',
          'Cochez "I\'m not a robot" et cliquez sur "Send/Envoyer"',
          'Un message de confirmation s\'affiche : "Playlist added successfully"',
          'Retournez sur votre TV et redémarrez l\'application Smart IPTV',
          'Vos chaînes se chargent automatiquement — patientez 1-3 minutes',
        ],
        note: 'Méthode alternative pour SS IPTV : Dans l\'app sur la TV, allez dans "Settings" > "Content" > "External Playlists" > "Add" et entrez votre URL M3U avec la télécommande.',
        imageAlt: 'Site siptv.eu — Ajout de playlist avec adresse MAC',
      },
      {
        title: 'Méthode alternative : IPTV Smarters sur Smart TV',
        description: 'Si vous préférez IPTV Smarters, la connexion se fait comme sur téléphone avec vos identifiants Xtream Codes.',
        details: [
          'Ouvrez IPTV Smarters sur votre TV',
          'Sélectionnez "Add New User" avec la télécommande',
          'Choisissez "Login with Xtream Codes API"',
          'Entrez vos identifiants avec la télécommande (c\'est plus long mais possible) :',
          '— "Any Name" : un nom pour votre profil',
          '— "Username" : votre nom d\'utilisateur',
          '— "Password" : votre mot de passe',
          '— "Server URL" : l\'adresse du serveur',
          'Astuce : utilisez l\'application mobile de votre TV (Samsung SmartThings ou LG ThinQ) comme clavier pour taper plus vite',
          'Appuyez sur "Add User" et patientez pendant la connexion',
        ],
        imageAlt: 'Connexion IPTV Smarters sur Smart TV avec télécommande',
      },
      {
        title: 'Naviguer dans vos chaînes et optimiser la TV',
        description: 'Vos chaînes sont chargées ! Voici comment en profiter au maximum sur grand écran.',
        details: [
          'Les chaînes s\'affichent par catégories : Sport, Cinéma, France, Enfants, International, etc.',
          'Utilisez les flèches haut/bas de la télécommande pour naviguer dans la liste',
          'Appuyez sur OK/Enter pour lancer une chaîne',
          'Pour une meilleure qualité : branchez un câble Ethernet entre la TV et votre box Internet',
          'Dans les paramètres d\'image de votre TV : utilisez le mode "Film" ou "Standard" pour les meilleures couleurs',
          'Pour les favoris : sélectionnez une chaîne et ajoutez-la à vos favoris pour un accès rapide',
          'Guide TV (EPG) : si disponible, le programme des émissions s\'affiche automatiquement',
        ],
        note: 'Le câble Ethernet (branché entre votre TV et votre box Internet) donne une connexion beaucoup plus stable que le WiFi. C\'est fortement recommandé pour le streaming 4K.',
        imageAlt: 'Smart TV affichant les catégories de chaînes IPTV',
      },
    ],
    tips: [
      'Le câble Ethernet est largement supérieur au WiFi pour le streaming IPTV sur TV — moins de buffering et meilleure qualité vidéo',
      'Redémarrez votre TV après l\'installation pour que tout fonctionne correctement',
      'Smart IPTV coûte 5,49€ une seule fois après la période d\'essai de 7 jours — c\'est un achat unique, pas un abonnement',
      'SS IPTV est 100% gratuit mais affiche des publicités. C\'est une bonne alternative si vous ne voulez pas payer pour Smart IPTV',
      'Mettez à jour le firmware de votre Smart TV régulièrement (Paramètres > Assistance > Mise à jour logicielle) pour éviter les bugs',
      'Si votre TV est loin de la box Internet, utilisez un adaptateur CPL (courant porteur en ligne) plutôt que le WiFi pour une connexion stable',
    ],
    troubleshooting: [
      {
        problem: 'L\'application IPTV n\'apparaît pas dans le store de ma TV',
        solution: 'Votre TV est peut-être trop ancienne ou d\'une région différente. Essayez de changer la région dans les paramètres de la TV. Si ça ne marche pas, la meilleure solution est d\'acheter une Amazon Fire TV Stick (environ 30€) et de la brancher sur votre TV.',
      },
      {
        problem: 'Les chaînes ne se chargent pas après l\'ajout de la playlist',
        solution: 'Vérifiez que votre URL M3U est correcte en la testant sur un PC avec VLC Media Player. Redémarrez l\'application IPTV sur la TV. Vérifiez que votre abonnement est toujours actif. Si l\'URL est correcte mais ne charge pas, contactez notre support pour obtenir un nouveau lien.',
      },
      {
        problem: 'Image saccadée, pixelisée ou buffering constant',
        solution: 'Branchez un câble Ethernet entre votre TV et votre box Internet au lieu du WiFi. Vérifiez votre vitesse Internet (minimum 15 Mbps pour HD, 30 Mbps pour 4K). Redémarrez votre box Internet. Fermez les autres applications de la TV.',
      },
      {
        problem: 'Smart IPTV demande une activation après 7 jours',
        solution: 'C\'est normal. Smart IPTV offre 7 jours d\'essai gratuit puis coûte 5,49€ (paiement unique). Rendez-vous sur siptv.eu, entrez l\'adresse MAC de votre TV et payez par carte. Sinon, basculez sur SS IPTV qui est entièrement gratuit.',
      },
    ],
  },
  'fire-tv': {
    title: 'Installation IPTV sur Amazon Fire TV Stick',
    description: 'Tutoriel détaillé pour installer IPTV Smarters Pro sur Fire TV Stick, Fire TV Stick 4K et Fire TV Cube',
    duration: '8 minutes',
    difficulty: 'Facile',
    requirements: [
      'Amazon Fire TV Stick (n\'importe quel modèle), Fire TV Stick 4K, Fire TV Stick 4K Max ou Fire TV Cube',
      'Télécommande Fire TV fonctionnelle',
      'Connexion Internet WiFi stable',
      'Un abonnement IPTV SMARTERS PRO actif',
      'Vos identifiants de connexion IPTV (Username, Password, URL serveur)',
    ],
    steps: [
      {
        title: 'Activer les options développeurs et autoriser les sources inconnues',
        description: 'Le Fire TV Stick ne permet pas d\'installer IPTV Smarters depuis l\'Amazon Appstore. Vous devez d\'abord modifier un réglage.',
        details: [
          'Depuis l\'écran d\'accueil du Fire TV Stick, allez tout à droite vers l\'icône "Paramètres" (engrenage)',
          'Sélectionnez "Ma Fire TV" ou "My Fire TV"',
          'Sélectionnez "Options pour les développeurs" (Developer Options)',
          'Si vous ne voyez pas cette option : allez dans "Paramètres" > "Ma Fire TV" > "À propos" > cliquez 7 fois sur le numéro de série',
          'Activez "Applications de sources inconnues" ou "Apps from Unknown Sources"',
          'Pour Fire TV Stick Lite/Gen 3 : vous verrez une liste d\'apps — activez "Downloader"',
          'Un message d\'avertissement s\'affiche — confirmez avec "Activer" ou "Turn On"',
        ],
        note: 'Cette manipulation est nécessaire car IPTV Smarters Pro n\'est pas disponible sur l\'Amazon Appstore. C\'est une procédure courante et sans risque pour votre appareil.',
        imageAlt: 'Paramètres Fire TV — Activation des sources inconnues',
      },
      {
        title: 'Installer l\'application "Downloader"',
        description: 'Downloader est un outil gratuit qui permet de télécharger des fichiers APK sur Fire TV. Il est disponible dans l\'Amazon Appstore.',
        details: [
          'Retournez à l\'écran d\'accueil du Fire TV Stick',
          'Appuyez sur l\'icône de recherche (loupe) en haut de l\'écran',
          'Tapez "Downloader" avec la télécommande ou la recherche vocale',
          'Sélectionnez l\'application "Downloader" par AFTVnews (icône orange)',
          'Appuyez sur "Obtenir" ou "Télécharger" puis "Ouvrir" une fois installé',
          'Au premier lancement, l\'app demande l\'accès au stockage — appuyez sur "Autoriser" (Allow)',
        ],
        note: 'Downloader est une application officielle et approuvée par Amazon. Elle est gratuite et utilisée par des millions de personnes.',
        imageAlt: 'Amazon Appstore — Téléchargement de l\'application Downloader',
      },
      {
        title: 'Télécharger IPTV Smarters Pro avec Downloader',
        description: 'Utilisez Downloader pour télécharger le fichier APK de IPTV Smarters Pro directement sur votre Fire TV Stick.',
        details: [
          'Ouvrez l\'application Downloader (si pas déjà ouverte)',
          'Vous voyez un champ URL au centre de l\'écran — cliquez dessus',
          'Le clavier virtuel s\'affiche — tapez l\'adresse suivante : iptvsmarters.com',
          'Appuyez sur "Go" pour accéder au site',
          'Sur le site, trouvez et cliquez sur "Downloads" puis "Download for Android"',
          'Le téléchargement du fichier APK commence automatiquement (15-30 secondes)',
          'Une fois terminé, une fenêtre "Installer" s\'affiche automatiquement',
        ],
        note: 'Si vous avez du mal à naviguer sur le site avec la télécommande, vous pouvez utiliser une souris Bluetooth connectée à votre Fire TV Stick pour plus de facilité.',
        imageAlt: 'Downloader — Saisie de l\'URL pour télécharger IPTV Smarters',
      },
      {
        title: 'Installer l\'application IPTV Smarters Pro',
        description: 'Le fichier est téléchargé. Installez-le maintenant sur votre Fire TV Stick.',
        details: [
          'La fenêtre d\'installation s\'affiche automatiquement après le téléchargement',
          'Appuyez sur "Installer" (Install) en bas à droite',
          'L\'installation prend environ 10-20 secondes',
          'Quand le message "Application installée" apparaît, appuyez sur "Terminé" (Done) — PAS sur "Ouvrir"',
          'Downloader vous propose de supprimer le fichier APK pour libérer de l\'espace',
          'Appuyez sur "Supprimer" (Delete) puis confirmez avec "Supprimer" à nouveau',
          'IPTV Smarters Pro est maintenant installé sur votre Fire TV Stick !',
        ],
        note: 'Appuyez sur "Done" (Terminé) et pas sur "Open" (Ouvrir) pour retourner à Downloader et pouvoir supprimer le fichier APK.',
        imageAlt: 'Installation APK IPTV Smarters sur Fire TV Stick',
      },
      {
        title: 'Ouvrir IPTV Smarters et connecter votre abonnement',
        description: 'Lancez l\'application et entrez vos identifiants pour accéder à vos chaînes IPTV.',
        details: [
          'Allez dans "Vos applications et chaînes" (Your Apps & Channels) depuis l\'écran d\'accueil',
          'Si IPTV Smarters n\'apparaît pas directement, faites défiler vers la droite ou allez dans "Tout voir"',
          'Ouvrez IPTV Smarters Pro',
          'Au premier lancement : choisissez "TV" comme type d\'appareil et appuyez sur "Save"',
          'Acceptez les conditions d\'utilisation (Accept)',
          'Appuyez sur "Add New User"',
          'Choisissez "Login with Xtream Codes API"',
          'Entrez vos identifiants : Any Name, Username, Password et Server URL',
          'Appuyez sur "Add User" — vos chaînes se chargent en quelques secondes',
        ],
        note: 'Astuce : pour déplacer IPTV Smarters en première position dans vos apps, maintenez le bouton Menu de la télécommande enfoncé sur l\'icône de l\'app et sélectionnez "Déplacer vers l\'avant".',
        imageAlt: 'Configuration IPTV Smarters Pro sur Fire TV Stick avec identifiants',
      },
    ],
    tips: [
      'Déplacez IPTV Smarters en première position de vos applications pour un accès plus rapide depuis l\'écran d\'accueil',
      'Connectez votre Fire TV Stick au WiFi 5 GHz (et non 2.4 GHz) pour une meilleure qualité vidéo et moins de buffering',
      'Redémarrez votre Fire TV Stick après l\'installation en débranchant puis rebranchant le câble USB',
      'Vous pouvez connecter une souris Bluetooth au Fire TV Stick pour naviguer plus facilement dans l\'application',
      'Pour vider le cache en cas de lenteur : Paramètres > Applications > Gérer les applications installées > IPTV Smarters > Vider le cache',
      'Si votre Fire TV Stick est loin de la box Internet, utilisez un répéteur WiFi ou un câble Ethernet avec adaptateur',
    ],
    troubleshooting: [
      {
        problem: 'Je ne trouve pas "Options pour les développeurs" dans les paramètres',
        solution: 'Allez dans Paramètres > Ma Fire TV > À propos. Cliquez 7 fois rapidement sur le "Numéro de série" ou le nom de votre appareil. Un message "Vous êtes maintenant un développeur" s\'affiche. Retournez en arrière et l\'option apparaît.',
      },
      {
        problem: 'Le téléchargement dans Downloader ne démarre pas ou échoue',
        solution: 'Vérifiez votre connexion WiFi. Essayez de redémarrer le Fire TV Stick. Si le site ne charge pas, vérifiez que l\'adresse est correcte. Vous pouvez aussi essayer un lien direct vers l\'APK fourni par notre support.',
      },
      {
        problem: 'Message "Installation bloquée" lors de l\'installation de l\'APK',
        solution: 'Retournez dans Paramètres > Ma Fire TV > Options pour les développeurs et vérifiez que "Sources inconnues" est bien activé pour Downloader. Redémarrez le Fire TV Stick et réessayez.',
      },
      {
        problem: 'IPTV Smarters freeze ou ne répond plus sur Fire TV',
        solution: 'Forcez l\'arrêt : Paramètres > Applications > Gérer les applications > IPTV Smarters > Forcer l\'arrêt > Vider le cache. Puis relancez l\'application. Si le problème persiste, désinstallez et réinstallez.',
      },
      {
        problem: 'La télécommande ne fonctionne pas bien dans l\'application',
        solution: 'Utilisez les flèches directionnelles pour naviguer et le bouton central pour sélectionner. Si ça ne répond pas bien, connectez une souris Bluetooth : Paramètres > Contrôleurs et appareils Bluetooth > Autres appareils Bluetooth.',
      },
    ],
  },
  'pc-mac': {
    title: 'Installation IPTV sur PC Windows & Mac',
    description: 'Comment configurer et regarder l\'IPTV sur votre ordinateur Windows ou Mac avec IPTV Smarters ou VLC Media Player',
    duration: '7 minutes',
    difficulty: 'Facile',
    requirements: [
      'Ordinateur PC Windows 7/8/10/11 ou Mac OS X 10.12 ou supérieur',
      'Connexion Internet haut débit (minimum 10 Mbps)',
      'Un abonnement IPTV SMARTERS PRO actif',
      'Vos identifiants IPTV (Username, Password, URL serveur) ou votre lien M3U',
    ],
    steps: [
      {
        title: 'Télécharger IPTV Smarters Pro pour Windows ou Mac',
        description: 'L\'application de bureau est disponible sur le site officiel. Téléchargement gratuit.',
        details: [
          'Ouvrez votre navigateur web (Chrome, Firefox, Safari, Edge)',
          'Allez sur le site officiel : iptvsmarters.com',
          'Cliquez sur "Downloads" dans le menu en haut',
          'Pour Windows : cliquez sur "Download for Windows" (fichier .exe, environ 80 Mo)',
          'Pour Mac : cliquez sur "Download for MAC" (fichier .dmg, environ 90 Mo)',
          'Le téléchargement commence — attendez qu\'il soit terminé (1-3 minutes selon votre connexion)',
          'Le fichier se trouve dans votre dossier "Téléchargements"',
        ],
        note: 'Si votre antivirus bloque le téléchargement, c\'est un faux positif. Autorisez le fichier dans votre antivirus ou désactivez-le temporairement pendant l\'installation.',
        imageAlt: 'Site officiel IPTV Smarters — Page de téléchargement Windows et Mac',
      },
      {
        title: 'Installer l\'application sur votre ordinateur',
        description: 'Suivez la procédure d\'installation standard pour Windows ou Mac.',
        details: [
          'WINDOWS : Double-cliquez sur le fichier .exe téléchargé',
          'Si Windows Defender affiche un avertissement : cliquez sur "Informations complémentaires" puis "Exécuter quand même"',
          'Suivez l\'assistant d\'installation : Next > I Agree > Install > Finish',
          'L\'application se lance automatiquement ou créez un raccourci sur le bureau',
          '',
          'MAC : Double-cliquez sur le fichier .dmg téléchargé',
          'Faites glisser l\'icône IPTV Smarters vers le dossier Applications',
          'Si Mac bloque l\'ouverture : Préférences Système > Sécurité > "Ouvrir quand même"',
          'Ou bien : clic droit sur l\'application > "Ouvrir" > Confirmer',
        ],
        note: 'Sur Mac, Apple peut bloquer l\'application car elle ne vient pas de l\'App Store. C\'est normal et sans danger — utilisez l\'option "Ouvrir quand même" dans les paramètres de sécurité.',
        imageAlt: 'Installation IPTV Smarters Pro sur Windows et Mac',
      },
      {
        title: 'Connecter votre abonnement IPTV',
        description: 'Ouvrez l\'application et entrez vos identifiants IPTV pour accéder à vos chaînes.',
        details: [
          'Lancez IPTV Smarters Pro depuis le menu Démarrer (Windows) ou le Launchpad (Mac)',
          'Cliquez sur "Add New User" pour ajouter votre profil',
          'Méthode 1 — Xtream Codes (recommandée) : Cliquez sur "Login with Xtream Codes API"',
          '— "Any Name" : un nom pour votre profil',
          '— "Username" : votre nom d\'utilisateur IPTV',
          '— "Password" : votre mot de passe IPTV',
          '— "Server URL" : l\'adresse du serveur',
          'Méthode 2 — M3U URL : Cliquez sur "Load Your Playlist or File/URL"',
          '— Collez votre lien M3U complet dans le champ URL',
          'Cliquez sur "Add User" et patientez pendant la connexion au serveur',
        ],
        note: 'Sur PC, vous pouvez facilement copier-coller (Ctrl+V sur Windows, Cmd+V sur Mac) vos identifiants depuis votre email. C\'est beaucoup plus facile que sur une TV.',
        imageAlt: 'Écran de connexion IPTV Smarters sur PC avec identifiants Xtream Codes',
      },
      {
        title: 'Naviguer dans l\'interface sur ordinateur',
        description: 'L\'interface PC est très complète avec toutes les fonctionnalités accessibles facilement.',
        details: [
          'Le menu principal affiche les catégories : Live TV, Movies, Series, Catch-Up, Recordings, EPG',
          'Cliquez sur "Live TV" pour voir toutes vos chaînes en direct',
          'Les chaînes sont classées par groupes/pays — cliquez sur un groupe pour le dérouler',
          'Double-cliquez sur une chaîne pour la regarder en plein écran',
          'Raccourcis clavier : F = Plein écran, Espace = Pause, Flèches = Volume/Navigation',
          'Utilisez la barre de recherche en haut pour trouver rapidement une chaîne par nom',
          'Cliquez droit sur une chaîne pour l\'ajouter aux favoris',
        ],
        imageAlt: 'Interface IPTV Smarters Pro sur PC avec liste de chaînes',
      },
      {
        title: 'Alternative gratuite : utiliser VLC Media Player',
        description: 'Si vous ne souhaitez pas installer IPTV Smarters, vous pouvez regarder l\'IPTV directement avec VLC — un lecteur gratuit et très populaire.',
        details: [
          'Téléchargez VLC depuis : videolan.org (100% gratuit et open source)',
          'Installez VLC sur votre ordinateur',
          'Ouvrez VLC puis allez dans : Média > Ouvrir un flux réseau (Ctrl+N)',
          'Collez votre URL M3U dans le champ "Adresse réseau"',
          'Cliquez sur "Lire" pour lancer le streaming',
          'VLC charge la liste des chaînes — sélectionnez une chaîne dans la liste de lecture',
          'Pour voir la playlist : Vue > Liste de lecture (ou Ctrl+L)',
          'Avantage de VLC : lecteur très stable qui supporte tous les formats vidéo',
        ],
        note: 'VLC est parfait si vous voulez juste regarder les chaînes simplement. IPTV Smarters offre cependant plus de fonctionnalités (favoris, EPG, interface visuelle avec logos).',
        imageAlt: 'VLC Media Player avec flux réseau IPTV M3U',
      },
    ],
    tips: [
      'Connectez votre PC à votre TV via un câble HDMI pour profiter de l\'IPTV sur grand écran avec le confort du clavier et de la souris',
      'Le mode plein écran (touche F ou F11) offre la meilleure expérience de visionnage',
      'Installez VLC Media Player en complément — certaines chaînes fonctionnent mieux avec VLC qu\'avec le lecteur intégré',
      'Créez un raccourci de IPTV Smarters sur votre bureau pour un accès rapide',
      'Sur un PC portable, branchez-le sur secteur pendant le streaming pour éviter que la batterie se vide vite',
      'Activez l\'accélération matérielle GPU dans les paramètres vidéo pour une lecture plus fluide (Settings > Player Settings)',
    ],
    troubleshooting: [
      {
        problem: 'L\'application ne s\'installe pas — bloquée par l\'antivirus ou Windows Defender',
        solution: 'C\'est un faux positif courant avec les applications IPTV. Désactivez temporairement votre antivirus pendant l\'installation. Sur Windows : cliquez sur "Informations complémentaires" puis "Exécuter quand même" quand l\'avertissement s\'affiche.',
      },
      {
        problem: 'Mac refuse d\'ouvrir l\'application — "développeur non identifié"',
        solution: 'Allez dans Préférences Système (ou Réglages Système) > Sécurité et confidentialité > Onglet Général. Cliquez sur "Ouvrir quand même" à côté du message. Sinon : clic droit sur l\'app > Ouvrir > Confirmer.',
      },
      {
        problem: 'Écran noir ou pas de vidéo lors de la lecture d\'une chaîne',
        solution: 'Changez le lecteur vidéo dans Settings > Player Selection (essayez les différentes options). Installez VLC Media Player si ce n\'est pas fait. Mettez à jour vos pilotes graphiques (surtout sur Windows avec NVIDIA ou AMD).',
      },
      {
        problem: 'La vidéo est saccadée ou en basse qualité sur PC',
        solution: 'Fermez les onglets de navigateur et programmes gourmands (jeux, montage vidéo). Vérifiez votre débit Internet sur speedtest.net. Activez l\'accélération matérielle GPU dans les paramètres de l\'app. Utilisez une connexion Ethernet plutôt que WiFi.',
      },
    ],
  },
  'android-tv': {
    title: 'Installation IPTV sur Android TV & Box IPTV',
    description: 'Guide complet pour Android TV, Nvidia Shield, Xiaomi Mi Box, Mecool et autres box Android',
    duration: '6 minutes',
    difficulty: 'Facile',
    requirements: [
      'Android TV, Nvidia Shield, Xiaomi Mi Box, Mecool Box, ou toute box sous Android TV / Google TV',
      'Android TV version 7.0 ou supérieur recommandé',
      'Télécommande ou souris USB/Bluetooth',
      'Un abonnement IPTV SMARTERS PRO actif',
      'Vos identifiants de connexion IPTV',
    ],
    steps: [
      {
        title: 'Vérifier si le Play Store est disponible sur votre box',
        description: 'Certaines box Android ont le Google Play Store, d\'autres non. La méthode d\'installation dépend de votre appareil.',
        details: [
          'Allumez votre box Android TV / Google TV',
          'Cherchez l\'icône "Google Play Store" ou "Play Store" dans vos applications',
          'SI vous avez le Play Store : passez à l\'étape 2',
          'SI vous N\'AVEZ PAS le Play Store : vous devrez installer l\'APK manuellement — voir l\'étape alternative ci-dessous',
          'Alternative sans Play Store : Installez d\'abord "Downloader" depuis le navigateur web de votre box',
          'Puis suivez la même procédure que pour le Fire TV Stick (activez sources inconnues + Downloader)',
        ],
        note: 'Les box officielles Android TV/Google TV (Nvidia Shield, Mi Box, Chromecast Google TV) ont le Play Store. Les box génériques chinoises n\'ont souvent PAS le Play Store.',
        imageAlt: 'Écran d\'accueil Android TV avec Google Play Store',
      },
      {
        title: 'Installer IPTV Smarters Pro depuis le Play Store',
        description: 'Si votre box a le Play Store, l\'installation est très simple.',
        details: [
          'Ouvrez le Google Play Store sur votre Android TV',
          'Utilisez la recherche (icône loupe) et tapez "IPTV Smarters"',
          'Important : recherchez la bonne application — vérifiez le développeur et les avis',
          'Appuyez sur "Installer" avec la télécommande (bouton OK)',
          'Le téléchargement et l\'installation sont automatiques (environ 1 minute)',
          'Une fois installé, appuyez sur "Ouvrir"',
          'Alternative si l\'app n\'est pas sur le Play Store TV : installez l\'APK via Downloader (comme expliqué dans le tutoriel Fire TV)',
        ],
        note: 'Si l\'application n\'apparaît pas sur le Play Store de votre Android TV, elle peut être filtrée pour votre appareil. Utilisez la méthode APK avec Downloader dans ce cas.',
        imageAlt: 'Google Play Store sur Android TV — Installation IPTV Smarters',
      },
      {
        title: 'Premier lancement et sélection du mode TV',
        description: 'Configurez l\'application pour une utilisation optimale sur votre télévision.',
        details: [
          'Ouvrez IPTV Smarters Pro depuis le lanceur d\'applications de votre Android TV',
          'Au premier lancement, l\'app vous demande de choisir le type d\'écran',
          'Sélectionnez "TV" (pas "Mobile") pour avoir l\'interface optimisée grand écran',
          'Appuyez sur "SAVE" pour valider votre choix',
          'Lisez et acceptez les conditions d\'utilisation en appuyant sur "Accept"',
          'L\'écran de connexion s\'affiche',
        ],
        imageAlt: 'IPTV Smarters Pro — Sélection du mode TV sur Android TV',
      },
      {
        title: 'Connecter votre abonnement avec vos identifiants',
        description: 'Entrez vos informations de connexion IPTV pour accéder à vos chaînes et contenus.',
        details: [
          'Appuyez sur "Add New User" avec la télécommande',
          'Sélectionnez "Login with Xtream Codes API"',
          'Le clavier virtuel Android TV s\'affiche pour chaque champ :',
          '— "Any Name" : tapez un nom pour votre profil (ex: "Mon IPTV")',
          '— "Username" : tapez votre nom d\'utilisateur exactement comme reçu',
          '— "Password" : tapez votre mot de passe exactement comme reçu',
          '— "Server URL" : tapez l\'URL du serveur (http://xxxxx.com:port)',
          'Astuce : utilisez l\'application mobile Android TV Remote ou une souris Bluetooth pour taper plus facilement',
          'Appuyez sur "Add User" et patientez pendant le chargement des chaînes (10-30 secondes)',
        ],
        note: 'La saisie avec la télécommande est lente. Utilisez l\'app "Android TV Remote" sur votre téléphone pour utiliser le clavier de votre téléphone et taper beaucoup plus vite.',
        imageAlt: 'Saisie des identifiants IPTV sur Android TV avec clavier virtuel',
      },
      {
        title: 'Profiter de vos chaînes et optimiser les paramètres',
        description: 'Tout est prêt ! Voici comment naviguer et optimiser l\'expérience IPTV sur votre TV.',
        details: [
          'L\'écran d\'accueil affiche : Live TV, Movies, Series, Catch-Up TV, EPG',
          'Naviguez avec les flèches de la télécommande et validez avec OK',
          'Dans "Live TV" : les chaînes sont classées par catégories (France, Sport, Cinéma, etc.)',
          'Appuyez sur OK sur une chaîne pour la regarder',
          'Paramètres recommandés : Settings > Player Selection > sélectionnez "ExoPlayer" (meilleur pour Android TV)',
          'EPG (Guide TV) : si disponible avec votre abonnement, le programme des émissions s\'affiche automatiquement',
          'Favoris : appuyez longuement sur une chaîne pour l\'ajouter à vos favoris',
          'Pour la qualité 4K : vérifiez que la résolution de sortie de votre box est bien en 4K (Paramètres Android TV > Affichage)',
        ],
        imageAlt: 'Interface IPTV Smarters Pro sur Android TV avec chaînes en direct',
      },
    ],
    tips: [
      'Le Nvidia Shield est la meilleure box Android TV pour l\'IPTV — puissance maximale, support 4K HDR et mises à jour régulières',
      'Connectez une souris Bluetooth pour naviguer plus facilement dans l\'application — beaucoup plus rapide que la télécommande',
      'Utilisez l\'application "Android TV Remote" sur votre téléphone comme télécommande avec clavier intégré',
      'Branchez un câble Ethernet si possible (certaines box ont un port Ethernet) pour une connexion plus stable',
      'Activez "Rester connecté" dans les paramètres de l\'app pour ne pas avoir à ressaisir vos identifiants à chaque ouverture',
      'Mettez à jour votre box Android TV régulièrement : Paramètres > Système > À propos > Mise à jour du système',
    ],
    troubleshooting: [
      {
        problem: 'Ma box n\'a pas le Google Play Store',
        solution: 'C\'est fréquent sur les box génériques. Deux solutions : 1) Téléchargez l\'APK de IPTV Smarters sur une clé USB depuis un PC, branchez la clé sur la box, et installez l\'APK avec un gestionnaire de fichiers. 2) Activez les sources inconnues et installez Downloader pour télécharger l\'APK directement (même méthode que Fire TV Stick).',
      },
      {
        problem: 'L\'application est très lente ou plante régulièrement',
        solution: 'Votre box manque peut-être de mémoire. Allez dans Paramètres > Applications > IPTV Smarters > Vider le cache. Fermez toutes les autres applications. Si le problème persiste, votre box est peut-être trop ancienne ou pas assez puissante (minimum recommandé : 2 Go de RAM).',
      },
      {
        problem: 'La qualité vidéo est mauvaise alors que ma connexion est rapide',
        solution: 'Vérifiez la résolution de sortie de votre box : Paramètres > Affichage et son > Résolution. Sélectionnez 4K ou 1080p. Dans l\'app, allez dans Settings et sélectionnez "Auto" ou "Original" pour la qualité vidéo. Utilisez le lecteur ExoPlayer.',
      },
      {
        problem: 'La télécommande ne fonctionne pas correctement dans l\'application',
        solution: 'Certaines télécommandes de box génériques sont mal compatibles. Connectez une souris USB ou Bluetooth à votre box comme alternative. Vous pouvez aussi utiliser l\'application "Android TV Remote" sur votre smartphone pour contrôler la box.',
      },
    ],
  },
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tutorial = tutorialsData[slug];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  
  if (!tutorial) {
    return {
      title: 'Tutoriel IPTV - IPTV SMARTERS PRO',
    };
  }

  return {
    title: `${tutorial.title} - Guide Complet IPTV 2026`,
    description: tutorial.description,
    keywords: [
      `tutoriel ${slug} iptv`, `installer iptv ${slug}`, 'configuration iptv smarters pro',
      'guide iptv', 'abonnement iptv', 'iptv smarters pro', `iptv ${slug}`,
      'comment installer iptv', 'tuto iptv france',
    ],
    alternates: {
      canonical: `/tutoriels/${slug}`,
    },
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      url: `/tutoriels/${slug}`,
      title: `${tutorial.title} - Guide Complet`,
      description: tutorial.description,
      siteName: 'IPTV SMARTERS PRO',
      images: [{ url: `${baseUrl}/og-image.jpg`, width: 1200, height: 630, alt: tutorial.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: tutorial.title,
      description: tutorial.description,
      images: [`${baseUrl}/og-image.jpg`],
    },
  };
}

/* Icon mapping for step types based on keywords in the title */
function getStepIcon(title: string, slug: string) {
  const t = title.toLowerCase();
  if (t.includes('télécharger') || t.includes('download') || t.includes('installer l\'application') || t.includes('installer downloader')) return <Download className="w-6 h-6" />;
  if (t.includes('autoriser') || t.includes('sources inconnues') || t.includes('activer') || t.includes('développeur')) return <Shield className="w-6 h-6" />;
  if (t.includes('connecter') || t.includes('identifiant') || t.includes('login') || t.includes('connexion') || t.includes('abonnement')) return <LogIn className="w-6 h-6" />;
  if (t.includes('paramètre') || t.includes('optimis') || t.includes('configur') || t.includes('settings')) return <Settings className="w-6 h-6" />;
  if (t.includes('naviguer') || t.includes('profiter') || t.includes('découvrir') || t.includes('chaînes') || t.includes('regarder')) return <Play className="w-6 h-6" />;
  if (t.includes('installer') || t.includes('installation')) return <Download className="w-6 h-6" />;
  if (t.includes('lancer') || t.includes('ouvrir') || t.includes('premier')) return <Zap className="w-6 h-6" />;
  if (t.includes('vérifier') || t.includes('choisir') || t.includes('comprendre')) return <Search className="w-6 h-6" />;
  if (t.includes('vlc') || t.includes('alternative')) return <Monitor className="w-6 h-6" />;
  if (t.includes('playlist') || t.includes('m3u') || t.includes('mac')) return <Wifi className="w-6 h-6" />;
  
  // Default based on device
  if (slug === 'smart-tv' || slug === 'android-tv') return <Tv className="w-6 h-6" />;
  if (slug === 'pc-mac') return <Monitor className="w-6 h-6" />;
  return <Smartphone className="w-6 h-6" />;
}

/* Device icon for the hero section */
function getDeviceIcon(slug: string) {
  switch (slug) {
    case 'android': return <Smartphone className="w-8 h-8" />;
    case 'ios': return <Smartphone className="w-8 h-8" />;
    case 'smart-tv': return <Tv className="w-8 h-8" />;
    case 'fire-tv': return <Play className="w-8 h-8" />;
    case 'pc-mac': return <Monitor className="w-8 h-8" />;
    case 'android-tv': return <Tv className="w-8 h-8" />;
    default: return <Smartphone className="w-8 h-8" />;
  }
}

export default async function TutorialPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutorial = tutorialsData[slug];
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://officieliptvsmarterspro.fr';
  const seoHomeUrl = `${baseUrl}/abonnement-iptv/`;

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

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": tutorial.title,
    "description": tutorial.description,
    "totalTime": `PT${tutorial.duration.replace(' minutes', 'M')}`,
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "EUR", "value": "0" },
    "supply": tutorial.requirements.map(r => ({ "@type": "HowToSupply", "name": r })),
    "step": tutorial.steps.map((step, i) => ({
      "@type": "HowToStep",
      "position": i + 1,
      "name": step.title,
      "text": step.description,
      "itemListElement": step.details.map((detail, j) => ({
        "@type": "HowToDirection",
        "position": j + 1,
        "text": detail,
      })),
    })),
    "inLanguage": "fr-FR",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": seoHomeUrl },
      { "@type": "ListItem", "position": 2, "name": "Tutoriels", "item": `${baseUrl}/tutoriels` },
      { "@type": "ListItem", "position": 3, "name": tutorial.title, "item": `${baseUrl}/tutoriels/${slug}` },
    ],
  };

  // FAQPage schema from troubleshooting — double dips on rich snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tutorial.troubleshooting.map((t) => ({
      "@type": "Question",
      "name": t.problem,
      "acceptedAnswer": { "@type": "Answer", "text": t.solution },
    })),
  };

  // VideoObject schema — references tutorial video content
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": `Tutoriel: ${tutorial.title}`,
    "description": `Guide vidéo: ${tutorial.description}`,
    "thumbnailUrl": `${baseUrl}/og-image.jpg`,
    "uploadDate": "2026-01-15T08:00:00+01:00",
    "duration": `PT${tutorial.duration.replace(' minutes', 'M')}`,
    "contentUrl": `https://www.youtube.com/@iptvsmarterspro`,
    "embedUrl": `https://www.youtube.com/@iptvsmarterspro`,
    "publisher": {
      "@type": "Organization",
      "name": "IPTV SMARTERS PRO",
      "logo": { "@type": "ImageObject", "url": `${baseUrl}/logo.png` }
    },
    "inLanguage": "fr-FR",
  };

  return (
    <main className="min-h-screen bg-black">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }} />
      <NavigationHeader />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
        
        <div className="relative max-w-5xl mx-auto">
          <Link 
            href="/tutoriels"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition-colors mb-8"
          >
            &#8592; Retour aux tutoriels
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                {getDeviceIcon(slug)}
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
                  {tutorial.title}
                </h1>
              </div>
            </div>
            <p className="text-xl text-white/70 mb-6 max-w-3xl">
              {tutorial.description}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30">
                <span className="text-sm font-bold text-cyan-400">Durée : {tutorial.duration}</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
                <span className="text-sm font-bold text-green-400">Difficulté : {tutorial.difficulty}</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                <span className="text-sm font-bold text-purple-400">{tutorial.steps.length} étapes</span>
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-blue-400" />
              Ce dont vous avez besoin avant de commencer
            </h3>
            <ul className="space-y-3">
              {tutorial.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-3 text-white/70">
                  <span className="text-blue-400 mt-1 font-bold">&#10003;</span>
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
            Guide Étape par <span className="text-cyan-400">Étape</span>
          </h2>
          <p className="text-white/50 text-center mb-12 max-w-2xl mx-auto">
            Suivez chaque étape dans l&apos;ordre. Si vous rencontrez un problème, consultez la section Dépannage en bas de page.
          </p>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mb-12">
            {tutorial.steps.map((_, index) => (
              <div key={index} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
                  {index + 1}
                </div>
                {index < tutorial.steps.length - 1 && (
                  <div className="w-8 md:w-16 h-0.5 bg-gradient-to-r from-cyan-500/50 to-purple-500/50" />
                )}
              </div>
            ))}
          </div>

          <div className="space-y-8">
            {tutorial.steps.map((step, index) => (
              <div
                key={index}
                id={`etape-${index + 1}`}
                className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-cyan-400">{getStepIcon(step.title, slug)}</span>
                      <h3 className="text-2xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-white/60">{step.description}</p>
                  </div>
                </div>

                <div className="ml-0 md:ml-[4.5rem]">
                  <ul className="space-y-3 mb-6">
                    {step.details.map((detail, idx) => (
                      detail === '' ? (
                        <li key={idx} className="h-2" />
                      ) : (
                        <li key={idx} className="flex items-start gap-3 text-white/80">
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-xs text-cyan-400 font-bold mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{detail}</span>
                        </li>
                      )
                    ))}
                  </ul>

                  {/* Note/Warning if exists */}
                  {step.note && (
                    <div className="rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 p-4 flex items-start gap-3">
                      <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                      <p className="text-amber-200/80 text-sm leading-relaxed">{step.note}</p>
                    </div>
                  )}
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
                  <p className="text-white/70 leading-relaxed">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
            Dépannage <span className="text-cyan-400">IPTV</span>
          </h2>
          <p className="text-white/50 text-center mb-12 max-w-2xl mx-auto">
            Un problème ? Trouvez la solution ici. Si votre problème n&apos;est pas listé, contactez notre support 24/7.
          </p>

          <div className="space-y-6">
            {tutorial.troubleshooting.map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl bg-gradient-to-br from-red-500/5 to-orange-500/5 border border-red-500/20"
              >
                <div className="flex items-start gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <h3 className="text-lg font-bold text-white">{item.problem}</h3>
                </div>
                <div className="ml-9 p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                  <p className="text-green-300/80 leading-relaxed flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{item.solution}</span>
                  </p>
                </div>
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
              Besoin d&apos;Aide ?
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Notre support 24/7 est là pour vous aider avec l&apos;installation de votre <strong>abonnement IPTV SMARTERS PRO</strong>. 
              Contactez-nous par email ou WhatsApp pour une assistance personnalisée.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/abonnement-iptv/#contact"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(6,182,212,0.5)] transition-all duration-300 hover:scale-105"
              >
                Contacter le Support
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/abonnement-iptv/#pricing"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all duration-300"
              >
                S&apos;abonner Maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InternalLinksSilo />
      <Footer />
    </main>
  );
}
