"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Sparkles, Wand2, Loader2, Copy, Check, ArrowRight, Zap, Image as ImageIcon, FileText, ExternalLink, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

// Predefined SEO keyword suggestions for IPTV ranking
const KEYWORD_PRESETS = {
  'IPTV Installation': 'iptv smarters pro, installer iptv, configuration iptv, iptv smart tv, iptv android, iptv firestick',
  'IPTV Comparatif': 'meilleur iptv, abonnement iptv, iptv pas cher, iptv fiable, comparatif iptv france, iptv 2026',
  'IPTV 4K Sport': 'iptv 4k, iptv sport, iptv streaming, iptv sans coupure, iptv premium, iptv hd',
  'IPTV Samsung/LG': 'iptv samsung, iptv lg, iptv smart tv, iptv tizen, installer iptv smart tv, iptv webos',
  'IPTV France Chaînes': 'iptv france, chaînes iptv, iptv vod, iptv 160000 chaînes, iptv français, liste iptv',
  'IPTV Fire TV Stick': 'iptv firestick, iptv fire tv, iptv amazon, installer iptv fire stick, iptv apk firestick',
  'IPTV Apple TV/iOS': 'iptv apple tv, iptv ios, iptv iphone, iptv ipad, smarters pro ios, iptv m3u apple',
};

// Topic suggestions optimized for SEO ranking
const TOPIC_SUGGESTIONS = [
  'Comment installer IPTV Smarters Pro sur Smart TV Samsung en 2026',
  'Meilleur Abonnement IPTV France 2026 : Comparatif Complet et Avis',
  'IPTV 4K vs HD : Quelle Qualité Choisir pour votre Streaming ?',
  'Guide Complet : Installer IPTV sur Fire TV Stick en 5 Minutes',
  'IPTV sans Coupure : Les Secrets d\'un Streaming Stable et Fiable',
  'Comment Configurer IPTV Smarters Pro sur Android : Tutoriel Complet',
  'IPTV France : Liste Complète des Chaînes Disponibles en 2026',
  'IPTV Apple TV : Guide d\'Installation Pas à Pas pour iOS',
  'Abonnement IPTV Pas Cher : Comment Choisir sans se Faire Arnaquer',
  'IPTV Sport en Direct : Regarder le Football, Tennis et F1 en 4K',
  'IPTV LG WebOS : Installation et Configuration Complète',
  'Test IPTV Gratuit : Comment Essayer Avant de S\'abonner',
  'IPTV VOD : Plus de 20 000 Films et Séries en Streaming',
  'IPTV Smarters Pro vs XCIPTV : Quel Player Choisir en 2026 ?',
  'Comment Résoudre les Problèmes de Buffering IPTV : Guide Expert',
];

interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  metaDescription: string;
  category: string;
  author: string;
  featuredImageUrl: string | null;
  published: boolean;
  suggestedKeywords: string[];
  modelUsed: string;
  url: string;
}

