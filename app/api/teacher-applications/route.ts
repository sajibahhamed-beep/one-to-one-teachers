import { NextResponse } from "next/server";
import { getDB, saveDB, TeacherApplication } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.teacherApplications || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDB();
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

    if (!db.teacherApplications) db.teacherApplications = [];
    db.teacherApplications.unshift(newApp);
    saveDB(db);

    return NextResponse.json({ success: true, application: newApp }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const db = getDB();

    if (!db.teacherApplications) db.teacherApplications = [];
    const index = db.teacherApplications.findIndex((a) => a.id === id);
    if (index !== -1) {
      db.teacherApplications[index].status = status;
      saveDB(db);
      return NextResponse.json({ success: true, application: db.teacherApplications[index] });
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
    const db = getDB();

    if (id && db.teacherApplications) {
      db.teacherApplications = db.teacherApplications.filter((a) => a.id !== id);
      saveDB(db);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete application" }, { status: 500 });
  }
}
