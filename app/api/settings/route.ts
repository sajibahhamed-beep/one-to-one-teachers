import { NextResponse } from "next/server";
import { getDB, saveDB } from "@/lib/db";

export async function GET() {
  const db = getDB();
  return NextResponse.json(db.settings || {});
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = getDB();
    db.settings = {
      ...db.settings,
      ...body,
    };
    saveDB(db);
    return NextResponse.json({ success: true, settings: db.settings });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
