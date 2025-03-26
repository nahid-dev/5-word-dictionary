import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import UserPreference from "@/models/UserPreference";

export async function GET(req) {
  try {
    await connectToDatabase();

    // Get user_id from query params (for demo, assuming static user_id)
    const user_id = "123456"; // Replace with actual user session ID in a real app

    // Fetch user preferences (word count & language)
    const userPrefs = await UserPreference.findOne({ user_id });

    if (!userPrefs) {
      return NextResponse.json({ error: "User preferences not found" }, { status: 404 });
    }

    const { word_count, preferred_language } = userPrefs;

    // Fetch words from a free dictionary API
    const dictionaryRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${preferred_language}/hello`);
    const dictionaryData = await dictionaryRes.json();

    if (!dictionaryData || !Array.isArray(dictionaryData)) {
      return NextResponse.json({ error: "Failed to fetch words" }, { status: 500 });
    }

    // Simulate fetching multiple words (replace this with actual logic)
    const words = dictionaryData.slice(0, word_count).map(entry => ({
      word: entry.word,
      definition: entry.meanings[0]?.definitions[0]?.definition || "No definition available",
    }));

    return NextResponse.json({ words });
  } catch (error) {
    console.error("Error fetching words:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
