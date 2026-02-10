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
      subject: `Votre abonnement IPTV SMARTERS PRO - ${data.productTitle} est activé !`,
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
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="text-align: center; padding: 40px 20px; background: linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%); border-radius: 16px 16px 0 0;">
      <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; margin: 0 0 8px 0; letter-spacing: -0.5px;">
        IPTV SMARTERS PRO
      </h1>
      <p style="color: rgba(255,255,255,0.8); font-size: 14px; margin: 0;">
        Votre abonnement est maintenant actif !
      </p>
    </div>

    <!-- Main Content -->
    <div style="background-color: #111111; padding: 32px 24px; border-left: 1px solid #222; border-right: 1px solid #222;">
      
      <!-- Success Badge -->
      <div style="text-align: center; margin-bottom: 32px;">
        <div style="display: inline-block; background: linear-gradient(135deg, #10b981, #059669); color: white; padding: 8px 24px; border-radius: 50px; font-size: 14px; font-weight: 700;">
          Paiement confirme - Commande #${data.orderNumber}
        </div>
      </div>

      <!-- Order Summary -->
      <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #ffffff; font-size: 16px; font-weight: 700; margin: 0 0 12px 0;">
          Resume de votre commande
        </h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #888; padding: 6px 0; font-size: 14px;">Produit</td>
            <td style="color: #fff; padding: 6px 0; font-size: 14px; text-align: right; font-weight: 600;">${data.productTitle}</td>
          </tr>
          <tr>
            <td style="color: #888; padding: 6px 0; font-size: 14px;">Montant</td>
            <td style="color: #fff; padding: 6px 0; font-size: 14px; text-align: right; font-weight: 600;">${data.amount} ${data.currency}</td>
          </tr>
          <tr>
            <td style="color: #888; padding: 6px 0; font-size: 14px;">Valide jusqu'au</td>
            <td style="color: #10b981; padding: 6px 0; font-size: 14px; text-align: right; font-weight: 600;">${expDate}</td>
          </tr>
        </table>
      </div>

      <!-- Credentials Box -->
      <div style="background: linear-gradient(135deg, #1e1b4b 0%, #0c4a6e 100%); border: 1px solid #4c1d95; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
        <h2 style="color: #c4b5fd; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 16px 0;">
          Vos identifiants IPTV
        </h2>
        
        <div style="margin-bottom: 12px;">
          <div style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">Nom d'utilisateur</div>
          <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 12px; color: #38bdf8; font-family: 'Courier New', monospace; font-size: 16px; font-weight: 700; letter-spacing: 0.5px;">
            ${data.credentials.username}
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <div style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">Mot de passe</div>
          <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 12px; color: #38bdf8; font-family: 'Courier New', monospace; font-size: 16px; font-weight: 700; letter-spacing: 0.5px;">
            ${data.credentials.password}
          </div>
        </div>

        <div style="margin-bottom: 12px;">
          <div style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">URL du serveur</div>
          <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 12px; color: #38bdf8; font-family: 'Courier New', monospace; font-size: 14px; word-break: break-all;">
            ${data.credentials.serverUrl}
          </div>
        </div>

        <div>
          <div style="color: #94a3b8; font-size: 12px; margin-bottom: 4px;">Lien Playlist M3U</div>
          <div style="background-color: #0f172a; border: 1px solid #334155; border-radius: 8px; padding: 12px; color: #38bdf8; font-family: 'Courier New', monospace; font-size: 12px; word-break: break-all;">
            ${data.credentials.playlistUrl}
          </div>
        </div>
      </div>

      <!-- Setup Instructions -->
      <div style="background-color: #1a1a1a; border: 1px solid #333; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
        <h2 style="color: #ffffff; font-size: 16px; font-weight: 700; margin: 0 0 16px 0;">
          Comment configurer votre IPTV
        </h2>
        
        <div style="margin-bottom: 16px;">
          <h3 style="color: #c084fc; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">
            Sur Smart TV (Samsung, LG, Android TV)
          </h3>
          <ol style="color: #ccc; font-size: 13px; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Telechargez l'application IPTV Smarters Pro depuis le store</li>
            <li>Ouvrez l'application et selectionnez "Xtream Codes API"</li>
            <li>Entrez vos identifiants (nom d'utilisateur + mot de passe + URL serveur)</li>
            <li>Profitez de vos chaines !</li>
          </ol>
        </div>

        <div style="margin-bottom: 16px;">
          <h3 style="color: #c084fc; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">
            Sur Mobile (Android / iOS)
          </h3>
          <ol style="color: #ccc; font-size: 13px; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Installez IPTV Smarters Pro depuis Google Play / App Store</li>
            <li>Connectez-vous avec vos identifiants ci-dessus</li>
          </ol>
        </div>

        <div style="margin-bottom: 16px;">
          <h3 style="color: #c084fc; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">
            Sur Fire TV Stick
          </h3>
          <ol style="color: #ccc; font-size: 13px; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Installez l'application Downloader</li>
            <li>Telechargez IPTV Smarters Pro</li>
            <li>Entrez vos identifiants et c'est parti !</li>
          </ol>
        </div>

        <div>
          <h3 style="color: #c084fc; font-size: 14px; font-weight: 600; margin: 0 0 8px 0;">
            Via Playlist M3U (VLC, etc.)
          </h3>
          <ol style="color: #ccc; font-size: 13px; line-height: 1.8; margin: 0; padding-left: 20px;">
            <li>Copiez le lien M3U ci-dessus</li>
            <li>Ouvrez VLC ou votre lecteur prefere</li>
            <li>Collez le lien dans "Ouvrir un flux reseau"</li>
          </ol>
        </div>
      </div>

      <!-- Important Notes -->
      <div style="background-color: #422006; border: 1px solid #92400e; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
        <h3 style="color: #fbbf24; font-size: 14px; font-weight: 700; margin: 0 0 8px 0;">
          Important
        </h3>
        <ul style="color: #fcd34d; font-size: 13px; line-height: 1.8; margin: 0; padding-left: 20px;">
          <li>Conservez cet email precieusement avec vos identifiants</li>
          <li>Ne partagez pas vos identifiants avec d'autres personnes</li>
          <li>En cas de probleme, contactez notre support 24/7</li>
        </ul>
      </div>

    </div>

    <!-- Footer -->
    <div style="background-color: #111111; padding: 24px; border-top: 1px solid #333; border-radius: 0 0 16px 16px; text-align: center; border-left: 1px solid #222; border-right: 1px solid #222; border-bottom: 1px solid #222;">
      <p style="color: #666; font-size: 12px; margin: 0 0 8px 0;">
        IPTV SMARTERS PRO - Votre service IPTV premium
      </p>
      <p style="color: #666; font-size: 11px; margin: 0;">
        Cet email a ete envoye automatiquement suite a votre achat. 
        Pour toute question, contactez notre support.
      </p>
    </div>

  </div>
</body>
</html>`;
}
