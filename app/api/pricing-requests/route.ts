import { NextResponse } from "next/server";
import {
  getPricingRequests,
  insertPricingRequest,
  updatePricingRequestStatus,
  deletePricingRequest,
  PricingRequest,
} from "@/lib/db";
import { sendNotificationEmail } from "@/lib/email";

export async function GET() {
  try {
    const requests = await getPricingRequests();
    return NextResponse.json(requests);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pricing requests" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newRequest: PricingRequest = {
      id: `PRC-${Date.now().toString().slice(-4)}`,
      studentName: body.studentName || "Student",
      phone: body.phone || "",
      planName: body.planName || "Custom Plan",
      duration: body.duration || "1 Month",
      monthlyFee: Number(body.monthlyFee) || 5000,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const saved = await insertPricingRequest(newRequest);

    try {
      await sendNotificationEmail({
        formName: "Pricing Request Modal",
        details: {
          "Student Name": newRequest.studentName,
          Phone: newRequest.phone,
          "Plan Name": newRequest.planName,
          Duration: newRequest.duration,
          "Monthly Fee": `${newRequest.monthlyFee} BDT`,
          "Request ID": newRequest.id,
        },
      });
    } catch (e) {
      console.error("Failed to send pricing request notification email:", e);
    }

    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save pricing request" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Request ID required" }, { status: 400 });
    }
    const item = await updatePricingRequestStatus(id, status);
    if (item) {
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
    if (!id) {
      return NextResponse.json({ error: "Request ID required" }, { status: 400 });
    }
    const success = await deletePricingRequest(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete item" }, { status: 500 });
  }
}
