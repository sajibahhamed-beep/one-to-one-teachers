import type { Metadata } from "next";
import RefundPolicyClient from "./RefundPolicyClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";
import { getPageBySlug } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("refund-policy");
  const title = page?.metaTitleBn || page?.titleBn || "রিফান্ড পলিসি (Refund Policy)";
  const description = page?.metaDescriptionBn || page?.subtitleBn || "১০০% স্বচ্ছ রিফান্ড পলিসি — ১ম ক্লাস ফ্রি ট্রায়াল এবং অসন্তুষ্টিতে শতভাগ মানিব্যাক গ্যারান্টি।";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/refund-policy`,
    },
    openGraph: {
      title: `${title} | OTOTeachers`,
      description,
      url: `${SITE_URL}/refund-policy`,
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

export default async function RefundPolicyPage() {
  const page = await getPageBySlug("refund-policy");
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "রিফান্ড পলিসি", url: "/refund-policy" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <RefundPolicyClient initialPage={page} />
    </>
  );
}
