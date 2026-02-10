"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, Wallet, Server, Mail, Package, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { useSession, clearSessionFromStorage } from '@/lib/auth-client';

// Exact provider names from PayGate.to API docs:
// https://documenter.getpostman.com/view/14826208/2sA3Bj9aBi
const PAYGATE_PROVIDERS = [
  { value: 'multi', label: 'Multi-provider (recommande - tous les moyens de paiement)' },
  { value: 'stripe', label: 'Stripe (USD uniquement)' },
  { value: 'revolut', label: 'Revolut' },
  { value: 'moonpay', label: 'MoonPay' },
  { value: 'banxa', label: 'Banxa' },
  { value: 'transak', label: 'Transak' },
  { value: 'particle', label: 'Particle' },
  { value: 'guardarian', label: 'Guardarian' },
  { value: 'rampnetwork', label: 'Ramp Network (USD uniquement)' },
  { value: 'mercuryo', label: 'Mercuryo' },
  { value: 'utorg', label: 'Utorg' },
  { value: 'transfi', label: 'TransFi (USD uniquement)' },
  { value: 'topper', label: 'Topper' },
  { value: 'sardine', label: 'Sardine' },
  { value: 'upi', label: 'UPI (INR uniquement)' },
  { value: 'robinhood', label: 'Robinhood (USD uniquement)' },
  { value: 'coinbase', label: 'Coinbase' },
  { value: 'unlimit', label: 'Unlimit' },
  { value: 'bitnovo', label: 'Bitnovo' },
  { value: 'simplex', label: 'Simplex' },
  { value: 'interac', label: 'Interac (CAD uniquement)' },
  { value: 'binance', label: 'Binance' },
];

const PRODUCT_SLUGS = [
  { slug: 'test-iptv-3-mois', label: 'TEST 3 Mois ($5)' },
  { slug: 'abonnement-iptv-hd-3-mois', label: 'IPTV HD 3 Mois' },
  { slug: 'abonnement-iptv-hd-6-mois', label: 'IPTV HD 6 Mois' },
  { slug: 'abonnement-iptv-hd-12-mois', label: 'IPTV HD 12 Mois' },
  { slug: 'abonnement-iptv-hd-24-mois', label: 'IPTV HD 24 Mois' },
  { slug: 'abonnement-iptv-premium-4k-3-mois', label: 'Premium 4K 3 Mois' },
  { slug: 'abonnement-iptv-premium-4k-6-mois', label: 'Premium 4K 6 Mois' },
  { slug: 'abonnement-iptv-premium-4k-12-mois', label: 'Premium 4K 12 Mois' },
  { slug: 'abonnement-iptv-premium-4k-24-mois', label: 'Premium 4K 24 Mois' },
];

