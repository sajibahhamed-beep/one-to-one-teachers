import { NextResponse } from "next/server";
import {
  getTeacherApplications,
  insertTeacherApplication,
  updateTeacherApplicationStatus,
  deleteTeacherApplication,
  TeacherApplication,
} from "@/lib/db";

export async function GET() {
  try {
    const apps = await getTeacherApplications();
    return NextResponse.json(apps);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teacher applications" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newApp: TeacherApplication = {
      id: `APP-${Date.now().toString().slice(-4)}`,
      fullName: body.fullName || "আবেদনকারী",
      phone: body.phone || "",
      email: body.email || "",
      institution: body.institution || "",
      subjectExpertise: body.subjectExpertise || "Mathematics",
      hoursPerWeek: body.hoursPerWeek || "2-4 hours",
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    const saved = await insertTeacherApplication(newApp);
    return NextResponse.json({ success: true, application: saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id) {
      return NextResponse.json({ error: "Application ID required" }, { status: 400 });
    }
    const updated = await updateTeacherApplicationStatus(id, status);
    if (updated) {
      return NextResponse.json({ success: true, application: updated });
    }
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Application ID required" }, { status: 400 });
    }
    const success = await deleteTeacherApplication(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
