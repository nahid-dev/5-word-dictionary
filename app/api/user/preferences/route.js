import { NextResponse } from "next/server";
import UserPreference from "@/models/UserPreference";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req) {
  try {
    await connectToDatabase();
    const { user_id, word_count, preferred_language } = await req.json();

    const updatedPreference = await UserPreference.findOneAndUpdate(
      { user_id }, 
      { word_count, preferred_language },
      { upsert: true, new: true }
    );

    return NextResponse.json({ message: "Preferences saved", data: updatedPreference });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to save preferences" }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    await connectToDatabase();
    const user_id = req.nextUrl.searchParams.get("user_id");
    
    const preferences = await UserPreference.findOne({ user_id });
    if (!preferences) return NextResponse.json({ message: "No preferences found" });

    return NextResponse.json({ preferences });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch preferences" }, { status: 500 });
  }
}

  