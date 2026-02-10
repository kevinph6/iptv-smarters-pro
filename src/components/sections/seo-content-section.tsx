import Link from 'next/link';

export default function SeoContentSection() {
  return (
    <section className="bg-black py-16 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-white mb-8 text-center">
          Pourquoi choisir <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">IPTV Smarters Pro</span> pour votre abonnement IPTV en France ?
        </h2>
        
        <div className="prose prose-invert prose-lg max-w-none text-white/70 leading-relaxed space-y-6">
          <p>
            <strong className="text-white">IPTV Smarters Pro</strong> est le service d&apos;abonnement IPTV le plus complet et le plus fiable en France en 2026. 
            Avec plus de <strong className="text-white">160 000 chaines TV en direct</strong> et <strong className="text-white">20 000+ contenus VOD</strong> (films et series), 
            notre service vous offre un acces illimite a tout le divertissement dont vous avez besoin, le tout en qualite 4K, Full HD et HD.
          </p>
          
          <p>
            Notre <Link href="/chaines" className="text-cyan-400 hover:text-purple-400 transition-colors">liste de chaines IPTV</Link> couvre 
            toutes les chaines francaises populaires comme TF1, France 2, M6, Canal+, ainsi que les chaines sportives comme beIN Sports, RMC Sport et Eurosport. 
            Que vous souhaitiez regarder le football, le cinema, les documentaires ou les programmes pour enfants, 
            notre abonnement IPTV premium couvre tous vos besoins.
          </p>
          
          <p>
            L&apos;activation de votre <strong className="text-white">abonnement IPTV</strong> est instantanee et prend maximum 5 minutes. 
            Notre equipe de support est disponible 24h/24 et 7j/7 par email et WhatsApp pour vous accompagner dans la 
            <Link href="/tutoriels" className="text-cyan-400 hover:text-purple-400 transition-colors"> configuration sur tous vos appareils</Link> : 
            Smart TV Samsung et LG, Android TV, Apple TV, Amazon Fire TV Stick, iPhone, iPad, smartphones Android, PC Windows, Mac et bien plus encore.
          </p>
          
          <p>
            Nos serveurs europeens dedies avec connexion 20 Gbps garantissent une stabilite optimale avec une ouverture des chaines 
            en moins de 0,5 seconde. Nous proposons des <Link href="/abonnement-iptv/#pricing" className="text-cyan-400 hover:text-purple-400 transition-colors">abonnements IPTV</Link> flexibles 
            allant de 3 mois a 24 mois, avec des offres speciales incluant des mois gratuits supplementaires. 
            Choisissez entre notre pack standard HD ou notre <strong className="text-white">pack Premium 4K</strong> pour la meilleure experience visuelle possible.
          </p>
          
          <p>
            Rejoignez plus de 50 000 clients satisfaits en France qui font confiance a IPTV Smarters Pro pour leur divertissement quotidien. 
            Consultez notre <Link href="/blog" className="text-cyan-400 hover:text-purple-400 transition-colors">blog IPTV</Link> pour des guides, 
            tutoriels et les dernieres actualites sur le streaming IPTV en France.
          </p>
        </div>
      </div>
    </section>
  );
}
