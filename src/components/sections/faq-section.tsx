"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "Qu'est-ce qu' IPTV Smarters Pro ?",
    answer: "IPTV Smarters Pro est une application puissante permettant de regarder la télévision en direct, des films, des séries et des chaînes premium via un abonnement IPTV. Elle est compatible avec plusieurs appareils tels que Smart TV, Android, iOS, PC et Fire Stick.",
  },
  {
    question: "Proposez-vous un abonnement IPTV pour IPTV Smarters Pro ?",
    answer: "Oui ! Nous proposons des abonnements IPTV de haute qualité compatibles avec IPTV Smarters Pro. Vous aurez accès à des milliers de chaînes internationales, du sport en direct, des films et des séries avec une qualité HD, Full HD et 4K.",
  },
  {
    question: "Comment activer mon abonnement IPTV sur IPTV Smarters Pro ?",
    answer: "Immédiatement après votre souscription, un agent vous contactera par e-mail ou WhatsApp pour activer votre abonnement. L'activation est instantanée.",
  },
  {
    question: "Quels sont les avantages d'un abonnement IPTV Smarters Pro ?",
    answer: "Les avantages incluent l'accès à plus de 160 000 chaînes mondiales en qualité jusqu'à 4K, une bibliothèque de plus de 20 000 films et séries VOD, une activation instantanée de votre service, et un support client disponible 24h/24 et 7j/7.",
  },
  {
    question: "Mon abonnement IPTV ne fonctionne pas sur IPTV Smarters Pro, que faire ?",
    answer: "Si vous rencontrez des difficultés avec votre abonnement, veuillez contacter notre service d'assistance disponible 24/7 par e-mail ou via notre système de tickets. Notre équipe technique est là pour vous aider à résoudre le problème rapidement.",
  },
  {
    question: "Quels appareils sont compatibles avec IPTV Smarters Pro ?",
    answer: "Nos abonnements IPTV fonctionnent sur : Smart TV Samsung et LG (WebOS, Tizen), Android TV et Box Android, Fire Stick et Fire TV, PC (Windows, Mac), ainsi que sur smartphones et tablettes (Android, iOS).",
  },
  {
    question: "Comment renouveler mon abonnement IPTV ?",
    answer: "Pour renouveler votre abonnement IPTV, il vous suffit de choisir un nouveau plan de 3, 6, ou 12 mois selon vos besoins et de procéder à l'achat sur notre site.",
  },
  {
    question: "Votre service IPTV Smarters pro est-il légal et sécurisé ?",
    answer: "Oui, notre service IPTV est 100% légal et respecte toutes les réglementations en vigueur. De plus, nous incluons un VPN intégré dans nos abonnements pour garantir votre confidentialité et une connexion sécurisée.",
  },
];

const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative bg-black py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[200px]" />
      </div>

      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
            <HelpCircle className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">Support</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Questions <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Fréquentes</span>
          </h2>
          <p className="text-white/50 text-lg">
            Tout ce que vous devez savoir sur IPTV Smarters Pro
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="group"
            >
              <div className={`relative rounded-2xl transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30' 
                  : 'bg-white/5 border-white/10 hover:bg-white/[0.07] hover:border-white/20'
              } border backdrop-blur-sm overflow-hidden`}>
                {/* Question Button */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-semibold text-lg pr-4 transition-colors ${
                    openIndex === index ? 'text-white' : 'text-white/80'
                  }`}>
                    {item.question}
                  </span>
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-purple-500 rotate-180' 
                      : 'bg-white/10 group-hover:bg-purple-500/20'
                  }`}>
                    <ChevronDown className={`w-5 h-5 transition-colors ${
                      openIndex === index ? 'text-white' : 'text-white/60'
                    }`} />
                  </div>
                </button>

                {/* Answer Content */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-6">
                    <div className="h-px bg-gradient-to-r from-purple-500/30 to-pink-500/30 mb-4" />
                    <p className="text-white/60 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA — TEMPORARILY HIDDEN */}
        <div className="text-center mt-12 hidden">
          <p className="text-white/50 mb-4">Vous avez d{`'`}autres questions ?</p>
          <a
            href="https://wa.me/212628461599"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-500/20 border border-purple-500/30 text-purple-400 font-semibold hover:bg-purple-500/30 transition-colors"
          >
            Contactez-nous
          </a>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;