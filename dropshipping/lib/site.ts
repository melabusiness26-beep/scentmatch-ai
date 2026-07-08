/**
 * Zentrale Seiten-Konfiguration.
 * Der Markenname ist ein Arbeitsname und kann hier an EINER Stelle geändert werden.
 */
export const SITE = {
  name: "SwissDrop",
  claim: "Dein Start in E-Commerce & Dropshipping in der Schweiz",
  description:
    "SwissDrop hilft dir, gewinnbringende Produkte zu finden und zu bewerten, deinen Shop zu planen, professionelle Werbevideos zu erstellen und alle Schweizer Besonderheiten (Zoll, MWST, Verpackung, Versand) zu meistern.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://swissdrop.vercel.app",
};