export default function AdminSettingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push('/login');
    }
  }, [session, isPending, router]);

  useEffect(() => {
    if (session?.user) {
      fetchSettings();
    }
  }, [session]);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings');
      if (response.status === 401) {
        clearSessionFromStorage();
        router.push('/login');
        return;
      }
      if (response.ok) {
        const data = await response.json().catch(() => ({}));
        if (data && typeof data === 'object' && !Array.isArray(data) && !('error' in data)) {
          setSettings(data as Record<string, string>);
        }
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast.error('Erreur lors du chargement des parametres');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        toast.success('Parametres sauvegardes avec succes');
      } else {
        const data = await response.json().catch(() => ({}));
        const msg = data && typeof data === 'object' && 'error' in data ? String(data.error) : 'Erreur lors de la sauvegarde';
        toast.error(msg);
      }
    } catch {
      toast.error('Erreur de connexion');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: string, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const toggleSecret = (key: string) => {
    setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (isPending || !session?.user || loading) {
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
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/admin"
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-black text-white">Parametres</h1>
              <p className="text-white/60 text-sm">Configuration paiement, IPTV et email</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        
        {/* PayGate.to Configuration */}
        <SettingsSection
          icon={<Wallet className="w-5 h-5 text-cyan-400" />}
          title="PayGate.to - Paiement"
          description="Configuration de la passerelle de paiement"
        >
          <SettingsField
            label="Adresse USDC Wallet (Polygon)"
            description="Votre adresse de portefeuille USDC (Polygon) pour recevoir les paiements"
            value={settings['paygate_usdc_wallet'] || ''}
            onChange={(v) => updateSetting('paygate_usdc_wallet', v)}
            placeholder="0x..."
          />
          <SettingsField
            label="Fournisseur de paiement"
            description="Choisissez le mode de paiement pour vos clients"
            value={settings['paygate_provider'] || 'multi'}
            onChange={(v) => updateSetting('paygate_provider', v)}
            type="select"
            options={PAYGATE_PROVIDERS}
          />
          <SettingsField
            label="Devise"
            description="Devise des paiements"
            value={settings['paygate_currency'] || 'EUR'}
            onChange={(v) => updateSetting('paygate_currency', v)}
            type="select"
            options={[
              { value: 'EUR', label: 'EUR - Euro' },
              { value: 'USD', label: 'USD - Dollar US' },
              { value: 'CAD', label: 'CAD - Dollar Canadien' },
              { value: 'GBP', label: 'GBP - Livre Sterling' },
            ]}
          />
        </SettingsSection>

        {/* MegaOTT Configuration */}
        <SettingsSection
          icon={<Server className="w-5 h-5 text-purple-400" />}
          title="MegaOTT - Panel IPTV"
          description="Configuration de l'API MegaOTT pour la creation automatique d'abonnements"
        >
          <SettingsField
            label="URL de l'API MegaOTT"
            description="L'URL de base de l'API MegaOTT (ex: https://megaott.net/api/v1)"
            value={settings['megaott_api_url'] || ''}
            onChange={(v) => updateSetting('megaott_api_url', v)}
            placeholder="https://megaott.net/api/v1"
          />
          <div className="relative">
            <SettingsField
              label="Token API MegaOTT"
              description="Votre token d'API avec les permissions subscription_create et subscription_read"
              value={settings['megaott_api_token'] || ''}
              onChange={(v) => updateSetting('megaott_api_token', v)}
              placeholder="Votre token API"
              type={showSecrets['megaott_api_token'] ? 'text' : 'password'}
            />
            <button
              onClick={() => toggleSecret('megaott_api_token')}
              className="absolute right-3 top-9 p-1 text-white/40 hover:text-white/60"
            >
              {showSecrets['megaott_api_token'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <SettingsField
            label="Package par defaut"
            description="ID du package MegaOTT par defaut (si pas de mapping specifique)"
            value={settings['megaott_default_package'] || ''}
            onChange={(v) => updateSetting('megaott_default_package', v)}
            placeholder="ID du package"
          />
          <SettingsField
            label="Template ID"
            description="ID du template MegaOTT (optionnel). Laissez vide si non utilise."
            value={settings['megaott_template_id'] || ''}
            onChange={(v) => updateSetting('megaott_template_id', v)}
            placeholder="ex: 1"
          />
          <SettingsField
            label="Pays force (forced_country)"
            description="Code pays pour restreindre l'acces, ou ALL pour aucune restriction"
            value={settings['megaott_forced_country'] || 'ALL'}
            onChange={(v) => updateSetting('megaott_forced_country', v)}
            type="select"
            options={[
              { value: 'ALL', label: 'ALL - Tous les pays (pas de restriction)' },
              { value: 'FR', label: 'FR - France' },
              { value: 'US', label: 'US - Etats-Unis' },
              { value: 'CA', label: 'CA - Canada' },
              { value: 'GB', label: 'GB - Royaume-Uni' },
              { value: 'BE', label: 'BE - Belgique' },
              { value: 'CH', label: 'CH - Suisse' },
              { value: 'DE', label: 'DE - Allemagne' },
              { value: 'ES', label: 'ES - Espagne' },
              { value: 'IT', label: 'IT - Italie' },
              { value: 'NL', label: 'NL - Pays-Bas' },
              { value: 'PT', label: 'PT - Portugal' },
              { value: 'MA', label: 'MA - Maroc' },
              { value: 'DZ', label: 'DZ - Algerie' },
              { value: 'TN', label: 'TN - Tunisie' },
            ]}
          />
        </SettingsSection>

        {/* Product-to-Package Mapping */}
        <SettingsSection
          icon={<Package className="w-5 h-5 text-amber-400" />}
          title="Mapping Produit - Package"
          description="Associez chaque produit a un ID de package MegaOTT"
        >
          {PRODUCT_SLUGS.map((product) => (
            <SettingsField
              key={product.slug}
              label={product.label}
              value={settings[`megaott_package_${product.slug}`] || ''}
              onChange={(v) => updateSetting(`megaott_package_${product.slug}`, v)}
              placeholder="ID du package MegaOTT"
            />
          ))}
        </SettingsSection>

        {/* SMTP Configuration */}
        <SettingsSection
          icon={<Mail className="w-5 h-5 text-green-400" />}
          title="Email - SMTP"
          description="Configuration SMTP pour l'envoi des emails de confirmation"
        >
          <SettingsField
            label="Hote SMTP"
            value={settings['smtp_host'] || ''}
            onChange={(v) => updateSetting('smtp_host', v)}
            placeholder="smtp.example.com"
          />
          <SettingsField
            label="Port SMTP"
            value={settings['smtp_port'] || ''}
            onChange={(v) => updateSetting('smtp_port', v)}
            placeholder="587"
          />
          <SettingsField
            label="Utilisateur SMTP"
            value={settings['smtp_user'] || ''}
            onChange={(v) => updateSetting('smtp_user', v)}
            placeholder="votre@email.com"
          />
          <div className="relative">
            <SettingsField
              label="Mot de passe SMTP"
              value={settings['smtp_password'] || ''}
              onChange={(v) => updateSetting('smtp_password', v)}
              placeholder="Mot de passe"
              type={showSecrets['smtp_password'] ? 'text' : 'password'}
            />
            <button
              onClick={() => toggleSecret('smtp_password')}
              className="absolute right-3 top-9 p-1 text-white/40 hover:text-white/60"
            >
              {showSecrets['smtp_password'] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <SettingsField
            label="Nom de l'expediteur"
            value={settings['smtp_from_name'] || ''}
            onChange={(v) => updateSetting('smtp_from_name', v)}
            placeholder="IPTV SMARTERS PRO"
          />
          <SettingsField
            label="Email de l'expediteur"
            value={settings['smtp_from_email'] || ''}
            onChange={(v) => updateSetting('smtp_from_email', v)}
            placeholder="noreply@example.com"
          />
        </SettingsSection>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-black/80 backdrop-blur-lg border-t border-white/10 -mx-6 px-6 py-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {saving ? 'Sauvegarde en cours...' : 'Sauvegarder les parametres'}
          </button>
        </div>
      </div>
    </div>
  );
}

// Section component
function SettingsSection({ icon, title, description, children }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
        {icon}
        <div>
          <h2 className="text-white font-bold">{title}</h2>
          <p className="text-white/50 text-xs">{description}</p>
        </div>
      </div>
      <div className="p-6 space-y-4">
        {children}
      </div>
    </div>
  );
}

// Field component
function SettingsField({ label, description, value, onChange, placeholder, type = 'text', options }: {
  label: string;
  description?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  options?: { value: string; label: string }[];
}) {
  if (type === 'select' && options) {
    return (
      <div>
        <label className="block text-white/80 text-sm font-semibold mb-1">{label}</label>
        {description && <p className="text-white/40 text-xs mb-2">{description}</p>}
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all appearance-none"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-black text-white">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div>
      <label className="block text-white/80 text-sm font-semibold mb-1">{label}</label>
      {description && <p className="text-white/40 text-xs mb-2">{description}</p>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/30 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 focus:outline-none transition-all"
      />
    </div>
  );
}
