import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/db";

export async function GET() {
  try {
    const settings = await getSettings();
    return NextResponse.json(settings || {});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const updated = await saveSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
