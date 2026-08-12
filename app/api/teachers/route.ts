import { NextResponse } from "next/server";
import { getTeachers, insertTeacher, updateTeacher, deleteTeacher, Teacher } from "@/lib/db";

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
      id: body.id || `tch-${Date.now()}`,
      nameBn: body.nameBn || "",
      nameEn: body.nameEn || "",
      universityBn: body.universityBn || "বুয়েট",
      universityEn: body.universityEn || "BUET",
      subjectBn: body.subjectBn || "গণিত শিক্ষক",
      subjectEn: body.subjectEn || "Math Tutor",
      avatar:
        body.avatar ||
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      phone: body.phone || "",
      email: body.email || "",
      experienceBn: body.experienceBn || "",
      experienceEn: body.experienceEn || "",
      bioBn: body.bioBn || "",
      bioEn: body.bioEn || "",
      rating: body.rating || "4.9/5",
    };

    const saved = await insertTeacher(newTeacher);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add teacher" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: "Teacher ID required" }, { status: 400 });
    }
    const updatedTeacher: Teacher = {
      id: body.id,
      nameBn: body.nameBn || "",
      nameEn: body.nameEn || "",
      universityBn: body.universityBn || "",
      universityEn: body.universityEn || "",
      subjectBn: body.subjectBn || "",
      subjectEn: body.subjectEn || "",
      avatar: body.avatar || "",
      phone: body.phone || "",
      email: body.email || "",
      experienceBn: body.experienceBn || "",
      experienceEn: body.experienceEn || "",
      bioBn: body.bioBn || "",
      bioEn: body.bioEn || "",
      rating: body.rating || "4.9/5",
    };

    const saved = await updateTeacher(updatedTeacher);
    return NextResponse.json({ success: true, data: saved });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update teacher" }, { status: 500 });
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
