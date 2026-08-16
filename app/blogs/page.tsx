import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import JsonLd from "@/components/JsonLd";
import { getBlogs } from "@/lib/db";
import { getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "১-অন-১ শিক্ষাদান, পরীক্ষা প্রস্তুতি ও পড়াশোনার কৌশল ব্লগ",
  description: "বুয়েট, ঢাবি ও মেডিকেল শিক্ষকদের বাস্তব অভিজ্ঞতা, বোর্ড পরীক্ষার সেরা প্রস্তুতি কৌশল, গণিতের ভয় কাটানোর উপায় এবং ১-অন-১ মেন্টরিং নির্দেশিকা।",
  alternates: {
    canonical: `${SITE_URL}/blogs`,
  },
  openGraph: {
    title: "১-অন-১ শিক্ষাদান, পরীক্ষা প্রস্তুতি ও পড়াশোনার কৌশল | OTOTeachers",
    description: "বুয়েট, ঢাবি ও মেডিকেল টিচারদের রিয়েল অভিজ্ঞতা ও বোর্ড পরীক্ষার সেরা প্রস্তুতি গাইডলাইন।",
    url: `${SITE_URL}/blogs`,
    siteName: SITE_NAME,
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/Assets/Group%202147229264.png`,
        width: 1200,
        height: 630,
        alt: "OTOTeachers Education & Tutoring Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "১-অন-১ শিক্ষাদান ও পরীক্ষা প্রস্তুতি ব্লগ | OTOTeachers",
    description: "বোর্ড পরীক্ষা প্রস্তুতি ও ১-অন-১ মেন্টরিং নির্দেশিকা।",
    images: [`${SITE_URL}/Assets/Group%202147229264.png`],
  },
};

export default async function BlogsPage() {
  const posts = await getBlogs();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "ব্লগ ও গাইডলাইন", url: "/blogs" },
  ]);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "১-অন-১ শিক্ষাদান ও পরীক্ষা প্রস্তুতি ব্লগ — OTOTeachers",
    description: "বুয়েট, ঢাবি ও মেডিকেল শিক্ষকদের ১-অন-১ মেন্টরিং নির্দেশিকা ও বোর্ড পরীক্ষার সাজেশন।",
    url: `${SITE_URL}/blogs`,
    hasPart: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.titleBn,
      url: `${SITE_URL}/blogs/${p.slug || p.id}`,
      image: p.image,
      datePublished: "2026-08-01T00:00:00+06:00",
    })),
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={collectionSchema} />
      <BlogsClient initialPosts={posts} />
    </>
  );
}
