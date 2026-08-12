import { NextRequest, NextResponse } from "next/server";
import { getCustomPages, getPageBySlug, saveCustomPage, deleteCustomPage } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug") || searchParams.get("id");

    if (slug) {
      const page = await getPageBySlug(slug);
      if (!page) {
        return NextResponse.json({ error: "Page not found" }, { status: 404 });
      }
      return NextResponse.json(page);
    }

    const pages = await getCustomPages();
    return NextResponse.json(pages);
  } catch (error) {
    console.error("GET /api/pages error:", error);
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.slug && !body.id) {
      return NextResponse.json({ error: "Slug or ID is required" }, { status: 400 });
    }

    const savedPage = await saveCustomPage(body);
    return NextResponse.json({ success: true, page: savedPage });
  } catch (error) {
    console.error("POST /api/pages error:", error);
    return NextResponse.json({ error: "Failed to save page" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.slug && !body.id) {
      return NextResponse.json({ error: "Slug or ID is required" }, { status: 400 });
    }

    const savedPage = await saveCustomPage(body);
    return NextResponse.json({ success: true, page: savedPage });
  } catch (error) {
    console.error("PUT /api/pages error:", error);
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id") || searchParams.get("slug");

    if (!id) {
      return NextResponse.json({ error: "ID or slug is required" }, { status: 400 });
    }

    const deleted = await deleteCustomPage(id);
    if (!deleted) {
      return NextResponse.json({ error: "Page not found or could not be deleted" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/pages error:", error);
    return NextResponse.json({ error: "Failed to delete page" }, { status: 500 });
  }
}
