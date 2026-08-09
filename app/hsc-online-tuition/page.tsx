import type { Metadata } from "next";
import HscClient from "./HscClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "এইচএসসি অনলাইন টিউশন — বুয়েট ও মেডিকেল শিক্ষক ও বোর্ড প্রস্তুতি",
  description:
    "একাদশ ও দ্বাদশ শ্রেণির উচ্চতর গণিত, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও আইসিটি বিষয়ে বুয়েট, ঢাবি ও মেডিকেলের অভিজ্ঞ শিক্ষকের সাথে ১-অন-১ লাইভ অনলাইন ক্লাস।",
  alternates: {
    canonical: `${SITE_URL}/hsc-online-tuition`,
  },
  openGraph: {
    title: "এইচএসসি অনলাইন টিউশন — বুয়েট ও মেডিকেল শিক্ষক ও বোর্ড প্রস্তুতি | OTOTeachers",
    description:
      "এইচএসসি বিজ্ঞান, বাণিজ্য ও মানবিক বিষয়ের জটিল কনসেপ্ট ও বোর্ড পরীক্ষার জন্য ১-অন-১ ব্যক্তিগত শিক্ষক। ১ম ট্রায়াল ক্লাস ফ্রি।",
    url: `${SITE_URL}/hsc-online-tuition`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/Assets/Group%202147229264.png`,
        width: 1200,
        height: 630,
        alt: "HSC Online Tuition & Exam Preparation - OTOTeachers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "এইচএসসি অনলাইন টিউশন ও ব্যক্তিগত শিক্ষক | OTOTeachers",
    description: "এইচএসসি বিজ্ঞান ও মানবিক বিভাগের জন্য ডেডিকেটেড অনলাইন শিক্ষক। ১ম ক্লাস ফ্রি।",
    images: [`${SITE_URL}/Assets/Group%202147229264.png`],
  },
};

export default function HscOnlineTuitionPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "এইচএসসি অনলাইন টিউশন", url: "/hsc-online-tuition" },
  ]);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "এইচএসসি পূর্ণাঙ্গ বোর্ড প্রস্তুতি ও ১-অন-১ অনলাইন টিউশন",
    description:
      "একাদশ ও দ্বাদশ শ্রেণির উচ্চতর গণিত, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও আইসিটি বিষয়ের ব্যক্তিগত অনলাইন টিউশন ও অ্যাডমিশন ফাউন্ডেশন।",
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    educationalLevel: "Higher Secondary Certificate (HSC / Class 11-12)",
    inLanguage: "bn",
    offers: {
      "@type": "Offer",
      category: "Pay-what-you-can",
      price: "600",
      priceCurrency: "BDT",
      availability: "https://schema.org/InStock",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "এইচএসসি বিজ্ঞান বিষয়ের জটিল অংক কীভাবে সহজে বোঝা যায়?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "বুয়েট ও মেডিকেল পড়ুয়া শিক্ষকরা জটিল সূত্র মুখস্থ না করিয়ে মূল ফিজিক্যাল কনসেপ্ট, ফ্রি-বডি ডায়াগ্রাম এবং স্টেপ-বাই-স্টেপ ক্যালকুলেশন শর্টকাটের মাধ্যমে বুঝিয়ে দেন।",
        },
      },
      {
        "@type": "Question",
        name: "এইচএসসি ক্লাসের পাশাপাশি কি ভর্তি পরীক্ষার বেসিক কভার হবে?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "হ্যাঁ, বোর্ড পরীক্ষার সৃজনশীল প্রশ্ন সমাধানের পাশাপাশি বুয়েট, ঢাবি ও মেডিকেল ভর্তি পরীক্ষার কনসেপচুয়াল বেসিক শক্তিশালী করা হয়।",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={courseSchema} />
      <JsonLd data={faqSchema} />
      <HscClient />
    </>
  );
}
