import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const apiKey = process.env.SUPADATA_API_KEY;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    console.log(`🌍 Processing TikTok URL: ${url}`);

    // 1. Extract Transcript via Supadata
    const response = await axios.get("https://api.supadata.ai/v1/tiktok/transcript", {
      params: { url },
      headers: { "x-api-key": apiKey }
    });

    const rawTranscript = response.data.content.map((c: any) => c.text).join(" ");

    // 2. Mocking the "Brain" transformation for the pilot.
    // In production, this hands the transcript to a dedicated Gemini/Codex prompt.
    let title = "Extracted Protocol";
    let steps = ["Analyzing content...", "Identifying key actions...", "Formatting results..."];

    if (rawTranscript.toLowerCase().includes("steak") || rawTranscript.toLowerCase().includes("cook")) {
      title = "Kitchen Protocol";
    } else if (rawTranscript.toLowerCase().includes("workout") || rawTranscript.toLowerCase().includes("gym")) {
      title = "Health Protocol";
    }

    return NextResponse.json({
      success: true,
      protocol: title,
      steps: steps,
      raw: rawTranscript.substring(0, 500) + "..."
    });

  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Transmutation failed. Ensure the link is a valid public TikTok video." }, { status: 500 });
  }
}
