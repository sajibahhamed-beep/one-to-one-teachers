import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.faqs || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDB();
    const newFaq = {
      id: `faq-${Date.now()}`,
      qBn: body.qBn || "",
      qEn: body.qEn || "",
      aBn: body.aBn || "",
      aEn: body.aEn || "",
    };

    db.faqs.push(newFaq);
    saveDB(db);
    return NextResponse.json({ success: true, data: newFaq });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save FAQ" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = getDB();
    db.faqs = db.faqs.filter((f) => f.id !== id);
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
