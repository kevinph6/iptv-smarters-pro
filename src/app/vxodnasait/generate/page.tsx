"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Wand2, Loader2, Copy, Check, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

export default function AIGeneratePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [generating, setGenerating] = useState(false);
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [generatedData, setGeneratedData] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Veuillez entrer un sujet pour l\'article');
      return;
    }

    setGenerating(true);
    setGeneratedData(null);

    try {
      const response = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, keywords }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la génération');
      }

      const data = await response.json();
      setGeneratedData(data);
      toast.success('Article généré avec succès!');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la génération');
      console.error(error);
    } finally {
      setGenerating(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copié dans le presse-papier!');
    setTimeout(() => setCopied(false), 2000);
  };

  const createPostWithData = () => {
    if (!generatedData) return;
    
    const params = new URLSearchParams({
      title: generatedData.title || '',
      excerpt: generatedData.excerpt || '',
      content: generatedData.content || '',
    });
    
    router.push(`/vxodnasait/posts/new?${params.toString()}`);
  };

  if (isPending || !session?.user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-cyan-900/20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <Link
            href="/vxodnasait"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au dashboard
          </Link>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-xl">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white mb-1">
                Générateur d'Articles IA
              </h1>
              <p className="text-white/60">
                Créez des articles SEO complets en quelques secondes avec GPT-5.2 Pro
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Input Section */}
        <div className="bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/40 border-2 border-purple-500/30 rounded-2xl p-8 mb-8">
          <div className="mb-6">
            <label className="block text-white font-bold text-lg mb-3">
              Sujet de l'article <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Comment installer IPTV SMARTERS PRO sur Smart TV Samsung en 2025"
              className="w-full bg-black/60 border-2 border-white/20 rounded-xl px-6 py-4 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              disabled={generating}
            />
          </div>

          <div className="mb-8">
            <label className="block text-white font-bold text-lg mb-3">
              Mots-clés SEO <span className="text-white/40">(optionnel)</span>
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Ex: IPTV Smart TV, installation IPTV, meilleur IPTV 2025, streaming HD"
              className="w-full bg-black/60 border-2 border-white/20 rounded-xl px-6 py-4 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              disabled={generating}
            />
            <p className="text-white/50 text-sm mt-2">
              Séparez les mots-clés par des virgules pour un meilleur référencement
            </p>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating || !topic.trim()}
            className="w-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-cyan-500 text-white font-black text-xl py-6 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] flex items-center justify-center gap-3"
          >
            {generating ? (
              <>
                <Loader2 className="w-7 h-7 animate-spin" />
                Génération en cours avec GPT-5.2 Pro...
              </>
            ) : (
              <>
                <Wand2 className="w-7 h-7" />
                GÉNÉRER L'ARTICLE COMPLET
              </>
            )}
          </button>
        </div>

        {/* Results Section */}
        {generatedData && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Action Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={createPostWithData}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                <ArrowRight className="w-6 h-6" />
                Créer l'article avec ce contenu
              </button>
            </div>

            {/* Title */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide">
                  Titre SEO
                </h3>
                <button
                  onClick={() => copyToClipboard(generatedData.title)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Copier"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/60" />
                  )}
                </button>
              </div>
              <p className="text-white text-xl font-bold leading-relaxed">
                {generatedData.title}
              </p>
              <p className="text-white/40 text-sm mt-2">
                {generatedData.title.length} caractères
              </p>
            </div>

            {/* Meta Description */}
            {generatedData.metaDescription && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide">
                    Meta Description
                  </h3>
                  <button
                    onClick={() => copyToClipboard(generatedData.metaDescription)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                    title="Copier"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-400" />
                    ) : (
                      <Copy className="w-4 h-4 text-white/60" />
                    )}
                  </button>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {generatedData.metaDescription}
                </p>
                <p className="text-white/40 text-sm mt-2">
                  {generatedData.metaDescription.length} caractères
                </p>
              </div>
            )}

            {/* Excerpt */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide">
                  Extrait (Résumé)
                </h3>
                <button
                  onClick={() => copyToClipboard(generatedData.excerpt)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Copier"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/60" />
                  )}
                </button>
              </div>
              <p className="text-white/90 leading-relaxed">
                {generatedData.excerpt}
              </p>
            </div>

            {/* Keywords */}
            {generatedData.suggestedKeywords && generatedData.suggestedKeywords.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide mb-3">
                  Mots-clés suggérés
                </h3>
                <div className="flex flex-wrap gap-2">
                  {generatedData.suggestedKeywords.map((keyword: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Content */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide">
                  Contenu de l'article
                </h3>
                <button
                  onClick={() => copyToClipboard(generatedData.content)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  title="Copier"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/60" />
                  )}
                </button>
              </div>
              <div 
                className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/80 prose-strong:text-white prose-ul:text-white/80 prose-li:text-white/80"
                dangerouslySetInnerHTML={{ __html: generatedData.content }}
              />
            </div>

            {/* Action Button Bottom */}
            <button
              onClick={createPostWithData}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <ArrowRight className="w-6 h-6" />
              Créer l'article avec ce contenu
            </button>
          </div>
        )}

        {/* Info Section */}
        {!generatedData && !generating && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h3 className="text-white font-bold text-xl mb-4">
              Comment ça marche ?
            </h3>
            <ul className="space-y-3 text-white/70">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">
                  1
                </span>
                <span>
                  <strong className="text-white">Entrez un sujet</strong> - Décrivez le thème de votre article
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">
                  2
                </span>
                <span>
                  <strong className="text-white">Ajoutez des mots-clés</strong> (optionnel) - Pour un meilleur référencement SEO
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">
                  3
                </span>
                <span>
                  <strong className="text-white">Cliquez sur Générer</strong> - Notre IA GPT-5.2 Pro crée un article complet et optimisé SEO
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">
                  4
                </span>
                <span>
                  <strong className="text-white">Utilisez le contenu</strong> - Copiez ou créez directement un article avec le contenu généré
                </span>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <p className="text-cyan-300 text-sm">
                <strong>💡 Astuce :</strong> Plus votre sujet est détaillé, meilleur sera l'article généré. 
                Incluez des aspects spécifiques comme l'année, le modèle d'appareil, ou le type de contenu.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
