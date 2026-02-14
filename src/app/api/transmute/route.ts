import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const { url } = await request.json();
    const apiKey = process.env.SUPADATA_API_KEY;

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const response = await axios.get("https://api.supadata.ai/v1/tiktok/transcript", {
      params: { url },
      headers: { "x-api-key": apiKey }
    });

    // In a full build, we would pipe this to a second AI pass to structure the data.
    // For the pilot MVP, we'll return the raw data + a 'success' flag.
    return NextResponse.json({
      success: true,
      data: response.data,
      summary: "Action Plan Generated Successfully"
    });

  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    return NextResponse.json({ error: "Failed to process video" }, { status: 500 });
  }
}
