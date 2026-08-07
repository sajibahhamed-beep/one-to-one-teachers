import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.pricingRequests || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDB();
    const newRequest = {
      id: `PRC-${Date.now().toString().slice(-4)}`,
      studentName: body.studentName || "Student",
      phone: body.phone || "",
      planName: body.planName || "Custom Plan",
      duration: body.duration || "1 Month",
      monthlyFee: body.monthlyFee || 5000,
      status: "Pending" as const,
      createdAt: new Date().toISOString(),
    };

    db.pricingRequests.unshift(newRequest);
    saveDB(db);
    return NextResponse.json({ success: true, data: newRequest });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save pricing request" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const db = getDB();
    const item = db.pricingRequests.find((p) => p.id === id);
    if (item) {
      item.status = status;
      saveDB(db);
      return NextResponse.json({ success: true, item });
    }
    return NextResponse.json({ error: "Pricing request not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = getDB();
    db.pricingRequests = db.pricingRequests.filter((p) => p.id !== id);
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
