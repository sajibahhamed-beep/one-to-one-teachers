import type { Metadata } from "next";
import SscClient from "./SscClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "এসএসসি অনলাইন টিউশন — অভিজ্ঞ ব্যক্তিগত শিক্ষক ও বোর্ড প্রস্তুতি",
  description:
    "৯ম ও ১০ম শ্রেণির শিক্ষার্থীদের জন্য বুয়েট, ঢাবি ও মেডিকেলের অভিজ্ঞ ব্যক্তিগত শিক্ষক। উচ্চতর গণিত, পদার্থ, রসায়ন ও ইংরেজি বিষয়ে বোর্ড পরীক্ষার সেরা প্রস্তুতি ও ১-অন-১ লাইভ ক্লাস।",
  alternates: {
    canonical: `${SITE_URL}/ssc-online-tuition`,
  },
  openGraph: {
    title: "এসএসসি অনলাইন টিউশন — অভিজ্ঞ ব্যক্তিগত শিক্ষক ও বোর্ড প্রস্তুতি | OTOTeachers",
    description:
      "বুয়েট, ঢাবি ও মেডিকেলের অভিজ্ঞ শিক্ষকদের সাথে এসএসসি বোর্ড পরীক্ষার পূর্ণাঙ্গ ১-অন-১ প্রস্তুতি। প্রথম ট্রায়াল ক্লাস সম্পূর্ণ ফ্রি।",
    url: `${SITE_URL}/ssc-online-tuition`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/Assets/Group%202147229264.png`,
        width: 1200,
        height: 630,
        alt: "SSC Online Tuition & Board Exam Preparation - OTOTeachers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "এসএসসি অনলাইন টিউশন ও ব্যক্তিগত শিক্ষক | OTOTeachers",
    description: "৯ম ও ১০ম শ্রেণির সকল বিষয়ের জন্য ডেডিকেটেড অনলাইন শিক্ষক। ১ম সেশন ফ্রি।",
    images: [`${SITE_URL}/Assets/Group%202147229264.png`],
  },
};

export default function SscOnlineTuitionPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "এসএসসি অনলাইন টিউশন", url: "/ssc-online-tuition" },
  ]);

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "এসএসসি পূর্ণাঙ্গ বোর্ড প্রস্তুতি ও ১-অন-১ অনলাইন টিউশন",
    description:
      "৯ম ও ১০ম শ্রেণির সাধারণ গণিত, উচ্চতর গণিত, পদার্থবিজ্ঞান, রসায়ন, জীববিজ্ঞান ও ইংরেজি বিষয়ের ব্যক্তিগত অনলাইন টিউশন কোর্স।",
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    educationalLevel: "Secondary School Certificate (SSC / Class 9-10)",
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
        name: "এসএসসি শিক্ষার্থীদের জন্য ১-অন-১ অনলাইন টিউশন কীভাবে সাহায্য করে?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "বড় কোচিংয়ের ভিড়ে শিক্ষার্থীরা তাদের নির্দিষ্ট গাণিতিক বা ধারণাগত দুর্বলতা বলতে পারে না। ব্যক্তিগত শিক্ষক প্রতিটি দুর্বল অধ্যায় চিহ্নিত করে ধরে ধরে সমাধান করান এবং টেস্ট পেপারের সৃজনশীল প্রশ্ন অনুশীলন করান।",
        },
      },
      {
        "@type": "Question",
        name: "এসএসসি বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা সব বিভাগের শিক্ষক পাওয়া যাবে?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "হ্যাঁ, এসএসসি বিজ্ঞান (পদার্থ, রসায়ন, গণিত, জীব), ব্যবসায় শিক্ষা (হিসাববিজ্ঞান, ফিন্যান্স) ও মানবিক বিভাগের জন্য শীর্ষ বিশ্ববিদ্যালয়ের যাচাইকৃত শিক্ষক রয়েছে।",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={courseSchema} />
      <JsonLd data={faqSchema} />
      <SscClient />
    </>
  );
}
