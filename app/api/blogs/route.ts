import { NextResponse } from "next/server";
import { getBlogs, insertBlog, updateBlog, deleteBlog } from "@/lib/db";
import { BlogPost } from "@/lib/blogsData";

export async function GET() {
  try {
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slug = body.slug
      ? body.slug.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
      : `article-${Date.now()}`;

    const newBlog: BlogPost = {
      id: body.id || slug || `blog-${Date.now()}`,
      slug: slug || `blog-${Date.now()}`,
      titleBn: body.titleBn || "নতুন নিবন্ধ",
      titleEn: body.titleEn || "New Article",
      category: body.category || "mentorship",
      featured: Boolean(body.featured),
      image: body.image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      excerptBn: body.excerptBn || "",
      excerptEn: body.excerptEn || "",
      readTimeBn: body.readTimeBn || "৫ মিনিট পড়া",
      readTimeEn: body.readTimeEn || "5 min read",
      publishedDateBn: body.publishedDateBn || "০৬ আগস্ট, ২০২৬",
      publishedDateEn: body.publishedDateEn || "Aug 06, 2026",
      author: {
        nameBn: body.author?.nameBn || body.authorNameBn || "OTOTeachers টিম",
        nameEn: body.author?.nameEn || body.authorNameEn || "OTOTeachers Team",
        roleBn: body.author?.roleBn || body.authorRoleBn || "একাডেমিক মেন্টর",
        roleEn: body.author?.roleEn || body.authorRoleEn || "Academic Mentor",
        institutionBn: body.author?.institutionBn || body.authorUniBn || "বুয়েট ও ঢাবি",
        institutionEn: body.author?.institutionEn || body.authorUniEn || "BUET & DU",
        avatar: body.author?.avatar || body.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      tagsBn: Array.isArray(body.tagsBn)
        ? body.tagsBn
        : typeof body.tagsBn === "string"
        ? body.tagsBn.split(",").map((t: string) => t.trim()).filter(Boolean)
        : ["১-অন-১ মেন্টরিং", "শিক্ষা পদ্ধতি"],
      tagsEn: Array.isArray(body.tagsEn)
        ? body.tagsEn
        : typeof body.tagsEn === "string"
        ? body.tagsEn.split(",").map((t: string) => t.trim()).filter(Boolean)
        : ["1-on-1 Mentoring", "Study Tips"],
      introBn: body.introBn || body.excerptBn || "",
      introEn: body.introEn || body.excerptEn || "",
      sectionsBn: Array.isArray(body.sectionsBn) && body.sectionsBn.length > 0
        ? body.sectionsBn
        : [
            {
              heading: body.sectionHeadingBn || body.titleBn,
              paragraphs: body.contentBn ? [body.contentBn] : [body.excerptBn || "বিস্তারিত বিবরণ..."],
              callout: body.calloutBn || undefined,
            },
          ],
      sectionsEn: Array.isArray(body.sectionsEn) && body.sectionsEn.length > 0
        ? body.sectionsEn
        : [
            {
              heading: body.sectionHeadingEn || body.titleEn,
              paragraphs: body.contentEn ? [body.contentEn] : [body.excerptEn || "Detailed content..."],
              callout: body.calloutEn || undefined,
            },
          ],
      keyTakeawaysBn: Array.isArray(body.keyTakeawaysBn)
        ? body.keyTakeawaysBn
        : typeof body.keyTakeawaysBn === "string"
        ? body.keyTakeawaysBn.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [],
      keyTakeawaysEn: Array.isArray(body.keyTakeawaysEn)
        ? body.keyTakeawaysEn
        : typeof body.keyTakeawaysEn === "string"
        ? body.keyTakeawaysEn.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [],
    };

    const saved = await insertBlog(newBlog);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    console.error("POST /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id && !body.slug) {
      return NextResponse.json({ error: "Blog ID or Slug required" }, { status: 400 });
    }

    const updatedBlog: BlogPost = {
      id: body.id || body.slug,
      slug: body.slug,
      titleBn: body.titleBn || "নিবন্ধ",
      titleEn: body.titleEn || "Article",
      category: body.category || "mentorship",
      featured: Boolean(body.featured),
      image: body.image || "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
      excerptBn: body.excerptBn || "",
      excerptEn: body.excerptEn || "",
      readTimeBn: body.readTimeBn || "৫ মিনিট পড়া",
      readTimeEn: body.readTimeEn || "5 min read",
      publishedDateBn: body.publishedDateBn || "০৬ আগস্ট, ২০২৬",
      publishedDateEn: body.publishedDateEn || "Aug 06, 2026",
      author: {
        nameBn: body.author?.nameBn || body.authorNameBn || "OTOTeachers টিম",
        nameEn: body.author?.nameEn || body.authorNameEn || "OTOTeachers Team",
        roleBn: body.author?.roleBn || body.authorRoleBn || "একাডেমিক মেন্টর",
        roleEn: body.author?.roleEn || body.authorRoleEn || "Academic Mentor",
        institutionBn: body.author?.institutionBn || body.authorUniBn || "বুয়েট ও ঢাবি",
        institutionEn: body.author?.institutionEn || body.authorUniEn || "BUET & DU",
        avatar: body.author?.avatar || body.authorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      },
      tagsBn: Array.isArray(body.tagsBn)
        ? body.tagsBn
        : typeof body.tagsBn === "string"
        ? body.tagsBn.split(",").map((t: string) => t.trim()).filter(Boolean)
        : ["১-অন-১ মেন্টরিং", "শিক্ষা পদ্ধতি"],
      tagsEn: Array.isArray(body.tagsEn)
        ? body.tagsEn
        : typeof body.tagsEn === "string"
        ? body.tagsEn.split(",").map((t: string) => t.trim()).filter(Boolean)
        : ["1-on-1 Mentoring", "Study Tips"],
      introBn: body.introBn || body.excerptBn || "",
      introEn: body.introEn || body.excerptEn || "",
      sectionsBn: Array.isArray(body.sectionsBn) && body.sectionsBn.length > 0
        ? body.sectionsBn
        : [
            {
              heading: body.sectionHeadingBn || body.titleBn,
              paragraphs: body.contentBn ? [body.contentBn] : [body.excerptBn || "বিস্তারিত বিবরণ..."],
              callout: body.calloutBn || undefined,
            },
          ],
      sectionsEn: Array.isArray(body.sectionsEn) && body.sectionsEn.length > 0
        ? body.sectionsEn
        : [
            {
              heading: body.sectionHeadingEn || body.titleEn,
              paragraphs: body.contentEn ? [body.contentEn] : [body.excerptEn || "Detailed content..."],
              callout: body.calloutEn || undefined,
            },
          ],
      keyTakeawaysBn: Array.isArray(body.keyTakeawaysBn)
        ? body.keyTakeawaysBn
        : typeof body.keyTakeawaysBn === "string"
        ? body.keyTakeawaysBn.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [],
      keyTakeawaysEn: Array.isArray(body.keyTakeawaysEn)
        ? body.keyTakeawaysEn
        : typeof body.keyTakeawaysEn === "string"
        ? body.keyTakeawaysEn.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [],
    };

    const updated = await updateBlog(updatedBlog);
    if (updated) {
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ error: "Blog not found" }, { status: 404 });
  } catch (error) {
    console.error("PUT /api/blogs error:", error);
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Blog ID required" }, { status: 400 });
    }
    const success = await deleteBlog(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
