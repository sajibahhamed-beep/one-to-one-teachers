import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.teachers || []);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDB();
    const newTeacher = {
      id: `tch-${Date.now()}`,
      nameBn: body.nameBn || "",
      nameEn: body.nameEn || "",
      universityBn: body.universityBn || "বুয়েট",
      universityEn: body.universityEn || "BUET",
      subjectBn: body.subjectBn || "গণিত শিক্ষক",
      subjectEn: body.subjectEn || "Math Tutor",
      avatar: body.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    };

    db.teachers.unshift(newTeacher);
    saveDB(db);
    return NextResponse.json({ success: true, data: newTeacher });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add teacher" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const db = getDB();
    db.teachers = db.teachers.filter((t) => t.id !== id);
    saveDB(db);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete teacher" }, { status: 500 });
  }
}
