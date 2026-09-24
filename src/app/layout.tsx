import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "./fonts/inter-latin-variable.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "300 700",
});

const spaceGrotesk = localFont({
  src: "./fonts/space-grotesk-latin-variable.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "400 700",
});

const jetbrainsMono = localFont({
  src: "./fonts/jetbrains-mono-latin-variable.woff2",
  variable: "--font-mono",
  display: "swap",
  weight: "400 700",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GrokBot Society — Persistent Synthetic People Without the Swarm",
    template: "%s | GrokBot Society",
  },
  description:
    "A provider-neutral runtime for persistent synthetic people, roles, relationships, and social worlds. Population is cheap; intelligence is invoked only when interaction requires it.",
  keywords: [
    "synthetic agents",
    "social simulation",
    "multi-agent systems",
    "AI companions",
    "agent runtime",
    "social graph",
    "persistent agents",
    "LLM orchestration",
  ],
  authors: [{ name: "GrokBot Society Contributors" }],
  creator: "GrokBot Society",
  publisher: "GrokBot Society",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "GrokBot Society",
    title: "GrokBot Society — Persistent Synthetic People Without the Swarm",
    description:
      "A provider-neutral runtime for persistent synthetic people. Population is cheap; intelligence is invoked only when interaction requires it.",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrokBot Society — Persistent Synthetic People Without the Swarm",
    description:
      "A provider-neutral runtime for persistent synthetic people. Population is cheap; intelligence is invoked only when interaction requires it.",
  },
  icons: {
    icon: "/icon.svg",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#050811" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
