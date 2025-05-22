"use server";

import { z } from "zod";
import { summarizeNewsFeed as callSummarizeNewsFeedFlow, SummarizeNewsFeedInput } from "@/ai/flows/summarize-news-feed";

const NewsSummarizerSchema = z.object({
  rssFeedUrls: z.string().min(1, "At least one RSS feed URL is required."),
  interests: z.string().min(1, "Interests are required."),
});

export interface NewsSummarizerState {
  summary?: string;
  error?: string;
  fieldErrors?: {
    rssFeedUrls?: string[];
    interests?: string[];
  };
  timestamp?: number; // To force re-render if needed
}

export async function summarizeNewsAction(
  prevState: NewsSummarizerState | undefined,
  formData: FormData
): Promise<NewsSummarizerState> {
  const rawFormData = {
    rssFeedUrls: formData.get("rssFeedUrls") as string,
    interests: formData.get("interests") as string,
  };

  const validatedFields = NewsSummarizerSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      error: "Invalid input.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      timestamp: Date.now(),
    };
  }

  const rssUrlsArray = validatedFields.data.rssFeedUrls
    .split(',')
    .map(url => url.trim())
    .filter(url => url.length > 0);

  if (rssUrlsArray.length === 0) {
    return {
      error: "Invalid RSS feed URLs format. Please provide comma-separated URLs.",
      fieldErrors: { rssFeedUrls: ["Invalid RSS feed URLs format."] },
      timestamp: Date.now(),
    };
  }
  
  const input: SummarizeNewsFeedInput = {
    rssFeedUrls: rssUrlsArray,
    interests: validatedFields.data.interests,
  };

  try {
    // The AI flow itself might not fetch, but will use the text.
    const result = await callSummarizeNewsFeedFlow(input);
    if (result && result.summary) {
      return { summary: result.summary, timestamp: Date.now() };
    } else {
      return { error: "Failed to generate summary or summary was empty.", timestamp: Date.now() };
    }
  } catch (e: any) {
    console.error("Error in summarizeNewsAction:", e);
    return { error: e.message || "An unexpected error occurred.", timestamp: Date.now() };
  }
}
