import { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blogsData";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://ototeachers.com";

  // 1. Core static public pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/subjects`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ssc-online-tuition`,
      lastModified: new Date("2026-08-09"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/hsc-online-tuition`,
      lastModified: new Date("2026-08-09"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/female-online-tutors`,
      lastModified: new Date("2026-08-09"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/become-teacher`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date("2026-08-01"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // 2. Dynamic Blog Post URLs
  const blogs = getAllBlogs();
  const dynamicBlogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug || blog.id}`,
    lastModified: new Date("2026-08-05"),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...dynamicBlogRoutes];
}
