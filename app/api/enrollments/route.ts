import { NextResponse } from "next/server";
import {
  getEnrollments,
  insertEnrollment,
  updateEnrollmentStatus,
  deleteEnrollment,
  Enrollment,
} from "@/lib/db";
import { sendNotificationEmail } from "@/lib/email";

export async function GET() {
  try {
    const enrollments = await getEnrollments();
    return NextResponse.json(enrollments);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newEnrollment: Enrollment = {
      id: `ENR-${Date.now().toString().slice(-4)}`,
      studentName: body.studentName || "Anonymous Student",
      phone: body.phone || "",
      grade: body.grade || "General",
      district: body.district || "Dhaka",
      selectedSubjects: body.selectedSubjects || [],
      preferredTime: body.preferredTime || "Flexible",
      medium: body.medium || "",
      selectedPlan: body.selectedPlan || "Free Trial",
      fee: typeof body.fee === "number" ? body.fee : 0,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const saved = await insertEnrollment(newEnrollment);

    try {
      await sendNotificationEmail({
        formName: "Enrollment / Free Trial Modal",
        details: {
          "Student Name": newEnrollment.studentName,
          Phone: newEnrollment.phone,
          Grade: newEnrollment.grade,
          District: newEnrollment.district,
          "Selected Subjects": newEnrollment.selectedSubjects,
          "Preferred Time": newEnrollment.preferredTime,
          Medium: newEnrollment.medium,
          "Selected Plan": newEnrollment.selectedPlan,
          Fee: `${newEnrollment.fee} BDT`,
          "Enrollment ID": newEnrollment.id,
        },
      });
    } catch (e) {
      console.error("Failed to send enrollment notification email:", e);
    }

    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save enrollment" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Enrollment ID required" }, { status: 400 });
    }
    const item = await updateEnrollmentStatus(id, status);
    if (item) {
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
    if (!id) {
      return NextResponse.json({ error: "Enrollment ID required" }, { status: 400 });
    }
    const success = await deleteEnrollment(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete enrollment" }, { status: 500 });
  }
}
