import type { Metadata, Viewport } from "next";
import { Hind_Siliguri, Fraunces, Work_Sans, JetBrains_Mono } from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["300", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-work-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "আলো শিক্ষা — ১-অন-১ অনলাইন মেন্টর প্রদানকারী প্ল্যাটফর্ম | Alo Shikkha",
  description:
    "আলো শিক্ষা হলো বাংলাদেশের প্রথম ১-অন-১ ডেডিকেটেড মেন্টর প্রদানকারী প্ল্যাটফর্ম। নিম্ন আয়ের পরিবারের শিক্ষার্থীদের জন্য বুয়েট, ঢাবি ও মেডিকেল শিক্ষার্থীদের ব্যক্তিগত মেন্টরশিপ।",
  keywords: [
    "Alo Shikkha",
    "আলো শিক্ষা",
    "১-অন-১ মেন্টর",
    "Bangladesh Mentor Provider",
    "Private Tutor Bangladesh",
    "SSC Math Mentor",
    "HSC Science Mentor",
    "Spoken English Mentor",
  ],
  authors: [{ name: "Alo Shikkha Initiative" }],
  openGraph: {
    title: "আলো শিক্ষা — ১-অন-১ ডেডিকেটেড অনলাইন মেন্টরশিপ",
    description:
      "প্রতিটি শিক্ষার্থীর জন্য একজন ব্যক্তিগত অনলাইন মেন্টর — কোনো কোর্স বিক্রি নয়, ১০০% মেন্টরশিপ।",
    type: "website",
    locale: "bn_BD",
    siteName: "Alo Shikkha",
  },
};

export const viewport: Viewport = {
  themeColor: "#12213D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className="scroll-smooth">
      <body
        className={`${hindSiliguri.variable} ${fraunces.variable} ${workSans.variable} ${jetbrainsMono.variable} antialiased bg-[#FBF7EF] text-[#12213D]`}
      >
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
