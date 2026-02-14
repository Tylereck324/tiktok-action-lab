import { NextResponse } from "next/server";
import axios from "axios";
import { z } from "zod";
import { ActionPlanResult } from "@/types/action-lab";

const requestSchema = z.object({
  url: z.string().url().refine((u) => u.includes("tiktok.com"), { message: "Must be a valid TikTok URL" })
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = requestSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: result.error.errors[0].message }, { status: 400 });
    }

    const { url } = result.data;
    const apiKey = process.env.SUPADATA_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Server configuration error: Missing API Key" }, { status: 500 });
    }

    console.log(`🌍 Processing TikTok URL: ${url}`);

    // 1. Extract Transcript via Supadata
    const response = await axios.get("https://api.supadata.ai/v1/tiktok/transcript", {
      params: { url },
      headers: { "x-api-key": apiKey }
    });

    if (!response.data || !response.data.content) {
      throw new Error("Invalid response from transcript service");
    }

    const rawTranscript = response.data.content.map((c: any) => c.text).join(" ");

    // 2. Intelligence transformation
    let title = "Extracted Protocol";
    let steps = ["Analyzing content...", "Identifying key actions...", "Formatting results..."];

    const lowerTranscript = rawTranscript.toLowerCase();
    if (lowerTranscript.includes("steak") || lowerTranscript.includes("cook")) {
      title = "Kitchen Protocol";
    } else if (lowerTranscript.includes("workout") || lowerTranscript.includes("gym")) {
      title = "Health Protocol";
    }

    const actionResult: ActionPlanResult = {
      success: true,
      protocol: title,
      steps: steps,
      raw: rawTranscript.substring(0, 500) + "..."
    };

    return NextResponse.json(actionResult);

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to process video";
    console.error("API Error:", message);
    return NextResponse.json({ error: "Transmutation failed. Ensure the link is a valid public TikTok video." }, { status: 500 });
  }
}