export default function AIGeneratePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  
  // Form state
  const [topic, setTopic] = useState('');
  const [keywords, setKeywords] = useState('');
  const [model, setModel] = useState<'claude' | 'sonnet' | 'opus' | 'gpt'>('claude');
  const [generateImage, setGenerateImage] = useState(true);
  const [autoPublish, setAutoPublish] = useState(true);
  
  // Generation state
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [generatedPost, setGeneratedPost] = useState<GeneratedPost | null>(null);
  const [generatedArticle, setGeneratedArticle] = useState<any>(null);
  const [mode, setMode] = useState<'full' | 'preview'>('full');
  
  // UI state
  const [copied, setCopied] = useState(false);
  const [showTopicSuggestions, setShowTopicSuggestions] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [recentPosts, setRecentPosts] = useState<GeneratedPost[]>([]);

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  // Full generation: article + image + save to DB
  const handleFullGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Veuillez entrer un sujet pour l\'article');
      return;
    }

    setGenerating(true);
    setGeneratedPost(null);
    setGeneratedArticle(null);
    setGenerationStep('Génération de l\'article avec Claude Sonnet...');

    try {
      const response = await fetch('/api/ai/generate-full', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          topic,
          keywords,
          model,
          generateImage,
          autoPublish,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la génération');
      }

      const data = await response.json();
      setGeneratedPost(data.post);
      setRecentPosts(prev => [data.post, ...prev.slice(0, 4)]);
      toast.success('Article généré et publié avec succès !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la génération');
      console.error(error);
    } finally {
      setGenerating(false);
      setGenerationStep('');
    }
  };

  // Preview generation: article only (no save)
  const handlePreviewGenerate = async () => {
    if (!topic.trim()) {
      toast.error('Veuillez entrer un sujet pour l\'article');
      return;
    }

    setGenerating(true);
    setGeneratedArticle(null);
    setGeneratedPost(null);
    setGenerationStep('Génération de l\'aperçu avec Claude Sonnet...');

    try {
      const response = await fetch('/api/ai/generate-article', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, keywords, model }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la génération');
      }

      const data = await response.json();
      setGeneratedArticle(data);
      toast.success('Aperçu de l\'article généré !');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la génération');
      console.error(error);
    } finally {
      setGenerating(false);
      setGenerationStep('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast.success('Copié !');
    setTimeout(() => setCopied(false), 2000);
  };

  const applyKeywordPreset = (preset: string) => {
    setKeywords(KEYWORD_PRESETS[preset as keyof typeof KEYWORD_PRESETS] || '');
    toast.success(`Mots-clés "${preset}" appliqués`);
  };

  const applyTopicSuggestion = (suggestion: string) => {
    setTopic(suggestion);
    setShowTopicSuggestions(false);
  };

  const createPostFromPreview = () => {
    if (!generatedArticle) return;
    const params = new URLSearchParams({
      title: generatedArticle.title || '',
      excerpt: generatedArticle.excerpt || '',
      content: generatedArticle.content || '',
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
                Créez des articles SEO complets avec Claude Sonnet + images Gemini Flash
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Input Section */}
        <div className="bg-gradient-to-br from-purple-900/40 via-black to-cyan-900/40 border-2 border-purple-500/30 rounded-2xl p-8 mb-8">
          {/* Topic Input */}
          <div className="mb-6">
            <label className="block text-white font-bold text-lg mb-3">
              Sujet de l'article <span className="text-cyan-400">*</span>
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Ex: Comment installer IPTV SMARTERS PRO sur Smart TV Samsung en 2026"
              className="w-full bg-black/60 border-2 border-white/20 rounded-xl px-6 py-4 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              disabled={generating}
            />
            {/* Topic Suggestions Toggle */}
            <button
              type="button"
              onClick={() => setShowTopicSuggestions(!showTopicSuggestions)}
              className="mt-2 text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1 transition-colors"
            >
              {showTopicSuggestions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              {showTopicSuggestions ? 'Masquer les suggestions' : 'Voir les suggestions de sujets SEO'}
            </button>
            
            {showTopicSuggestions && (
              <div className="mt-3 grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-2">
                {TOPIC_SUGGESTIONS.map((suggestion, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => applyTopicSuggestion(suggestion)}
                    className="text-left px-4 py-3 bg-white/5 hover:bg-purple-500/20 border border-white/10 hover:border-purple-500/30 rounded-lg text-white/80 hover:text-white text-sm transition-all"
                    disabled={generating}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Keywords Input */}
          <div className="mb-6">
            <label className="block text-white font-bold text-lg mb-3">
              Mots-clés SEO <span className="text-white/40">(optionnel)</span>
            </label>
            <input
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Ex: IPTV Smart TV, installation IPTV, meilleur IPTV 2026, streaming HD"
              className="w-full bg-black/60 border-2 border-white/20 rounded-xl px-6 py-4 text-white text-lg placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
              disabled={generating}
            />
            
            {/* Keyword Presets */}
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.keys(KEYWORD_PRESETS).map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => applyKeywordPreset(preset)}
                  className="px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 text-cyan-300 rounded-full text-xs font-medium transition-all"
                  disabled={generating}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Options */}
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="mb-4 text-white/60 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            Options avancées
          </button>

          {showAdvanced && (
            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl space-y-4">
              {/* Model Selection */}
              <div>
                <label className="block text-white font-semibold mb-2">Modèle IA pour l'article</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    { id: 'claude', label: 'Claude Sonnet', desc: 'Recommandé' },
                    { id: 'opus', label: 'Claude Opus', desc: 'Plus créatif' },
                    { id: 'sonnet', label: 'Claude Sonnet 4', desc: 'Dernière version' },
                    { id: 'gpt', label: 'GPT-4o', desc: 'Alternative' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setModel(m.id as any)}
                      className={`p-3 rounded-lg border text-left transition-all ${
                        model === m.id
                          ? 'border-purple-500 bg-purple-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-white/60 hover:border-white/30'
                      }`}
                    >
                      <div className="font-semibold text-sm">{m.label}</div>
                      <div className="text-xs opacity-60">{m.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles */}
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={generateImage}
                    onChange={(e) => setGenerateImage(e.target.checked)}
                    className="w-5 h-5 bg-white/5 border-white/10 rounded text-cyan-500 focus:ring-2 focus:ring-cyan-500"
                  />
                  <span className="text-white text-sm">
                    <ImageIcon className="w-4 h-4 inline mr-1" />
                    Générer une image avec Gemini Flash
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoPublish}
                    onChange={(e) => setAutoPublish(e.target.checked)}
                    className="w-5 h-5 bg-white/5 border-white/10 rounded text-green-500 focus:ring-2 focus:ring-green-500"
                  />
                  <span className="text-white text-sm">
                    <Zap className="w-4 h-4 inline mr-1" />
                    Publier automatiquement
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Full Generation Button */}
            <button
              onClick={handleFullGenerate}
              disabled={generating || !topic.trim()}
              className="flex-1 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-600 hover:from-purple-500 hover:via-fuchsia-500 hover:to-cyan-500 text-white font-black text-xl py-5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_50px_rgba(168,85,247,0.4)] hover:shadow-[0_0_80px_rgba(168,85,247,0.6)] flex items-center justify-center gap-3"
            >
              {generating && mode === 'full' ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="text-base">{generationStep || 'Génération en cours...'}</span>
                </>
              ) : (
                <>
                  <Zap className="w-6 h-6" />
                  GÉNÉRER & PUBLIER
                </>
              )}
            </button>

            {/* Preview Only Button */}
            <button
              onClick={() => { setMode('preview'); handlePreviewGenerate(); }}
              disabled={generating || !topic.trim()}
              className="sm:w-auto px-8 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-lg py-5 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {generating && mode === 'preview' ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <FileText className="w-5 h-5" />
              )}
              Aperçu
            </button>
          </div>

          {generating && (
            <div className="mt-4 flex items-center gap-3">
              <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse" style={{ width: '60%' }} />
              </div>
              <span className="text-white/50 text-sm whitespace-nowrap">{generationStep}</span>
            </div>
          )}
        </div>

        {/* Success Result - Full Generation */}
        {generatedPost && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Success Banner */}
            <div className="bg-green-500/10 border-2 border-green-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h2 className="text-white font-bold text-xl">Article Publié avec Succès !</h2>
                  <p className="text-white/60 text-sm">L'article est maintenant en ligne et sera indexé dans le sitemap automatiquement</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-white/50 text-xs uppercase mb-1">Titre</div>
                  <div className="text-white font-semibold">{generatedPost.title}</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-white/50 text-xs uppercase mb-1">URL</div>
                  <div className="text-cyan-400 font-mono text-sm">/blog/{generatedPost.slug}</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-white/50 text-xs uppercase mb-1">Catégorie</div>
                  <div className="text-purple-400 font-semibold">{generatedPost.category}</div>
                </div>
                <div className="bg-black/30 rounded-lg p-4">
                  <div className="text-white/50 text-xs uppercase mb-1">Modèle IA</div>
                  <div className="text-white/80 text-sm">{generatedPost.modelUsed}</div>
                </div>
              </div>

              {generatedPost.suggestedKeywords && generatedPost.suggestedKeywords.length > 0 && (
                <div className="mt-4">
                  <div className="text-white/50 text-xs uppercase mb-2">Mots-clés SEO</div>
                  <div className="flex flex-wrap gap-2">
                    {generatedPost.suggestedKeywords.map((kw: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-xs">
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Links */}
              <div className="flex flex-wrap gap-3 mt-6">
                <Link
                  href={`/blog/${generatedPost.slug}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 text-cyan-300 rounded-lg transition-all text-sm font-semibold"
                >
                  <ExternalLink className="w-4 h-4" />
                  Voir l'article
                </Link>
                <button
                  onClick={() => { setGeneratedPost(null); setTopic(''); setKeywords(''); }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 rounded-lg transition-all text-sm font-semibold"
                >
                  <RotateCcw className="w-4 h-4" />
                  Générer un autre article
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Preview Result */}
        {generatedArticle && !generatedPost && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex gap-4 mb-6">
              <button
                onClick={createPostFromPreview}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
              >
                <ArrowRight className="w-6 h-6" />
                Créer l'article avec ce contenu
              </button>
            </div>

            {/* Title */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide">Titre SEO</h3>
                <button onClick={() => copyToClipboard(generatedArticle.title)} className="p-2 hover:bg-white/10 rounded-lg transition-colors" title="Copier">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/60" />}
                </button>
              </div>
              <p className="text-white text-xl font-bold leading-relaxed">{generatedArticle.title}</p>
              <p className="text-white/40 text-sm mt-2">{generatedArticle.title?.length || 0} caractères</p>
            </div>

            {/* Meta Description */}
            {generatedArticle.metaDescription && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide">Meta Description</h3>
                  <button onClick={() => copyToClipboard(generatedArticle.metaDescription)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/60" />}
                  </button>
                </div>
                <p className="text-white/90 leading-relaxed">{generatedArticle.metaDescription}</p>
                <p className="text-white/40 text-sm mt-2">{generatedArticle.metaDescription.length} caractères</p>
              </div>
            )}

            {/* Keywords */}
            {generatedArticle.suggestedKeywords?.length > 0 && (
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide mb-3">Mots-clés SEO</h3>
                <div className="flex flex-wrap gap-2">
                  {generatedArticle.suggestedKeywords.map((kw: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-300 rounded-full text-sm font-medium">{kw}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Content Preview */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide">Contenu de l'article</h3>
                <button onClick={() => copyToClipboard(generatedArticle.content)} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-white/60" />}
                </button>
              </div>
              <div
                className="prose prose-invert max-w-none prose-headings:text-white prose-p:text-white/80 prose-strong:text-white prose-ul:text-white/80 prose-li:text-white/80"
                dangerouslySetInnerHTML={{ __html: generatedArticle.content }}
              />
            </div>

            <button
              onClick={createPostFromPreview}
              className="w-full bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 text-white font-bold text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(6,182,212,0.4)]"
            >
              <ArrowRight className="w-6 h-6" />
              Créer l'article avec ce contenu
            </button>
          </div>
        )}

        {/* Recently Generated Posts */}
        {recentPosts.length > 0 && !generating && (
          <div className="mt-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6">
            <h3 className="text-white font-bold text-lg mb-4">Articles générés cette session</h3>
            <div className="space-y-3">
              {recentPosts.map((post, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate">{post.title}</div>
                    <div className="text-white/40 text-sm">/blog/{post.slug}</div>
                  </div>
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className="ml-3 p-2 hover:bg-white/10 rounded-lg transition-colors text-cyan-400"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How It Works */}
        {!generatedArticle && !generatedPost && !generating && (
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-8">
            <h3 className="text-white font-bold text-xl mb-4">
              Comment fonctionne la génération IA ?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">1</span>
                  <div>
                    <strong className="text-white">Choisissez un sujet</strong>
                    <p className="text-white/60 text-sm mt-1">Entrez votre sujet ou choisissez parmi nos suggestions SEO optimisées</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">2</span>
                  <div>
                    <strong className="text-white">Claude Sonnet rédige l'article</strong>
                    <p className="text-white/60 text-sm mt-1">Article SEO de 2000-3500 mots, optimisé pour vos mots-clés IPTV</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-bold text-sm">3</span>
                  <div>
                    <strong className="text-white">Gemini Flash crée l'image</strong>
                    <p className="text-white/60 text-sm mt-1">Image de couverture professionnelle générée automatiquement</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">4</span>
                  <div>
                    <strong className="text-white">Publication automatique</strong>
                    <p className="text-white/60 text-sm mt-1">L'article est publié et ajouté au sitemap Google instantanément</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-300 text-sm">
                <strong>Sitemap automatique :</strong> Chaque article publié apparaît automatiquement dans le sitemap.xml 
                et sera indexé par Google pour améliorer votre référencement sur les mots-clés IPTV ciblés.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
