import { NextResponse } from "next/server";
import { getTeachers, insertTeacher, deleteTeacher, Teacher } from "@/lib/db";

export async function GET() {
  try {
    const teachers = await getTeachers();
    return NextResponse.json(teachers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch teachers" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTeacher: Teacher = {
      id: `tch-${Date.now()}`,
      nameBn: body.nameBn || "",
      nameEn: body.nameEn || "",
      universityBn: body.universityBn || "বুয়েট",
      universityEn: body.universityEn || "BUET",
      subjectBn: body.subjectBn || "গণিত শিক্ষক",
      subjectEn: body.subjectEn || "Math Tutor",
      avatar:
        body.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    };

    const saved = await insertTeacher(newTeacher);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add teacher" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Teacher ID required" }, { status: 400 });
    }
    const success = await deleteTeacher(id);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 });
  }
}
