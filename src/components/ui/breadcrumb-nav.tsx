import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="py-3 px-6">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm text-white/50 flex-wrap">
          <li>
            <Link href="/abonnement-iptv/" className="hover:text-white transition-colors">
              Accueil
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <span>/</span>
              {item.href && index < items.length - 1 ? (
                <Link href={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white/80 truncate max-w-[250px]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
