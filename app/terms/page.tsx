import type { Metadata } from "next";
import TermsClient from "./TermsClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";
import { getPageBySlug } from "@/lib/db";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug("terms");
  const title = page?.metaTitleBn || page?.titleBn || "শর্তাবলী ও নিয়মাবলী (Terms of Service)";
  const description = page?.metaDescriptionBn || page?.subtitleBn || "OTOTeachers এর সেবাসমূহ গ্রহণের শর্তাবলী ও নিয়মকানুন। শিক্ষক ও শিক্ষার্থীদের জন্য স্বচ্ছ নীতিমালা।";

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/terms`,
    },
    openGraph: {
      title: `${title} | OTOTeachers`,
      description,
      url: `${SITE_URL}/terms`,
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

export default async function TermsPage() {
  const page = await getPageBySlug("terms");
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "শর্তাবলী", url: "/terms" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <TermsClient initialPage={page} />
    </>
  );
}
