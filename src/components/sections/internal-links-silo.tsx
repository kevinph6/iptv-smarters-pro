import Link from 'next/link';

const siloLinks = [
  { href: '/abonnement-iptv/', text: 'Abonnement IPTV France', primary: true },
  { href: '/abonnement-iptv/#pricing', text: 'Tarifs IPTV 2026', primary: true },
  { href: '/chaines', text: 'Liste des chaînes IPTV', primary: false },
  { href: '/tutoriels', text: 'Tutoriels installation IPTV', primary: false },
  { href: '/tutoriels/android', text: 'IPTV sur Android', primary: false },
  { href: '/tutoriels/ios', text: 'IPTV sur iPhone/iPad', primary: false },
  { href: '/tutoriels/smart-tv', text: 'IPTV sur Smart TV', primary: false },
  { href: '/tutoriels/fire-tv', text: 'IPTV sur Fire TV Stick', primary: false },
  { href: '/iptv-samsung', text: 'IPTV Samsung', primary: false },
  { href: '/iptv-firestick', text: 'IPTV FireStick', primary: false },
  { href: '/iptv-lg', text: 'IPTV LG', primary: false },
  { href: '/iptv-paris', text: 'IPTV Paris', primary: false },
  { href: '/iptv-lyon', text: 'IPTV Lyon', primary: false },
  { href: '/iptv-marseille', text: 'IPTV Marseille', primary: false },
  { href: '/blog', text: 'Blog IPTV France', primary: false },
];

/**
 * Internal link silo component — renders at the bottom of blog posts
 * and tutorial pages to reinforce topical authority and pass link juice
 * to money pages and programmatic landing pages.
 */
export default function InternalLinksSilo() {
  return (
    <section className="py-12 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-white mb-6">
          Découvrez nos services IPTV
        </h2>
        <div className="flex flex-wrap gap-2">
          {siloLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                link.primary
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400/60'
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30'
              }`}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
