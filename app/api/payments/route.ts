import { NextResponse } from "next/server";
import {
  getPayments,
  insertPayment,
  updatePaymentStatus,
  deletePayment,
  Payment,
} from "@/lib/db";

export async function GET() {
  try {
    const payments = await getPayments();
    return NextResponse.json(payments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
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

    const saved = await insertPayment(newPayment);
    return NextResponse.json({ success: true, payment: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to record payment" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id) {
      return NextResponse.json({ error: "Payment ID required" }, { status: 400 });
    }
    const updated = await updatePaymentStatus(id, status);
    if (updated) {
      return NextResponse.json({ success: true, payment: updated });
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
    if (!id) {
      return NextResponse.json({ error: "Payment ID required" }, { status: 400 });
    }
    const success = await deletePayment(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete payment" }, { status: 500 });
  }
}
