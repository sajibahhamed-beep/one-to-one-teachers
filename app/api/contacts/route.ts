import { NextResponse } from "next/server";
import { getContacts, insertContact, deleteContact, ContactMessage } from "@/lib/db";

export async function GET() {
  try {
    const contacts = await getContacts();
    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newMsg: ContactMessage = {
      id: `MSG-${Date.now().toString().slice(-4)}`,
      name: body.name || "Anonymous",
      email: body.email || "",
      phone: body.phone || "",
      subject: body.subject || "General Inquiry",
      message: body.message || "",
      createdAt: new Date().toISOString(),
    };

    const saved = await insertContact(newMsg);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Message ID required" }, { status: 400 });
    }
    const success = await deleteContact(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}
