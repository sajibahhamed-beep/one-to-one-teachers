import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";
import { getPageBySlug } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("privacy");
  const title = page?.metaTitleBn || page?.titleBn || "গোপনীয়তা নীতি (Privacy Policy)";
  const description = page?.metaDescriptionBn || page?.subtitleBn || "OTOTeachers প্ল্যাটফর্মের গোপনীয়তা নীতি — শিক্ষার্থী ও অভিভাবকদের তথ্যের শতভাগ নিরাপত্তা এবং জিরো থার্ড-পার্টি শেয়ারিং নিশ্চয়তা।";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/privacy`,
    },
    openGraph: {
      title: `${title} | OTOTeachers`,
      description,
      url: `${SITE_URL}/privacy`,
      siteName: SITE_NAME,
      locale: "bn_BD",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | OTOTeachers`,
      description,
    },
  };
}

export default async function PrivacyPolicyPage() {
  const page = await getPageBySlug("privacy");
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "গোপনীয় নীতি", url: "/privacy" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <PrivacyClient initialPage={page} />
    </>
  );
}
