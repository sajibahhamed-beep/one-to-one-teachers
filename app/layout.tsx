import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Roboto, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import JsonLd from "@/components/JsonLd";
import { getOrganizationSchema, getWebSiteSchema, SITE_URL, SITE_NAME, DEFAULT_SEO } from "@/lib/seoConfig";
import "./globals.css";

// ─── Fonts ───────────────────────────────────────────────────────────────────
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
  preload: true,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
  preload: false,
});

// ─── SEO Metadata ────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_SEO.title,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_SEO.description,
  authors: [{ name: "OTOTeachers — One-to-One Teacher for All", url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "OTOTeachers — ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম",
    description: "প্রতিটি শিক্ষার্থীর জন্য একজন ডেডিকেটেড অনলাইন শিক্ষক। বুয়েট, ঢাবি ও মেডিকেলের শিক্ষকদের সাথে লাইভ ক্লাস। প্রথম ক্লাস সম্পূর্ণ বিনামূল্যে।",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "bn_BD",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: `${SITE_URL}/Assets/logo.png`,
        width: 1200,
        height: 630,
        alt: "OTOTeachers — ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OTOTeachers — ১-অন-১ অনলাইন শিক্ষক",
    description: "বাংলাদেশ জুড়ে ১-অন-১ লাইভ অনলাইন ক্লাস। প্রথম সেশন সম্পূর্ণ ফ্রি।",
    images: [`${SITE_URL}/Assets/logo.png`],
  },
  icons: {
    icon: "/Assets/logo.png",
    shortcut: "/Assets/logo.png",
    apple: "/Assets/logo.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0D2C4A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        {/* DNS prefetch & preconnect for external CDNs */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Global Structured Data (Organization & WebSite) */}
        <JsonLd data={orgSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body
        className={`${hindSiliguri.variable} ${roboto.variable} ${jetbrainsMono.variable} ${plusJakartaSans.variable} antialiased bg-[#FBF7EF] text-[#12213D]`}
      >
        <LanguageProvider>
          {children}
          <WhatsAppButton />
        </LanguageProvider>
      </body>
    </html>
  );
}
