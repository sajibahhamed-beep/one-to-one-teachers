import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogDetailClient from "./BlogDetailClient";
import JsonLd from "@/components/JsonLd";
import { getBlogs, getBlogBySlug } from "@/lib/db";
import { getAllBlogs } from "@/lib/blogsData";
import { getBlogPostingSchema, getBreadcrumbSchema, SITE_URL, SITE_NAME } from "@/lib/seoConfig";

export const revalidate = 0;

interface PageProps {
  params: {
    id: string;
  };
}

/**
 * Generate static params for pre-rendering all blog posts at build time (SSG)
 */
export async function generateStaticParams() {
  try {
    const blogs = await getBlogs();
    return blogs.map((b) => ({
      id: b.slug || b.id,
    }));
  } catch {
    const staticBlogs = getAllBlogs();
    return staticBlogs.map((b) => ({
      id: b.slug || b.id,
    }));
  }
}

/**
 * Dynamic metadata generator for each individual educational blog post
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getBlogBySlug(params.id);

  if (!post) {
    return {
      title: "নিবন্ধ পাওয়া যায়নি | OTOTeachers",
      robots: { index: false, follow: false },
    };
  }

  const postUrl = `${SITE_URL}/blogs/${post.slug || post.id}`;
  const title = `${post.titleBn} | OTOTeachers`;
  const description = post.excerptBn || post.excerptEn || "OTOTeachers ১-অন-১ শিক্ষাদান নির্দেশিকা।";
  const image = post.image || `${SITE_URL}/Assets/Group%202147229264.png`;

  return {
    title: post.titleBn,
    description,
    authors: [{ name: post.author?.nameBn || "OTOTeachers টিম" }],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title,
      description,
      url: postUrl,
      siteName: SITE_NAME,
      locale: "bn_BD",
      type: "article",
      publishedTime: "2026-08-01T00:00:00+06:00",
      authors: [post.author?.nameBn || "OTOTeachers"],
      tags: post.tagsBn,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.titleBn,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.titleBn,
      description,
      images: [image],
    },
  };
}

export default async function SingleBlogPage({ params }: PageProps) {
  const post = await getBlogBySlug(params.id);

  // Return HTTP 404 status if the requested article slug does not exist
  if (!post) {
    notFound();
  }

  const allBlogs = await getBlogs();
  const relatedPosts = allBlogs
    .filter((p) => p.id !== post.id && p.slug !== post.slug)
    .slice(0, 3);

  const postUrl = `${SITE_URL}/blogs/${post.slug || post.id}`;

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "হোম", url: "/" },
    { name: "ব্লগ", url: "/blogs" },
    { name: post.titleBn, url: `/blogs/${post.slug || post.id}` },
  ]);

  const blogPostingSchema = getBlogPostingSchema({
    title: post.titleBn,
    description: post.excerptBn,
    url: postUrl,
    image: post.image,
    authorName: post.author?.nameBn,
    authorRole: post.author?.roleBn,
    publishedDate: "2026-08-01T00:00:00+06:00",
    tags: post.tagsBn,
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={blogPostingSchema} />
      <BlogDetailClient post={post} relatedPosts={relatedPosts} />
    </>
  );
}
