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
  { text: "Meilleur abonnement IPTV", href: "#" },
  { text: "IPTV France", href: "#" },
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
            <p className="text-white/50 mb-8 max-w-2xl mx-auto">
              Rejoignez plus de 50,000 clients satisfaits et profitez de plus de 160,000 chaînes en qualité 4K
            </p>
            <Link
              href="/#pricing"
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
                <span className="block text-[10px] text-white/40 uppercase tracking-widest">Officiel IPTV</span>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-md mb-6">
              IPTV SMARTERS PRO est l'un des principaux fournisseurs mondiaux de technologies de l'information et de la communication de nouvelle génération. Notre mission est de fournir le meilleur service de streaming à nos clients.
            </p>
            <div className="flex items-center gap-4">
              <a href="mailto:support@example.com" className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors text-sm">
                <Mail className="w-4 h-4" />
                support@example.com
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
                    className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
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
                  <a
                    href={link.href}
                    className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-purple-500/50 group-hover:text-purple-500 transition-colors" />
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Section with DMCA Badge and Payment Icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <p className="text-white/30 text-sm">
            Copyright 2025 © All Rights are Reserved
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
            
            <Link href="/privacy-policy" className="text-white/30 hover:text-white/60 text-sm transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms-of-use" className="text-white/30 hover:text-white/60 text-sm transition-colors">
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
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="black">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="12" fontWeight="bold">VISA</text>
                </svg>
              </div>
              {/* Mastercard */}
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                <svg viewBox="0 0 48 32" className="h-5 w-auto">
                  <circle cx="18" cy="16" r="7" fill="black" opacity="0.7"/>
                  <circle cx="30" cy="16" r="7" fill="black" opacity="0.5"/>
                </svg>
              </div>
              {/* PayPal */}
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="black">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold">PP</text>
                </svg>
              </div>
              {/* American Express */}
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="black">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="10" fontWeight="bold">AMEX</text>
                </svg>
              </div>
              {/* Discover */}
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="black">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="9" fontWeight="bold">DISC</text>
                </svg>
              </div>
              {/* Crypto */}
              <div className="w-12 h-8 bg-white rounded flex items-center justify-center">
                <svg viewBox="0 0 48 32" className="h-6 w-auto" fill="black">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="16" fontWeight="bold">₿</text>
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
              <p className="text-white/40 text-xs leading-relaxed">
                <strong className="text-white/60">Important Notice:</strong> We are fully compliant with DMCA regulations. We do not host, upload, or store any video content on our servers. All content is provided by independent third-party sources. This website functions solely as a search engine and content aggregator. We respect intellectual property rights and will promptly respond to valid DMCA takedown requests.
                <br /><br />
                If you believe your copyrighted material has been indexed or linked without authorization, please submit a formal DMCA notice to{" "}
                <a href="mailto:support@example.com" className="text-cyan-400 hover:text-cyan-300 underline font-semibold">
                  support@example.com
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