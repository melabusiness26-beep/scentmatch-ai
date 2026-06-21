"use client";

import { useState } from "react";

/**
 * Newsletter-Anmeldung (Monetarisierung / Reichweite – vorbereitet).
 *
 * Aktuell rein im Frontend (kein Versand). Später hier an einen Dienst
 * anbinden, z. B. eine Route `app/api/newsletter/route.ts` + Mailprovider
 * (Resend, Buttondown, Mailchimp …).
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    // TODO: an echten Newsletter-Dienst senden.
    setDone(true);
  }

  return (
    <section className="surface relative overflow-hidden p-6 sm:p-8">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(40rem 20rem at 100% 0%, rgba(124,92,255,0.18), transparent 60%)",
        }}
      />
      <div className="relative">
        <span className="kicker">Bleib dran</span>
        <h2 className="mt-2 text-2xl font-bold sm:text-3xl">Neue Releases zuerst erfahren</h2>
        <p className="mt-2 max-w-xl text-sm text-muted">
          Ein kurzer Newsletter mit den besten neuen und kommenden Spielen, Geheimtipps und
          Deals. Kein Spam – jederzeit abbestellbar.
        </p>

        {done ? (
          <p className="mt-5 font-medium text-accent-2">
            Danke! Sobald der Versand aktiv ist, bist du dabei. ✓
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-5 flex max-w-md flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="deine@email.ch"
              aria-label="E-Mail-Adresse"
              className="input"
            />
            <button type="submit" className="btn btn-primary shrink-0">
              Abonnieren
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
