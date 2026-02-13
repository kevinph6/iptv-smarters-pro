"use client";

import Link from 'next/link';
import { Sparkles, ExternalLink, Mail, ArrowRight, Shield, CreditCard } from 'lucide-react';
import Image from 'next/image';

interface LegalLink {
  href: string;
  text: string;
}

const legalLinks: LegalLink[] = [
  { href: "/tutoriels", text: "Comment utiliser" },
  { href: "/confidentialite", text: "Politique de confidentialité" },
  { href: "/blog", text: "Blog IPTV" },
  { href: "/remboursement", text: "Politique de remboursement" },
  { href: "/chaines", text: "Chaînes IPTV" },
];

const partnerLinks = [
  { text: "Meilleur abonnement IPTV", href: "/abonnement-iptv/" },
  { text: "IPTV France Premium 4K", href: "/abonnement-iptv/#pricing" },
  { text: "Chaînes IPTV en direct", href: "/chaines" },
  { text: "Tutoriels installation IPTV", href: "/tutoriels" },
];

const Footer = () => {
  return (
    <footer className="relative bg-black pt-20 pb-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[200px]" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* CTA Section */}
        <div className="relative mb-16">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl" />
          <div className="relative bg-gradient-to-r from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 p-10 text-center">
            <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
              Prêt à commencer votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">expérience TV ultime</span> ?
            </h3>
            <p className="text-white/70 mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 50,000 clients satisfaits et profitez de plus de 160,000 chaînes en qualité 4K
            </p>
            <Link
              href="/abonnement-iptv/#pricing"
              className="group relative inline-flex items-center gap-3"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-70 group-hover:opacity-100 transition-opacity" />
              <div className="relative inline-flex items-center gap-3 px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-bold text-lg">
                S'abonner maintenant
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl blur-lg opacity-50" />
                <div className="relative w-12 h-12 rounded-xl flex items-center justify-center">
                  <Image
                    src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/50018153493f4fa80d86c84a6b0e85c5421b42336327adc75d63a93c1074e296_200-1765051431427.webp"
                    alt="IPTV SMARTERS PRO Logo"
                    width={48}
                    height={48}
                    className="object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                  />
                </div>
              </div>
              <div>
                <span className="font-black text-xl text-white">IPTV SMARTERS PRO</span>
                <span className="block text-[10px] text-white/70 uppercase tracking-widest">Officiel IPTV</span>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed max-w-md mb-6">
              IPTV SMARTERS PRO est l'un des principaux fournisseurs mondiaux de technologies de l'information et de la communication de nouvelle génération. Notre mission est de fournir le meilleur service de streaming à nos clients.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:support@iptvsmarterspro.fr" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm underline underline-offset-2">
                <Mail className="w-4 h-4" />
                support@iptvsmarterspro.fr
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500" />
              Liens Rapides
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h4 className="text-white font-bold mb-6 flex items-center gap-2">
              <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500" />
              Partenaires
            </h4>
            <ul className="space-y-3">
              {partnerLinks.map((link) => (
                <li key={link.text}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-purple-500/50 group-hover:text-purple-500 transition-colors" />
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Section with DMCA Badge and Payment Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <p className="text-white/70 text-sm">
            Copyright 2026 © All Rights are Reserved
          </p>
          
          <div className="flex items-center gap-6">
            {/* DMCA Protection Badge */}
            <a 
              href="https://www.dmca.com/Protection/Status.aspx" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative"
              aria-label="DMCA Protected"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-green-500/50 transition-all">
                <Image
                  src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/dmca-protected-1765051597810.png?width=8000&height=8000&resize=contain"
                  alt="DMCA Protected"
                  width={100}
                  height={40}
                  className="object-contain"
                />
              </div>
            </a>
            
            <Link href="/confidentialite" className="text-white/70 hover:text-white text-sm transition-colors underline underline-offset-2">
              Confidentialité
            </Link>
            <Link href="/remboursement" className="text-white/70 hover:text-white text-sm transition-colors underline underline-offset-2">
              Conditions
            </Link>
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="mb-8 p-6 rounded-xl bg-white/5 border border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-white/60" />
              <span className="text-white/60 text-sm font-semibold">Méthodes de paiement acceptées:</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {/* Visa */}
              <div className="w-14 h-9 bg-white rounded-md flex items-center justify-center px-1.5 shadow-sm">
                <svg viewBox="0 0 780 500" className="h-5 w-auto">
                  <path d="M293.2 348.73l33.36-195.76h53.35l-33.38 195.76zm246.11-191.54c-10.57-3.97-27.16-8.21-47.86-8.21-52.77 0-89.94 26.55-90.18 64.6-.5 28.11 26.51 43.79 46.76 53.15 20.78 9.59 27.77 15.73 27.67 24.3-.13 13.13-16.59 19.12-31.93 19.12-21.37 0-32.69-2.96-50.22-10.27l-6.88-3.11-7.49 43.87c12.47 5.46 35.53 10.2 59.47 10.44 56.13 0 92.57-26.24 92.99-66.88.2-22.28-14.03-39.23-44.82-53.21-18.66-9.06-30.1-15.12-29.98-24.28 0-8.14 9.67-16.84 30.56-16.84 17.45-.28 30.1 3.53 39.94 7.5l4.78 2.26 7.23-42.44zm137.31-4.22h-41.27c-12.78 0-22.35 3.48-27.96 16.22l-79.31 179.54h56.08s9.16-24.13 11.24-29.42l68.39.08c1.6 6.86 6.49 29.34 6.49 29.34h49.57l-43.23-195.76zm-65.9 126.41c4.41-11.28 21.26-54.71 21.26-54.71-.32.53 4.38-11.32 7.07-18.66l3.61 16.86s10.22 46.71 12.35 56.51h-44.29zM284.05 153l-52.27 133.56-5.59-27.17c-9.72-31.25-40.02-65.14-73.92-82.12l47.83 171.33 56.5-.06L340.6 152.97l-56.55.03" fill="#1A1F71" />
                  <path d="M146.92 152.96H60.88l-.68 3.97c67.01 16.21 111.32 55.38 129.66 102.41L171.72 169.4c-3.23-12.4-12.58-16.1-24.8-16.44" fill="#F7A600" />
                </svg>
              </div>
              {/* Mastercard */}
              <div className="w-14 h-9 bg-white rounded-md flex items-center justify-center px-1 shadow-sm">
                <svg viewBox="0 0 780 500" className="h-6 w-auto">
                  <circle cx="312" cy="250" r="155" fill="#EB001B" />
                  <circle cx="468" cy="250" r="155" fill="#F79E1B" />
                  <path d="M390 130.7c-40.2 32-65.6 80.5-65.6 135.3s25.4 103.3 65.6 135.3c40.2-32 65.6-80.5 65.6-135.3s-25.4-103.3-65.6-135.3z" fill="#FF5F00" />
                </svg>
              </div>
              {/* PayPal */}
              <div className="w-14 h-9 bg-white rounded-md flex items-center justify-center px-1 shadow-sm">
                <svg viewBox="0 0 124 33" className="h-5 w-auto">
                  <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM47 13.154c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.469 1.044.332 1.906z" fill="#253B80" />
                  <path d="M66.654 13.075h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317z" fill="#253B80" />
                  <path d="M84.096 13.075h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z" fill="#253B80" />
                  <path d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.789 6.405c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906z" fill="#179BD7" />
                  <path d="M115.434 13.075h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317z" fill="#179BD7" />
                  <path d="M119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822a.949.949 0 0 0 .939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z" fill="#179BD7" />
                </svg>
              </div>
              {/* Apple Pay */}
              <div className="w-14 h-9 bg-white rounded-md flex items-center justify-center px-1.5 shadow-sm">
                <span className="text-black font-bold text-xs tracking-tight"> Pay</span>
              </div>
              {/* Google Pay */}
              <div className="w-14 h-9 bg-white rounded-md flex items-center justify-center px-1.5 shadow-sm">
                <span className="text-black font-bold text-[10px] tracking-tight">G Pay</span>
              </div>
              {/* Crypto */}
              <div className="w-14 h-9 bg-white rounded-md flex items-center justify-center shadow-sm">
                <svg viewBox="0 0 24 24" className="h-5 w-auto" fill="#F7931A">
                  <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.546zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.7-.17-1.053-.252l.53-2.12-1.315-.328-.54 2.154c-.285-.065-.565-.13-.84-.198l.001-.007-1.815-.453-.35 1.407s.975.224.955.238c.535.136.63.494.614.78l-.614 2.456c.037.01.085.025.137.047l-.14-.034-.86 3.448c-.065.16-.23.4-.6.308.013.019-.956-.238-.956-.238l-.652 1.514 1.714.427c.318.08.63.164.938.243l-.545 2.19 1.313.328.54-2.17c.36.1.707.19 1.05.273l-.538 2.16 1.315.33.545-2.186c2.245.424 3.93.253 4.64-1.774.572-1.634-.028-2.58-1.21-3.193.86-.198 1.507-.762 1.68-1.93z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Disclaimer with DMCA Focus */}
        <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h4 className="text-white/80 font-bold text-sm mb-2 flex items-center gap-2">
                DMCA Compliance & Copyright Protection
              </h4>
              <p className="text-white/70 text-xs leading-relaxed">
                <strong className="text-white">Important Notice:</strong> We are fully compliant with DMCA regulations. We do not host, upload, or store any video content on our servers. All content is provided by independent third-party sources. This website functions solely as a search engine and content aggregator. We respect intellectual property rights and will promptly respond to valid DMCA takedown requests.
                <br /><br />
                If you believe your copyrighted material has been indexed or linked without authorization, please submit a formal DMCA notice to{" "}
                <a href="mailto:support@iptvsmarterspro.fr" className="text-cyan-400 hover:text-cyan-300 underline font-semibold">
                  support@iptvsmarterspro.fr
                </a>
                {" "}with detailed information including: (1) Description of copyrighted work, (2) URL of infringing content, (3) Your contact information, (4) Good faith statement, (5) Statement of accuracy under penalty of perjury. We will investigate and take appropriate action, including content removal, within 24-48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;