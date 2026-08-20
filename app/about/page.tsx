import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "আমাদের সম্পর্কে — ১-অন-১ শিক্ষা সবার জন্য",
  description: "OTOTeachers কোনো গণ-কোচিং সেন্টার নয়। প্রতিটি শিক্ষার্থীর মেধা ও দুর্বলতার দিকে লক্ষ্য রেখে বুয়েট, ঢাবি বা মেডিকেল শিক্ষককে সরাসরি ১-অন-১ মিলিয়ে দেয় আমাদের প্ল্যাটফর্ম।",
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: "আমাদের সম্পর্কে — ১-অন-১ শিক্ষা সবার জন্য | OTOTeachers",
    description: "প্রতিটি শিক্ষার্থীর জন্য ডেডিকেটেড ১-অন-১ অনলাইন শিক্ষক। বুয়েট, ঢাবি ও মেডিকেল টিউটরদের সাথে পার্সোনালাইজড ক্লাস।",
    url: `${SITE_URL}/about`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/Assets/Group%202147229264.png`,
        width: 1200,
        height: 630,
        alt: "About OTOTeachers - One-to-One Online Teachers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "আমাদের সম্পর্কে | OTOTeachers",
    description: "বাংলাদেশের ১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম। প্রথম ক্লাস সম্পূর্ণ ফ্রি।",
    images: [`${SITE_URL}/Assets/Group%202147229264.png`],
  },
};

import { getTeachers, getSettings, getCustomPages } from "@/lib/db";

export const revalidate = 0;

export default async function AboutPage() {
  const [teachers, settings, customPages] = await Promise.all([
    getTeachers().catch(() => []),
    getSettings().catch(() => ({})),
    getCustomPages().catch(() => []),
  ]);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "আমাদের সম্পর্কে", url: "/about" },
  ]);

  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "আমাদের সম্পর্কে — OTOTeachers",
    description: "OTOTeachers প্ল্যাটফর্মের পরিচিতি, উদ্দেশ্য ও ১-অন-১ শিক্ষাদান কার্যক্রম।",
    url: `${SITE_URL}/about`,
    mainEntity: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={aboutPageSchema} />
      <AboutClient
        initialTeachers={teachers}
        initialSettings={settings}
        initialPages={customPages}
      />
    </>
  );
}
