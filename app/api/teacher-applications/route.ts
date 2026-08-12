import { NextResponse } from "next/server";
import {
  getTeacherApplications,
  insertTeacherApplication,
  updateTeacherApplicationStatus,
  deleteTeacherApplication,
  TeacherApplication,
  getTeachers,
  insertTeacher,
  Teacher,
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
      fullName: body.fullName || "আবেদনকারী শিক্ষক",
      phone: body.phone || "",
      email: body.email || "",
      institution: body.institution || "বিশ্ববিদ্যালয়",
      department: body.department || "",
      subjectExpertise: body.subjectExpertise || "Mathematics",
      hoursPerWeek: body.hoursPerWeek || "2-4 hours",
      experience: body.experience || "",
      bio: body.bio || "",
      avatar: body.avatar || "/tutors/tutor-1.png",
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
    if (!updated) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    // When an application is approved, automatically create a verified teacher profile
    if (status === "Approved") {
      try {
        const existingTeachers = await getTeachers();
        const alreadyExists = existingTeachers.some(
          (t) =>
            (t.phone && updated.phone && t.phone === updated.phone) ||
            (t.email && updated.email && t.email.toLowerCase() === updated.email.toLowerCase()) ||
            t.nameEn.toLowerCase() === updated.fullName.toLowerCase()
        );

        if (!alreadyExists) {
          const uniDisplay = updated.department
            ? `${updated.institution} (${updated.department})`
            : updated.institution;

          const newTeacher: Teacher = {
            id: `tutor-${Date.now().toString().slice(-4)}`,
            nameBn: updated.fullName,
            nameEn: updated.fullName,
            universityBn: uniDisplay,
            universityEn: uniDisplay,
            subjectBn: updated.subjectExpertise,
            subjectEn: updated.subjectExpertise,
            avatar: updated.avatar || "/tutors/tutor-1.png",
            phone: updated.phone || "",
            email: updated.email || "",
            experienceBn: updated.experience || "অভিজ্ঞ ১-অন-১ শিক্ষক",
            experienceEn: updated.experience || "Experienced 1-on-1 Mentor",
            bioBn: updated.bio || `${uniDisplay} থেকে ${updated.subjectExpertise} শিক্ষক`,
            bioEn: updated.bio || `Mentor from ${uniDisplay} specializing in ${updated.subjectExpertise}`,
            rating: "5.0",
          };

          await insertTeacher(newTeacher);
        }
      } catch (err) {
        console.error("Failed to auto-create verified teacher on approval:", err);
      }
    }

    return NextResponse.json({ success: true, application: updated });
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

