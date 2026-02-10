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
  customerName: string;
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
  const fromName = settings['smtp_from_name'] || 'IPTV Smarters Pro';
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
      subject: `Votre abonnement IPTV est activ\u00e9 \u2014 ${data.productTitle}`,
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

  const firstName = data.customerName?.split(' ')[0] || '';

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Votre abonnement IPTV est activ\u00e9</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f4f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 600px; margin: 0 auto; padding: 32px 16px;">

    <!-- Preheader -->
    <div style="display: none; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #f4f4f7;">
      ${firstName}, votre abonnement ${data.productTitle} est actif. Retrouvez vos identifiants de connexion dans cet email.
    </div>

    <!-- Card container -->
    <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">

      <!-- Header -->
      <div style="text-align: center; padding: 40px 32px 32px; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%);">
        <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0 0 8px 0; letter-spacing: -0.3px;">
          IPTV Smarters Pro
        </h1>
        <p style="color: rgba(255,255,255,0.7); font-size: 13px; margin: 0;">
          Votre service IPTV premium
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 32px;">

        <!-- Greeting -->
        <p style="color: #1a1a2e; font-size: 16px; font-weight: 600; margin: 0 0 8px 0;">
          Bonjour${firstName ? ' ' + firstName : ''},
        </p>
        <p style="color: #555; font-size: 14px; line-height: 1.7; margin: 0 0 28px 0;">
          Merci pour votre achat. Votre abonnement <strong style="color: #1a1a2e;">${data.productTitle}</strong> a \u00e9t\u00e9 activ\u00e9 avec succ\u00e8s. Vous trouverez ci-dessous toutes les informations n\u00e9cessaires pour commencer \u00e0 profiter de vos cha\u00eenes.
        </p>

        <!-- Order summary -->
        <div style="background-color: #f8f9fc; border: 1px solid #e8eaf0; border-radius: 10px; padding: 20px; margin-bottom: 28px;">
          <h2 style="color: #1a1a2e; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin: 0 0 16px 0;">
            R\u00e9capitulatif
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="color: #777; padding: 7px 0; font-size: 13px; border-bottom: 1px solid #eee;">Client</td>
              <td style="color: #1a1a2e; padding: 7px 0; font-size: 13px; text-align: right; font-weight: 600; border-bottom: 1px solid #eee;">${data.customerName}</td>
            </tr>
            <tr>
              <td style="color: #777; padding: 7px 0; font-size: 13px; border-bottom: 1px solid #eee;">Forfait</td>
              <td style="color: #1a1a2e; padding: 7px 0; font-size: 13px; text-align: right; font-weight: 600; border-bottom: 1px solid #eee;">${data.productTitle}</td>
            </tr>
            <tr>
              <td style="color: #777; padding: 7px 0; font-size: 13px; border-bottom: 1px solid #eee;">N\u00b0 de commande</td>
              <td style="color: #1a1a2e; padding: 7px 0; font-size: 13px; text-align: right; font-weight: 600; font-family: 'Courier New', monospace; border-bottom: 1px solid #eee;">${data.orderNumber}</td>
            </tr>
            <tr>
              <td style="color: #777; padding: 7px 0; font-size: 13px; border-bottom: 1px solid #eee;">Montant</td>
              <td style="color: #1a1a2e; padding: 7px 0; font-size: 13px; text-align: right; font-weight: 700; border-bottom: 1px solid #eee;">${data.amount} ${data.currency}</td>
            </tr>
            <tr>
              <td style="color: #777; padding: 7px 0; font-size: 13px;">Date d'expiration</td>
              <td style="color: #16a34a; padding: 7px 0; font-size: 13px; text-align: right; font-weight: 700;">${expDate}</td>
            </tr>
          </table>
        </div>

        <!-- Credentials -->
        <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); border-radius: 10px; padding: 24px; margin-bottom: 28px;">
          <h2 style="color: #c7d2fe; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin: 0 0 18px 0;">
            Vos identifiants de connexion
          </h2>

          <div style="margin-bottom: 14px;">
            <div style="color: #a5b4fc; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Nom d'utilisateur</div>
            <div style="background-color: rgba(0,0,0,0.3); border: 1px solid rgba(165,180,252,0.2); border-radius: 8px; padding: 12px 14px; color: #e0e7ff; font-family: 'Courier New', Courier, monospace; font-size: 17px; font-weight: 700; letter-spacing: 1.5px;">
              ${data.credentials.username}
            </div>
          </div>

          <div style="margin-bottom: 14px;">
            <div style="color: #a5b4fc; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Mot de passe</div>
            <div style="background-color: rgba(0,0,0,0.3); border: 1px solid rgba(165,180,252,0.2); border-radius: 8px; padding: 12px 14px; color: #e0e7ff; font-family: 'Courier New', Courier, monospace; font-size: 17px; font-weight: 700; letter-spacing: 1.5px;">
              ${data.credentials.password}
            </div>
          </div>

          <div style="margin-bottom: 14px;">
            <div style="color: #a5b4fc; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">URL du serveur</div>
            <div style="background-color: rgba(0,0,0,0.3); border: 1px solid rgba(165,180,252,0.2); border-radius: 8px; padding: 12px 14px; color: #c7d2fe; font-family: 'Courier New', Courier, monospace; font-size: 13px; word-break: break-all;">
              ${data.credentials.serverUrl}
            </div>
          </div>

          <div>
            <div style="color: #a5b4fc; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px;">Lien Playlist M3U</div>
            <div style="background-color: rgba(0,0,0,0.3); border: 1px solid rgba(165,180,252,0.2); border-radius: 8px; padding: 12px 14px; color: #c7d2fe; font-family: 'Courier New', Courier, monospace; font-size: 11px; word-break: break-all; line-height: 1.5;">
              ${data.credentials.playlistUrl}
            </div>
          </div>
        </div>

        <!-- How to install -->
        <div style="background-color: #f8f9fc; border: 1px solid #e8eaf0; border-radius: 10px; padding: 24px; margin-bottom: 28px;">
          <h2 style="color: #1a1a2e; font-size: 16px; font-weight: 700; margin: 0 0 6px 0;">
            Comment installer et utiliser votre IPTV
          </h2>
          <p style="color: #777; font-size: 13px; margin: 0 0 20px 0;">
            Suivez les instructions correspondant \u00e0 votre appareil. La configuration ne prend que quelques minutes.
          </p>

          <!-- Smart TV -->
          <div style="margin-bottom: 22px; padding-bottom: 20px; border-bottom: 1px solid #e8eaf0;">
            <h3 style="color: #4338ca; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
              Smart TV (Samsung, LG, Android TV)
            </h3>
            <ol style="color: #444; font-size: 13px; line-height: 1.9; margin: 0; padding-left: 18px;">
              <li>T\u00e9l\u00e9chargez <strong>IPTV Smarters Pro</strong> depuis le store de votre t\u00e9l\u00e9viseur</li>
              <li>Ouvrez l'application et s\u00e9lectionnez <strong>\u00ab Xtream Codes API \u00bb</strong></li>
              <li>Saisissez le <strong>nom d'utilisateur</strong>, le <strong>mot de passe</strong> et l'<strong>URL du serveur</strong> fournis ci-dessus</li>
              <li>Validez et profitez de vos cha\u00eenes en direct</li>
            </ol>
          </div>

          <!-- Mobile -->
          <div style="margin-bottom: 22px; padding-bottom: 20px; border-bottom: 1px solid #e8eaf0;">
            <h3 style="color: #4338ca; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
              T\u00e9l\u00e9phone et tablette (Android / iOS)
            </h3>
            <ol style="color: #444; font-size: 13px; line-height: 1.9; margin: 0; padding-left: 18px;">
              <li>Installez <strong>IPTV Smarters Pro</strong> depuis Google Play ou l'App Store</li>
              <li>Choisissez <strong>\u00ab Xtream Codes API \u00bb</strong> comme m\u00e9thode de connexion</li>
              <li>Entrez vos identifiants et connectez-vous</li>
            </ol>
          </div>

          <!-- Fire TV -->
          <div style="margin-bottom: 22px; padding-bottom: 20px; border-bottom: 1px solid #e8eaf0;">
            <h3 style="color: #4338ca; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
              Amazon Fire TV Stick
            </h3>
            <ol style="color: #444; font-size: 13px; line-height: 1.9; margin: 0; padding-left: 18px;">
              <li>Installez l'application <strong>Downloader</strong> depuis l'Amazon Appstore</li>
              <li>T\u00e9l\u00e9chargez et installez IPTV Smarters Pro</li>
              <li>Entrez vos identifiants pour acc\u00e9der \u00e0 vos cha\u00eenes</li>
            </ol>
          </div>

          <!-- MAG Box -->
          <div style="margin-bottom: 22px; padding-bottom: 20px; border-bottom: 1px solid #e8eaf0;">
            <h3 style="color: #4338ca; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
              MAG Box / Formuler
            </h3>
            <ol style="color: #444; font-size: 13px; line-height: 1.9; margin: 0; padding-left: 18px;">
              <li>Acc\u00e9dez aux <strong>param\u00e8tres du portail</strong> de votre bo\u00eetier</li>
              <li>Entrez l'URL du serveur dans le champ Portal URL</li>
              <li>Red\u00e9marrez l'appareil et vos cha\u00eenes se chargeront automatiquement</li>
            </ol>
          </div>

          <!-- VLC / M3U -->
          <div>
            <h3 style="color: #4338ca; font-size: 14px; font-weight: 700; margin: 0 0 10px 0;">
              Ordinateur (VLC, lecteur M3U)
            </h3>
            <ol style="color: #444; font-size: 13px; line-height: 1.9; margin: 0; padding-left: 18px;">
              <li>Copiez le <strong>lien Playlist M3U</strong> fourni ci-dessus</li>
              <li>Ouvrez VLC Media Player, puis <strong>M\u00e9dia &gt; Ouvrir un flux r\u00e9seau</strong></li>
              <li>Collez le lien et cliquez sur Lire</li>
            </ol>
          </div>
        </div>

        <!-- Tutorials link -->
        <div style="text-align: center; margin-bottom: 28px;">
          <p style="color: #555; font-size: 13px; margin: 0 0 14px 0;">
            Besoin d'aide suppl\u00e9mentaire ? Consultez nos tutoriels d\u00e9taill\u00e9s :
          </p>
          <a href="https://officieliptvsmarterspro.fr/tutoriels" style="display: inline-block; background-color: #4338ca; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 8px; font-size: 14px; font-weight: 600;">
            Voir les tutoriels d'installation
          </a>
        </div>

        <!-- Important notes -->
        <div style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 18px 20px; margin-bottom: 28px;">
          <h3 style="color: #92400e; font-size: 13px; font-weight: 700; margin: 0 0 10px 0;">
            Informations importantes
          </h3>
          <ul style="color: #78350f; font-size: 12px; line-height: 1.9; margin: 0; padding-left: 16px;">
            <li>Conservez pr\u00e9cieusement cet email : il contient vos identifiants de connexion.</li>
            <li>Votre abonnement est valide jusqu'au <strong>${expDate}</strong>.</li>
            <li>Ne partagez pas vos identifiants afin d'\u00e9viter toute interruption de service.</li>
            <li>En cas de difficult\u00e9, notre \u00e9quipe de support est disponible 24h/24 et 7j/7.</li>
          </ul>
        </div>

        <!-- CTA website -->
        <div style="text-align: center; margin-bottom: 8px;">
          <a href="https://officieliptvsmarterspro.fr/" style="display: inline-block; background: linear-gradient(135deg, #4338ca 0%, #6366f1 100%); color: #ffffff; text-decoration: none; padding: 14px 36px; border-radius: 8px; font-size: 14px; font-weight: 700;">
            Visiter notre site
          </a>
        </div>

      </div>

      <!-- Footer -->
      <div style="background-color: #f8f9fc; padding: 24px 32px; text-align: center; border-top: 1px solid #e8eaf0;">
        <p style="color: #1a1a2e; font-size: 14px; font-weight: 700; margin: 0 0 4px 0;">
          IPTV Smarters Pro
        </p>
        <p style="color: #999; font-size: 12px; margin: 0 0 12px 0;">
          Le meilleur service IPTV premium en France
        </p>
        <a href="https://officieliptvsmarterspro.fr/" style="color: #4338ca; font-size: 12px; text-decoration: none; font-weight: 600;">
          officieliptvsmarterspro.fr
        </a>
        <div style="border-top: 1px solid #e8eaf0; margin-top: 16px; padding-top: 14px;">
          <p style="color: #bbb; font-size: 10px; margin: 0; line-height: 1.6;">
            Cet email a \u00e9t\u00e9 envoy\u00e9 automatiquement suite \u00e0 votre achat.<br>
            Pour toute question, contactez-nous via <a href="https://officieliptvsmarterspro.fr/" style="color: #999; text-decoration: underline;">notre site</a>.
          </p>
        </div>
      </div>

    </div>

  </div>
</body>
</html>`;
}
