import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.contacts || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDB();
    const newMsg = {
      id: `MSG-${Date.now().toString().slice(-4)}`,
      name: body.name || "Anonymous",
      email: body.email || "",
      phone: body.phone || "",
      subject: body.subject || "General Inquiry",
      message: body.message || "",
      createdAt: new Date().toISOString(),
    };

    db.contacts.unshift(newMsg);
    saveDB(db);
    return NextResponse.json({ success: true, data: newMsg });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = getDB();
    db.contacts = db.contacts.filter((c) => c.id !== id);
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
