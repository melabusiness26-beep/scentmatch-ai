#!/usr/bin/env node
/**
 * Brevo Email Templates Creator
 * Erstellt automatisch die 3 Email-Templates für Auressa Newsletter
 *
 * Verwendung:
 * BREVO_API_KEY=xxx node scripts/create-brevo-templates.js
 */

const apiKey = process.env.BREVO_API_KEY;

if (!apiKey) {
  console.error('❌ BREVO_API_KEY Umgebungsvariable nicht gesetzt');
  console.error('Verwendung: BREVO_API_KEY=xxx node scripts/create-brevo-templates.js');
  process.exit(1);
}

const BREVO_API_BASE = 'https://api.brevo.com/v3';

async function createTemplate(name, subject, htmlContent) {
  try {
    console.log(`\n📧 Erstelle Template: "${name}"...`);

    const response = await fetch(`${BREVO_API_BASE}/smtp/templates`, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        subject,
        htmlContent,
        isActive: true,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ Fehler beim Erstellen: ${response.status}`);
      console.error(error);
      return null;
    }

    const data = await response.json();
    console.log(`✅ Template erstellt! ID: ${data.id}`);
    return data.id;
  } catch (error) {
    console.error(`❌ Fehler: ${error.message}`);
    return null;
  }
}

async function main() {
  console.log('🚀 Starte Brevo Template-Erstellung für Auressa...\n');

  // Template 1: Confirmation Email
  const confirmationTemplate = `
    <html>
      <body style="font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #FFFBF7 0%, #F9F3EA 100%); padding: 2rem;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); border: 1px solid rgba(212, 175, 55, 0.15);">
          <h1 style="font-family: 'Playfair Display', serif; font-size: 32px; color: #1F1410; margin-bottom: 1rem;">Bestätige dein Abo</h1>
          <p style="font-size: 16px; color: #6B5344; line-height: 1.7; margin-bottom: 2rem;">
            Hallo {{FIRSTNAME}},<br><br>
            vielen Dank für dein Interesse an Auressa! Um dein Newsletter-Abo zu aktivieren,
            klicke bitte auf den folgenden Link:
          </p>

          <div style="text-align: center; margin: 2rem 0;">
            <a href="{{CONFIRMATION_LINK}}" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #E5C158 100%); color: #1F1410; font-weight: 700; padding: 0.9rem 2rem; border-radius: 10px; text-decoration: none; font-size: 1rem; box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);">
              Email bestätigen
            </a>
          </div>

          <p style="font-size: 14px; color: #9A8780; margin-top: 2rem; border-top: 1px solid rgba(212, 175, 55, 0.1); padding-top: 1rem;">
            Falls der Link nicht funktioniert, kopiere diese URL in deinen Browser:<br>
            {{CONFIRMATION_LINK}}
          </p>

          <p style="font-size: 12px; color: #9A8780; margin-top: 1rem;">
            © Auressa · <a href="https://auressa.ch" style="color: #D4AF37; text-decoration: none;">auressa.ch</a>
          </p>
        </div>
      </body>
    </html>
  `;

  // Template 2: Welcome Email
  const welcomeTemplate = `
    <html>
      <body style="font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #FFFBF7 0%, #F9F3EA 100%); padding: 2rem;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); border: 1px solid rgba(212, 175, 55, 0.15);">
          <h1 style="font-family: 'Playfair Display', serif; font-size: 32px; color: #1F1410; margin-bottom: 1rem;">Willkommen bei Auressa! 🎉</h1>

          <p style="font-size: 16px; color: #6B5344; line-height: 1.7; margin-bottom: 2rem;">
            Hallo {{FIRSTNAME}},<br><br>
            dein Newsletter-Abo ist nun aktiv! Hier sind deine personalizierten Top-3-Duft-Empfehlungen basierend auf deinen Vorlieben:
          </p>

          <div style="background: rgba(212, 175, 55, 0.08); border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
            <h3 style="font-size: 14px; font-weight: 700; color: #D4AF37; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">Deine Empfehlungen für {{INTEREST}}</h3>
            <p style="color: #6B5344; margin-bottom: 0.8rem; font-size: 15px;">
              {{RECOMMENDATION_1}}<br>
              {{RECOMMENDATION_2}}<br>
              {{RECOMMENDATION_3}}
            </p>
          </div>

          <div style="text-align: center;">
            <a href="https://auressa.ch/duefte" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #E5C158 100%); color: #1F1410; font-weight: 700; padding: 0.9rem 2rem; border-radius: 10px; text-decoration: none; font-size: 1rem; box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);">
              Alle Düfte erkunden
            </a>
          </div>

          <p style="font-size: 12px; color: #9A8780; margin-top: 2rem; border-top: 1px solid rgba(212, 175, 55, 0.1); padding-top: 1rem;">
            © Auressa · <a href="https://auressa.ch" style="color: #D4AF37; text-decoration: none;">auressa.ch</a>
          </p>
        </div>
      </body>
    </html>
  `;

  // Template 3: Newsletter Template
  const newsletterTemplate = `
    <html>
      <body style="font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #FFFBF7 0%, #F9F3EA 100%); padding: 2rem;">
        <div style="max-width: 600px; margin: 0 auto; background: white; padding: 2rem; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.08); border: 1px solid rgba(212, 175, 55, 0.15);">
          <h1 style="font-family: 'Playfair Display', serif; font-size: 32px; color: #1F1410; margin-bottom: 1rem;">{{NEWSLETTER_TITLE}}</h1>

          <p style="font-size: 16px; color: #6B5344; line-height: 1.7; margin-bottom: 2rem;">
            Hallo {{FIRSTNAME}},<br><br>
            {{NEWSLETTER_CONTENT}}
          </p>

          <div style="background: rgba(212, 175, 55, 0.08); border-radius: 12px; padding: 1.5rem; margin-bottom: 2rem;">
            <h3 style="font-size: 14px; font-weight: 700; color: #D4AF37; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 1rem;">Diese Woche für dich</h3>
            <p style="color: #6B5344; margin-bottom: 0.8rem; font-size: 15px;">
              {{FEATURED_PERFUME_1}}<br>
              {{FEATURED_PERFUME_2}}<br>
              {{FEATURED_PERFUME_3}}
            </p>
          </div>

          <div style="text-align: center;">
            <a href="https://auressa.ch/duefte" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #E5C158 100%); color: #1F1410; font-weight: 700; padding: 0.9rem 2rem; border-radius: 10px; text-decoration: none; font-size: 1rem; box-shadow: 0 8px 24px rgba(212, 175, 55, 0.3);">
              Düfte ansehen
            </a>
          </div>

          <p style="font-size: 12px; color: #9A8780; margin-top: 2rem; border-top: 1px solid rgba(212, 175, 55, 0.1); padding-top: 1rem;">
            © Auressa · <a href="https://auressa.ch" style="color: #D4AF37; text-decoration: none;">auressa.ch</a><br>
            <a href="{{UNSUBSCRIBE_LINK}}" style="color: #9A8780; text-decoration: none;">Abmelden</a>
          </p>
        </div>
      </body>
    </html>
  `;

  const templates = [
    {
      name: '[Auressa] Email-Bestätigung',
      subject: 'Bestätige dein Auressa Newsletter-Abo',
      html: confirmationTemplate,
    },
    {
      name: '[Auressa] Willkommens-Email',
      subject: 'Willkommen bei Auressa! 🎉 Deine persönlichen Duft-Empfehlungen',
      html: welcomeTemplate,
    },
    {
      name: '[Auressa] Newsletter Template',
      subject: 'Diese Woche bei Auressa: {{NEWSLETTER_TITLE}}',
      html: newsletterTemplate,
    },
  ];

  const templateIds = {};

  for (const template of templates) {
    const id = await createTemplate(template.name, template.subject, template.html);
    if (id) {
      templateIds[template.name] = id;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 ZUSAMMENFASSUNG');
  console.log('='.repeat(60));

  if (Object.keys(templateIds).length === 3) {
    console.log('✅ Alle 3 Templates erfolgreich erstellt!\n');
    console.log('Template IDs (in Vercel-Umgebungsvariablen eintragen):\n');

    const idMap = [
      { name: '[Auressa] Email-Bestätigung', env: 'BREVO_TEMPLATE_CONFIRM' },
      { name: '[Auressa] Willkommens-Email', env: 'BREVO_TEMPLATE_WELCOME' },
      { name: '[Auressa] Newsletter Template', env: 'BREVO_TEMPLATE_NEWSLETTER' },
    ];

    idMap.forEach((item) => {
      const id = templateIds[item.name];
      if (id) {
        console.log(`${item.env}=${id}`);
      }
    });

    console.log('\n💾 Speichere diese IDs in Vercel unter:');
    console.log('   Settings → Environment Variables → Production & Preview\n');
  } else {
    console.log(`❌ Nur ${Object.keys(templateIds).length}/3 Templates erstellt`);
    console.log('Bitte überprüfe dein BREVO_API_KEY und versuche es erneut.\n');
  }

  console.log('='.repeat(60));
}

main().catch(console.error);
