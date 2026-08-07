import { NextResponse } from "next/server";
import { getDB, saveDB, Inquiry } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.inquiries || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDB();
    const newInquiry: Inquiry = {
      id: `INQ-${Date.now().toString().slice(-4)}`,
      name: body.name || "User",
      phone: body.phone || "",
      subject: body.subject || "General Inquiry",
      message: body.message || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    if (!db.inquiries) db.inquiries = [];
    db.inquiries.unshift(newInquiry);
    saveDB(db);

    return NextResponse.json({ success: true, inquiry: newInquiry }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const db = getDB();

    if (!db.inquiries) db.inquiries = [];
    const index = db.inquiries.findIndex((i) => i.id === id);
    if (index !== -1) {
      db.inquiries[index].status = status;
      saveDB(db);
      return NextResponse.json({ success: true, inquiry: db.inquiries[index] });
    }
    return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = getDB();

    if (id && db.inquiries) {
      db.inquiries = db.inquiries.filter((i) => i.id !== id);
      saveDB(db);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
