import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Roboto, JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

// ─── Fonts — only load what we actually use ─────────────────────────────────
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],   // dropped unused 300
  variable: "--font-hind-siliguri",
  display: "swap",
  preload: true,
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],          // dropped unused 300 & 900
  variable: "--font-roboto",
  display: "swap",
  preload: false,                          // only preload primary (Bangla) font
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
  title: {
    default: "ototeachers.com — ১-অন-১ অনলাইন শিক্ষক | One-to-One Teacher for All",
    template: "%s | ototeachers.com",
  },
  description:
    "বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। বুয়েট, ঢাবি ও মেডিকেলের যাচাইকৃত শিক্ষকদের সাথে সরাসরি লাইভ ক্লাস — ঘরে বসে। প্রথম ক্লাস বিনামূল্যে।",
  keywords: [
    "ototeachers.com",
    "ototeachers",
    "online teacher Bangladesh",
    "১-অন-১ শিক্ষক",
    "১-অন-১ অনলাইন শিক্ষক",
    "private tutor Bangladesh",
    "online tutor Bangla",
    "SSC HSC math teacher",
    "buet teacher online",
    "1 on 1 online class Bangladesh",
    "গৃহশিক্ষক অনলাইন",
  ],
  authors: [{ name: "ototeachers.com — One-to-One Teacher for All" }],
  metadataBase: new URL("https://ototeachers.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ototeachers.com — ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম",
    description:
      "প্রতিটি শিক্ষার্থীর জন্য একজন ডেডিকেটেড অনলাইন শিক্ষক। প্রথম ক্লাস বিনামূল্যে।",
    type: "website",
    locale: "bn_BD",
    siteName: "ototeachers.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "ototeachers.com — ১-অন-১ অনলাইন শিক্ষক",
    description: "বাংলাদেশ জুড়ে ১-অন-১ লাইভ অনলাইন ক্লাস। প্রথম ক্লাস ফ্রি।",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
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
  return (
    <html lang="bn" className="scroll-smooth">
      <head>
        {/* DNS prefetch & preconnect for external image CDNs */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
