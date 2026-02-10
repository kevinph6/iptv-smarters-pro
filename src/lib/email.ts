/**
 * Email Service
 * 
 * Sends branded HTML emails with IPTV credentials after successful payment.
 * Uses SMTP configuration from payment settings or environment variables.
 */

import nodemailer from 'nodemailer';

export interface EmailConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  fromName: string;
  fromEmail: string;
}

export interface IPTVCredentials {
  username: string;
  password: string;
  serverUrl: string;
  playlistUrl: string;
  expDate: string;
}

export interface OrderEmailData {
  orderNumber: string;
  customerEmail: string;
  productTitle: string;
  amount: string;
  currency: string;
  credentials: IPTVCredentials;
}

/**
 * Get email configuration from payment settings
 */
export function getEmailConfig(settings: Record<string, string>): EmailConfig | null {
  const host = settings['smtp_host'] || process.env.SMTP_HOST;
  const port = settings['smtp_port'] || process.env.SMTP_PORT;
  const user = settings['smtp_user'] || process.env.SMTP_USER;
  const password = settings['smtp_password'] || process.env.SMTP_PASSWORD;
  const fromName = settings['smtp_from_name'] || 'IPTV SMARTERS PRO';
  const fromEmail = settings['smtp_from_email'] || user;

  if (!host || !port || !user || !password) {
    console.error('[Email] Missing SMTP configuration');
    return null;
  }

  return {
    host,
    port: parseInt(port, 10),
    user,
    password,
    fromName,
    fromEmail: fromEmail || user,
  };
}

/**
 * Create SMTP transport
 */
function createTransport(config: EmailConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.password,
    },
  });
}

/**
 * Send IPTV credentials email to customer
 */
