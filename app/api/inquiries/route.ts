import { NextResponse } from "next/server";
import {
  getInquiries,
  insertInquiry,
  updateInquiryStatus,
  deleteInquiry,
  Inquiry,
} from "@/lib/db";

export async function GET() {
  try {
    const inquiries = await getInquiries();
    return NextResponse.json(inquiries);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newInquiry: Inquiry = {
      id: `INQ-${Date.now().toString().slice(-4)}`,
      name: body.name || "User",
      phone: body.phone || "",
      subject: body.subject || "General Inquiry",
      message: body.message || "",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const saved = await insertInquiry(newInquiry);
    return NextResponse.json({ success: true, inquiry: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create inquiry" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id) {
      return NextResponse.json({ error: "Inquiry ID required" }, { status: 400 });
    }
    const updated = await updateInquiryStatus(id, status);
    if (updated) {
      return NextResponse.json({ success: true, inquiry: updated });
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
    if (!id) {
      return NextResponse.json({ error: "Inquiry ID required" }, { status: 400 });
    }
    const success = await deleteInquiry(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete inquiry" }, { status: 500 });
  }
}
