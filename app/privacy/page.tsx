import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const metadata: Metadata = {
  title: "গোপনীয়তা নীতি (Privacy Policy)",
  description: "OTOTeachers প্ল্যাটফর্মের গোপনীয়তা নীতি — শিক্ষার্থী ও অভিভাবকদের তথ্যের শতভাগ নিরাপত্তা এবং জিরো থার্ড-পার্টি শেয়ারিং নিশ্চয়তা।",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: "গোপনীয়তা নীতি | OTOTeachers",
    description: "শিক্ষার্থী ও অভিভাবকদের তথ্যের সর্বোচ্চ সুরক্ষা সুনিশ্চিত করা আমাদের অগ্রাধিকার।",
    url: `${SITE_URL}/privacy`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "গোপনীয়তা নীতি | OTOTeachers",
    description: "শিক্ষার্থী ও অভিভাবক তথ্যের সর্বোচ্চ সুরক্ষা নিশ্চয়তা।",
  },
};

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "গোপনীয় নীতি", url: "/privacy" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PrivacyClient />
    </>
  );
}
