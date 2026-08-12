import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DynamicPageClient from "./DynamicPageClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";
import { getPageBySlug } from "@/lib/db";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPageBySlug(params.slug);
  if (!page) return { title: "Page Not Found | OTOTeachers" };

  const title = page.metaTitleBn || page.titleBn;
  const description = page.metaDescriptionBn || page.subtitleBn;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/pages/${params.slug}`,
    },
    openGraph: {
      title: `${title} | OTOTeachers`,
      description,
      url: `${SITE_URL}/pages/${params.slug}`,
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

export default async function CustomPageRoute({ params }: PageProps) {
  const page = await getPageBySlug(params.slug);
  if (!page) {
    notFound();
  }

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: page.titleBn || page.titleEn, url: `/pages/${params.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <DynamicPageClient initialPage={page} slug={params.slug} />
    </>
  );
}
