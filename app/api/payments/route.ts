import { NextResponse } from "next/server";
import { getDB, saveDB, Payment } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.payments || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDB();
    const newPayment: Payment = {
      id: `PAY-${Date.now().toString().slice(-4)}`,
      studentName: body.studentName || body.name || "Student",
      phone: body.phone || "",
      amount: Number(body.amount) || 0,
      trxId: body.trxId || `TRX${Date.now().toString().slice(-6)}`,
      type: body.type || "Fee Collection",
      paymentMethod: body.paymentMethod || "bKash",
      status: body.status || "Paid",
      createdAt: new Date().toISOString(),
    };

    if (!db.payments) db.payments = [];
    db.payments.unshift(newPayment);
    saveDB(db);

    return NextResponse.json({ success: true, payment: newPayment }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record payment" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const db = getDB();

    if (!db.payments) db.payments = [];
    const index = db.payments.findIndex((p) => p.id === id);
    if (index !== -1) {
      db.payments[index].status = status;
      saveDB(db);
      return NextResponse.json({ success: true, payment: db.payments[index] });
    }
    return NextResponse.json({ error: "Payment not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update payment" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = getDB();

    if (id && db.payments) {
      db.payments = db.payments.filter((p) => p.id !== id);
      saveDB(db);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete payment" }, { status: 500 });
  }
}
