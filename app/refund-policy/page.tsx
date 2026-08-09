import type { Metadata } from "next";
import RefundPolicyClient from "./RefundPolicyClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "রিফান্ড পলিসি (Refund Policy)",
  description: "OTOTeachers-এর ১০০% স্বচ্ছ রিফান্ড নীতি — প্রথম ক্লাস ফ্রি ট্রায়াল, শিক্ষক পরিবর্তনের সুযোগ এবং অব্যবহৃত ফি ফেরতের নিশ্চয়তা।",
  alternates: {
    canonical: `${SITE_URL}/refund-policy`,
  },
  openGraph: {
    title: "রিফান্ড পলিসি | OTOTeachers",
    description: "শিক্ষার্থী ও অভিভাবকদের অধিকার রক্ষায় আমাদের ১০০% স্বচ্ছ ও ঝুঁকিমুক্ত রিফান্ড নীতি।",
    url: `${SITE_URL}/refund-policy`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "রিফান্ড পলিসি | OTOTeachers",
    description: "১০০% স্বচ্ছ রিফান্ড নীতি ও সন্তুষ্টি গ্যারান্টি।",
  },
};

export default function RefundPolicyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "রিফান্ড পলিসি", url: "/refund-policy" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <RefundPolicyClient />
    </>
  );
}
