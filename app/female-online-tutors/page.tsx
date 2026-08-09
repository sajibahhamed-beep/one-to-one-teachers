import type { Metadata } from "next";
import FemaleTutorsClient from "./FemaleTutorsClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "নারী শিক্ষার্থীদের জন্য ভেরিফাইড অনলাইন শিক্ষিকা ও গৃহশিক্ষক | OTOTeachers",
  description:
    "মেয়ে শিক্ষার্থীদের নিরাপদ ও স্বাচ্ছন্দ্যপূর্ণ পড়াশোনার জন্য বুয়েট, ঢাবি ও সরকারি মেডিকেলের যাচাইকৃত নারী শিক্ষক। ১-অন-১ লাইভ অনলাইন ক্লাস, পূর্ণ গোপনীয়তা ও ১০০% নিরাপত্তা নিশ্চয়তা।",
  alternates: {
    canonical: `${SITE_URL}/female-online-tutors`,
  },
  openGraph: {
    title: "নারী শিক্ষার্থীদের জন্য ভেরিফাইড অনলাইন শিক্ষিকা | OTOTeachers",
    description:
      "বুয়েট, ঢাবি ও মেডিকেলের অভিজ্ঞ নারী শিক্ষকদের সাথে মেয়েদের নিরাপদ ১-অন-১ অনলাইন শিক্ষা। প্রথম সেশন সম্পূর্ণ ফ্রি।",
    url: `${SITE_URL}/female-online-tutors`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/Assets/Group%202147229264.png`,
        width: 1200,
        height: 630,
        alt: "Verified Female Online Tutors for Girls - OTOTeachers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "মেয়েদের জন্য ভেরিফাইড অনলাইন শিক্ষিকা | OTOTeachers",
    description: "বুয়েট, ঢাবি ও মেডিকেলের নারী শিক্ষকদের ১-অন-১ ক্লাস। ১ম সেশন ফ্রি।",
    images: [`${SITE_URL}/Assets/Group%202147229264.png`],
  },
};

export default function FemaleOnlineTutorsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "অনলাইন নারী শিক্ষক", url: "/female-online-tutors" },
  ]);

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "মেয়ে শিক্ষার্থীদের জন্য ভেরিফাইড অনলাইন নারী শিক্ষক ও মেন্টরিং",
    description:
      "বুয়েট, ঢাবি ও সরকারি মেডিকেলের শিক্ষার্থীদের তত্ত্বাবধানে মেয়েদের নিরাপদ ১-অন-১ অনলাইন শিক্ষা সেবা।",
    provider: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    serviceType: "Personalized Female Tutoring",
    areaServed: {
      "@type": "Country",
      name: "Bangladesh",
    },
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
        name: "অনলাইন নারী শিক্ষকদের যোগ্যতা ও ব্যাকগ্রাউন্ড কীভাবে যাচাই করা হয়?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "আমাদের সকল নারী শিক্ষক বুয়েট, ঢাকা বিশ্ববিদ্যালয়, সরকারি মেডিকেল কলেজ বা শীর্ষ পাবলিক বিশ্ববিদ্যালয়ের ছাত্রী। তাঁদের জাতীয় পরিচয়পত্র, একাডেমিক সনদ ও বিশ্ববিদ্যালয়ের আইডি কার্ড পুঙ্খানুপুঙ্খ যাচাই করা হয়।",
        },
      },
      {
        "@type": "Question",
        name: "অভিভাবকরা কি ক্লাসের সময় উপস্থিত থাকতে পারেন?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "হ্যাঁ, সম্পূর্ণ স্বচ্ছতার জন্য অভিভাবকরা সবসময় ক্লাসের পাশে থাকতে পারেন বা প্রোগ্রেস নোট পর্যবেক্ষণ করতে পারেন।",
        },
      },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <FemaleTutorsClient />
    </>
  );
}
