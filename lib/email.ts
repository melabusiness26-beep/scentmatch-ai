// Eingebaute E-Mails (ohne Brevo-Vorlage): einheitliches Auressa-Aussehen, Versand über
// die Brevo-API. Braucht in Vercel nur BREVO_API_KEY und BREVO_SENDER_EMAIL (in Brevo
// bestätigter Absender); optional BREVO_SENDER_NAME (Standard „Auressa“).

const SITE_URL = () => process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);
}

/** Rahmen jeder Mail. `footerExtra` ist fertiges HTML (z. B. ein Abmelde-Link) oder leer. */
export function emailLayout(title: string, body: string, footerExtra = ''): string {
  return `<!doctype html><html lang="de"><body style="margin:0;background:#FBF8F3;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;color:#1F1712">
<div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:18px;padding:28px 26px;border:1px solid #EFE6D8">
<p style="margin:0 0 18px;font-family:Georgia,serif;font-size:22px;color:#1F1712">Auressa</p>
<h1 style="margin:0 0 14px;font-family:Georgia,serif;font-size:26px;line-height:1.2;color:#1F1712">${title}</h1>
${body}
<p style="margin:26px 0 0;padding-top:16px;border-top:1px solid #EFE6D8;font-size:12px;line-height:1.5;color:#7A6A5C">
Auressa · Duft-Findung aus der Schweiz · <a href="${SITE_URL()}" style="color:#7A6A5C">auressa.ch</a>${footerExtra ? `<br>${footerExtra}` : ''}
</p></div></body></html>`;
}

export function emailButton(href: string, label: string): string {
  return `<p style="margin:22px 0"><a href="${href}" style="display:inline-block;background:#1F1712;color:#ffffff;text-decoration:none;font-weight:bold;padding:14px 22px;border-radius:12px">${label}</a></p>`;
}

export function builtInEmailEnabled(): boolean {
  return Boolean(process.env.BREVO_API_KEY && process.env.BREVO_SENDER_EMAIL);
}

export async function sendHtmlEmail(to: string, subject: string, html: string): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  const sender = process.env.BREVO_SENDER_EMAIL;
  if (!apiKey || !sender) return false;
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': apiKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: { email: sender, name: process.env.BREVO_SENDER_NAME || 'Auressa' },
        to: [{ email: to }],
        subject,
        htmlContent: html
      })
    });
    if (!res.ok) console.error('[e-mail] Brevo:', res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error('[e-mail] Versand fehlgeschlagen:', err);
    return false;
  }
}
