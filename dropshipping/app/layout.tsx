import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE } from "@/lib/site";
import "./globals.css";

const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} – ${SITE.claim}`,
    template: `%s – ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} – ${SITE.claim}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    locale: "de_CH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-CH" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