export async function sendCredentialsEmail(
  emailConfig: EmailConfig,
  data: OrderEmailData
): Promise<boolean> {
  try {
    const transport = createTransport(emailConfig);
    const html = generateCredentialsHTML(data);

    await transport.sendMail({
      from: `"${emailConfig.fromName}" <${emailConfig.fromEmail}>`,
      to: data.customerEmail,
      subject: `🎉 C'est activé ! Vos accès IPTV Smarters Pro sont prêts 📺`,
      html,
    });

    console.log(`[Email] Credentials sent to ${data.customerEmail} for order ${data.orderNumber}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send credentials:', error);
    return false;
  }
}

/**
 * Generate branded HTML email template for IPTV credentials
 */
function generateCredentialsHTML(data: OrderEmailData): string {
  const expDate = new Date(data.credentials.expDate).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre abonnement IPTV est activé</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050510; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;">
  <div style="max-width: 620px; margin: 0 auto; padding: 24px 16px;">

    <!-- Preheader (hidden text for email clients) -->
    <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #050510;">
      Vos identifiants IPTV sont prêts ! Connectez-vous maintenant et profitez de +18 000 chaînes en direct, films et séries.
    </div>
    
    <!-- Header with gradient -->
    <div style="text-align: center; padding: 44px 24px 36px; background: linear-gradient(145deg, #4f46e5 0%, #7c3aed 35%, #06b6d4 100%); border-radius: 20px 20px 0 0; position: relative;">
      <div style="font-size: 42px; margin-bottom: 8px;">📺</div>
      <h1 style="color: #ffffff; font-size: 26px; font-weight: 900; margin: 0 0 6px 0; letter-spacing: -0.5px;">
        IPTV Smarters Pro
      </h1>
      <div style="display: inline-block; background: rgba(255,255,255,0.2); backdrop-filter: blur(10px); padding: 6px 18px; border-radius: 50px; margin-top: 10px;">
        <span style="color: #ffffff; font-size: 14px; font-weight: 600;">✅ Abonnement activé avec succès !</span>
      </div>
    </div>

    <!-- Main Content -->
    <div style="background-color: #0f0f1a; padding: 0; border-left: 1px solid rgba(124,58,237,0.2); border-right: 1px solid rgba(124,58,237,0.2);">

      <!-- Welcome message -->
      <div style="padding: 32px 28px 0;">
        <p style="color: #e2e8f0; font-size: 16px; line-height: 1.6; margin: 0 0 4px 0;">
          Bonjour 👋
        </p>
        <p style="color: #94a3b8; font-size: 14px; line-height: 1.7; margin: 0;">
          Merci pour votre confiance ! Votre abonnement IPTV est maintenant <strong style="color: #10b981;">actif et prêt à l'emploi</strong>. 
          Retrouvez ci-dessous tous vos identifiants de connexion.
        </p>
      </div>

      <!-- Order Summary Card -->
      <div style="margin: 24px 28px; background: linear-gradient(135deg, rgba(16,185,129,0.08) 0%, rgba(6,182,212,0.08) 100%); border: 1px solid rgba(16,185,129,0.2); border-radius: 14px; padding: 20px;">
        <div style="display: flex; align-items: center; margin-bottom: 14px;">
          <span style="font-size: 18px; margin-right: 8px;">🧾</span>
          <h2 style="color: #ffffff; font-size: 15px; font-weight: 700; margin: 0;">
            Récapitulatif de commande
          </h2>
        </div>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #64748b; padding: 8px 0; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.05);">📦 Produit</td>
            <td style="color: #f1f5f9; padding: 8px 0; font-size: 13px; text-align: right; font-weight: 600; border-bottom: 1px solid rgba(255,255,255,0.05);">${data.productTitle}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding: 8px 0; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.05);">🔢 Commande</td>
            <td style="color: #f1f5f9; padding: 8px 0; font-size: 13px; text-align: right; font-weight: 600; font-family: 'Courier New', monospace; border-bottom: 1px solid rgba(255,255,255,0.05);">${data.orderNumber}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding: 8px 0; font-size: 13px; border-bottom: 1px solid rgba(255,255,255,0.05);">💰 Montant payé</td>
            <td style="color: #f1f5f9; padding: 8px 0; font-size: 13px; text-align: right; font-weight: 700; border-bottom: 1px solid rgba(255,255,255,0.05);">${data.amount} ${data.currency}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding: 8px 0; font-size: 13px;">📅 Valide jusqu'au</td>
            <td style="color: #10b981; padding: 8px 0; font-size: 13px; text-align: right; font-weight: 700;">${expDate}</td>
          </tr>
        </table>
      </div>

      <!-- ═══════ CREDENTIALS BOX ═══════ -->
      <div style="margin: 0 28px 24px; background: linear-gradient(145deg, #1e1b4b 0%, #172554 50%, #0c4a6e 100%); border: 1px solid rgba(99,102,241,0.3); border-radius: 14px; padding: 28px; position: relative; overflow: hidden;">
        <!-- Glow effect -->
        <div style="position: absolute; top: -40px; right: -40px; width: 120px; height: 120px; background: radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%); border-radius: 50%;"></div>
        
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <span style="font-size: 20px; margin-right: 10px;">🔑</span>
          <h2 style="color: #e0e7ff; font-size: 15px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; margin: 0;">
            Vos Identifiants IPTV
          </h2>
        </div>
        
        <!-- Username -->
        <div style="margin-bottom: 14px;">
          <div style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">👤 Nom d'utilisateur</div>
          <div style="background-color: rgba(15,23,42,0.8); border: 1px solid rgba(56,189,248,0.2); border-radius: 10px; padding: 14px 16px; color: #38bdf8; font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 700; letter-spacing: 1.5px;">
            ${data.credentials.username}
          </div>
        </div>

        <!-- Password -->
        <div style="margin-bottom: 14px;">
          <div style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🔒 Mot de passe</div>
          <div style="background-color: rgba(15,23,42,0.8); border: 1px solid rgba(56,189,248,0.2); border-radius: 10px; padding: 14px 16px; color: #38bdf8; font-family: 'Courier New', Courier, monospace; font-size: 18px; font-weight: 700; letter-spacing: 1.5px;">
            ${data.credentials.password}
          </div>
        </div>

        <!-- Server URL -->
        <div style="margin-bottom: 14px;">
          <div style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">🌐 URL du Serveur</div>
          <div style="background-color: rgba(15,23,42,0.8); border: 1px solid rgba(56,189,248,0.2); border-radius: 10px; padding: 14px 16px; color: #67e8f9; font-family: 'Courier New', Courier, monospace; font-size: 14px; word-break: break-all;">
            ${data.credentials.serverUrl}
          </div>
        </div>

        <!-- M3U Playlist -->
        <div>
          <div style="color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;">📋 Lien Playlist M3U</div>
          <div style="background-color: rgba(15,23,42,0.8); border: 1px solid rgba(56,189,248,0.2); border-radius: 10px; padding: 14px 16px; color: #67e8f9; font-family: 'Courier New', Courier, monospace; font-size: 11px; word-break: break-all; line-height: 1.5;">
            ${data.credentials.playlistUrl}
          </div>
        </div>
      </div>

      <!-- ═══════ SETUP GUIDE ═══════ -->
      <div style="margin: 0 28px 24px; background-color: rgba(15,23,42,0.5); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 24px;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          <span style="font-size: 20px; margin-right: 10px;">🚀</span>
          <h2 style="color: #ffffff; font-size: 16px; font-weight: 700; margin: 0;">
            Installation en 2 minutes
          </h2>
        </div>
        
        <!-- Smart TV -->
        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06);">
          <h3 style="color: #a78bfa; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
            📺 Smart TV (Samsung, LG, Android TV)
          </h3>
          <ol style="color: #cbd5e1; font-size: 13px; line-height: 2; margin: 0; padding-left: 20px;">
            <li>Téléchargez <strong style="color: #fff;">IPTV Smarters Pro</strong> depuis le store</li>
            <li>Sélectionnez <strong style="color: #fff;">"Xtream Codes API"</strong></li>
            <li>Entrez vos identifiants ci-dessus</li>
            <li>🎬 C'est parti, profitez de vos chaînes !</li>
          </ol>
        </div>

        <!-- Mobile -->
        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06);">
          <h3 style="color: #a78bfa; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
            📱 Mobile (Android / iOS)
          </h3>
          <ol style="color: #cbd5e1; font-size: 13px; line-height: 2; margin: 0; padding-left: 20px;">
            <li>Installez IPTV Smarters Pro depuis <strong style="color: #fff;">Google Play / App Store</strong></li>
            <li>Connectez-vous avec vos identifiants</li>
            <li>🍿 Profitez de vos contenus partout !</li>
          </ol>
        </div>

        <!-- Fire TV -->
        <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06);">
          <h3 style="color: #a78bfa; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
            🔥 Amazon Fire TV Stick
          </h3>
          <ol style="color: #cbd5e1; font-size: 13px; line-height: 2; margin: 0; padding-left: 20px;">
            <li>Installez l'application <strong style="color: #fff;">Downloader</strong></li>
            <li>Téléchargez IPTV Smarters Pro</li>
            <li>Entrez vos identifiants et c'est parti ! 🚀</li>
          </ol>
        </div>

        <!-- VLC / M3U -->
        <div>
          <h3 style="color: #a78bfa; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
            🖥️ VLC / Lecteur M3U
          </h3>
          <ol style="color: #cbd5e1; font-size: 13px; line-height: 2; margin: 0; padding-left: 20px;">
            <li>Copiez le <strong style="color: #fff;">lien M3U</strong> ci-dessus</li>
            <li>Ouvrez VLC &gt; Média &gt; Ouvrir un flux réseau</li>
            <li>Collez le lien et validez ▶️</li>
          </ol>
        </div>
      </div>

      <!-- ═══════ FEATURES HIGHLIGHT ═══════ -->
      <div style="margin: 0 28px 24px;">
        <table style="width: 100%; border-collapse: separate; border-spacing: 8px;">
          <tr>
            <td style="width: 33%; background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.15); border-radius: 12px; padding: 16px; text-align: center; vertical-align: top;">
              <div style="font-size: 24px; margin-bottom: 6px;">🏆</div>
              <div style="color: #e2e8f0; font-size: 12px; font-weight: 700;">+18 000</div>
              <div style="color: #64748b; font-size: 10px;">Chaînes HD/4K</div>
            </td>
            <td style="width: 33%; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.15); border-radius: 12px; padding: 16px; text-align: center; vertical-align: top;">
              <div style="font-size: 24px; margin-bottom: 6px;">⚡</div>
              <div style="color: #e2e8f0; font-size: 12px; font-weight: 700;">Anti-freeze</div>
              <div style="color: #64748b; font-size: 10px;">Serveurs stables</div>
            </td>
            <td style="width: 33%; background: rgba(234,179,8,0.1); border: 1px solid rgba(234,179,8,0.15); border-radius: 12px; padding: 16px; text-align: center; vertical-align: top;">
              <div style="font-size: 24px; margin-bottom: 6px;">🎬</div>
              <div style="color: #e2e8f0; font-size: 12px; font-weight: 700;">VOD incluse</div>
              <div style="color: #64748b; font-size: 10px;">Films &amp; Séries</div>
            </td>
          </tr>
        </table>
      </div>

      <!-- ═══════ IMPORTANT NOTICE ═══════ -->
      <div style="margin: 0 28px 28px; background: linear-gradient(135deg, rgba(251,191,36,0.08) 0%, rgba(245,158,11,0.08) 100%); border: 1px solid rgba(251,191,36,0.2); border-radius: 14px; padding: 18px 20px;">
        <div style="display: flex; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 16px; margin-right: 8px;">⚠️</span>
          <h3 style="color: #fbbf24; font-size: 13px; font-weight: 700; margin: 0;">À garder précieusement</h3>
        </div>
        <ul style="color: #fde68a; font-size: 12px; line-height: 2; margin: 0; padding-left: 18px;">
          <li>🔐 Conservez cet email — il contient vos identifiants de connexion</li>
          <li>🚫 Ne partagez pas vos accès pour éviter toute interruption</li>
          <li>💬 Besoin d'aide ? Notre support est disponible <strong>24h/24, 7j/7</strong></li>
        </ul>
      </div>

    </div>

    <!-- Footer -->
    <div style="background: linear-gradient(180deg, #0f0f1a 0%, #050510 100%); padding: 28px 24px; border-radius: 0 0 20px 20px; text-align: center; border-left: 1px solid rgba(124,58,237,0.2); border-right: 1px solid rgba(124,58,237,0.2); border-bottom: 1px solid rgba(124,58,237,0.2);">
      <p style="color: #a78bfa; font-size: 14px; font-weight: 700; margin: 0 0 6px 0;">
        IPTV Smarters Pro
      </p>
      <p style="color: #475569; font-size: 12px; margin: 0 0 12px 0;">
        Le meilleur service IPTV premium en France 🇫🇷
      </p>
      <div style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 16px; margin-top: 4px;">
        <p style="color: #334155; font-size: 10px; margin: 0; line-height: 1.6;">
          Cet email a été envoyé automatiquement suite à votre achat.<br>
          Pour toute question, contactez notre support via le site.
        </p>
      </div>
    </div>

  </div>
</body>
</html>`;
}
