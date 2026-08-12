import { NextResponse } from "next/server";
import { getFAQs, insertFAQ, updateFAQ, deleteFAQ, FAQItem } from "@/lib/db";

export async function GET() {
  try {
    const faqs = await getFAQs();
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      qBn: body.qBn || "",
      qEn: body.qEn || "",
      aBn: body.aBn || "",
      aEn: body.aEn || "",
    };

    const saved = await insertFAQ(newFaq);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save FAQ" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "FAQ ID required" }, { status: 400 });
    }
    const updated = await updateFAQ({
      id: body.id,
      qBn: body.qBn || "",
      qEn: body.qEn || "",
      aBn: body.aBn || "",
      aEn: body.aEn || "",
    });
    if (updated) {
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ error: "FAQ not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "FAQ ID required" }, { status: 400 });
    }
    const success = await deleteFAQ(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
