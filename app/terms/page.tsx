import type { Metadata } from "next";
import TermsClient from "./TermsClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "শর্তাবলী ও নীতিমালা (Terms and Conditions)",
  description: "OTOTeachers প্ল্যাটফর্ম ব্যবহারের নিয়মমালা, শিক্ষার্থী ও অভিভাবকের দায়িত্ব এবং শিক্ষক কোড অফ কন্ডাক্ট সম্পর্কিত বিস্তারিত শর্তাবলী।",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "শর্তাবলী ও নীতিমালা | OTOTeachers",
    description: "OTOTeachers প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী ও সেবা গ্রহণের শর্তসমূহ।",
    url: `${SITE_URL}/terms`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "শর্তাবলী ও নীতিমালা | OTOTeachers",
    description: "১-অন-১ অনলাইন শিক্ষক প্ল্যাটফর্ম ব্যবহারের নিয়মাবলী।",
  },
};

export default function TermsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "শর্তাবলী ও নীতিমালা", url: "/terms" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <TermsClient />
    </>
  );
}
