import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.blogs || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDB();
    const newBlog = {
      id: `${Date.now()}`,
      slug: body.slug || `blog-${Date.now()}`,
      titleBn: body.titleBn || "নতুন নিবন্ধ",
      titleEn: body.titleEn || "New Article",
      category: body.category || "mentorship",
      excerptBn: body.excerptBn || "বিবরণ...",
      publishedDateBn: "০৬ আগস্ট, ২০২৬",
    };

    db.blogs.unshift(newBlog);
    saveDB(db);
    return NextResponse.json({ success: true, data: newBlog });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = getDB();
    db.blogs = db.blogs.filter((b) => b.id !== id);
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
