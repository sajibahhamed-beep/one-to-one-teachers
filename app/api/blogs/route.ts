import { NextResponse } from "next/server";
import { getBlogs, insertBlog, deleteBlog } from "@/lib/db";

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
    const newBlog = {
      id: `${Date.now()}`,
      slug: body.slug || `blog-${Date.now()}`,
      titleBn: body.titleBn || "নতুন নিবন্ধ",
      titleEn: body.titleEn || "New Article",
      category: body.category || "mentorship",
      excerptBn: body.excerptBn || "বিবরণ...",
      publishedDateBn: body.publishedDateBn || "০৬ আগস্ট, ২০২৬",
      image: body.image || "",
    };

    const saved = await insertBlog(newBlog);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
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
