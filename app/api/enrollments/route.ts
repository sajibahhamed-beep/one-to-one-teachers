import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.enrollments || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDB();
    const newEnrollment = {
      id: `ENR-${Date.now().toString().slice(-4)}`,
      studentName: body.studentName || "Anonymous Student",
      phone: body.phone || "",
      grade: body.grade || "General",
      district: body.district || "Dhaka",
      selectedSubjects: body.selectedSubjects || [],
      preferredTime: body.preferredTime || "Flexible",
      fee: body.fee || 6000,
      status: "Pending" as const,
      createdAt: new Date().toISOString(),
    };

    db.enrollments.unshift(newEnrollment);
    saveDB(db);
    return NextResponse.json({ success: true, data: newEnrollment });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save enrollment" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    const db = getDB();
    const item = db.enrollments.find((e) => e.id === id);
    if (item) {
      item.status = status;
      saveDB(db);
      return NextResponse.json({ success: true, item });
    }
    return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update enrollment" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = getDB();
    db.enrollments = db.enrollments.filter((e) => e.id !== id);
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete enrollment" }, { status: 500 });
  }
}
