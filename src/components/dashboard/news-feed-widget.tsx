"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Rss, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { useFormState, useFormStatus } from "react-dom";
import { summarizeNewsAction, type NewsSummarizerState } from "@/lib/actions";
import { useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const initialState: NewsSummarizerState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Summarizing...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Summarize News
        </>
      )}
    </Button>
  );
}

export default function NewsFeedWidget() {
  const [state, formAction] = useFormState(summarizeNewsAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.error && !state.fieldErrors) {
      toast({
        variant: "destructive",
        title: "Summarization Error",
        description: state.error,
      });
    }
    if (state?.summary) {
       toast({
        title: "News Summarized",
        description: "Your personalized news summary is ready.",
      });
      // formRef.current?.reset(); // Optionally reset form on success
    }
  }, [state, toast]);

  return (
    <Card className="shadow-lg col-span-1 md:col-span-2 lg:col-span-3"> {/* Takes full width on small, up to 3 cols on large */}
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Rss className="mr-2 h-5 w-5 text-accent" />
          AI News Summarizer
        </CardTitle>
        <CardDescription>
          Enter RSS feed URLs (comma-separated) and your interests to get a personalized news summary.
          The AI will use the text of your inputs to generate a summary.
        </CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="rssFeedUrls">RSS Feed URLs</Label>
            <Textarea
              id="rssFeedUrls"
              name="rssFeedUrls"
              placeholder="e.g., https://rss.nytimes.com/services/xml/rss/nyt/World.xml, https://feeds.bbci.co.uk/news/world/rss.xml"
              rows={3}
              aria-describedby="rssFeedUrls-error"
            />
            {state?.fieldErrors?.rssFeedUrls && (
              <p id="rssFeedUrls-error" className="text-sm text-destructive mt-1">
                {state.fieldErrors.rssFeedUrls.join(", ")}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="interests">Interests</Label>
            <Input
              id="interests"
              name="interests"
              placeholder="e.g., technology, climate change, space exploration"
              aria-describedby="interests-error"
            />
            {state?.fieldErrors?.interests && (
              <p id="interests-error" className="text-sm text-destructive mt-1">
                {state.fieldErrors.interests.join(", ")}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <SubmitButton />
          {state?.error && !state.fieldErrors && (
             <div className="text-sm text-destructive flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {state.error}
            </div>
          )}
        </CardFooter>
      </form>
      
      {state?.summary && (
        <div className="p-6 border-t border-border">
          <h3 className="text-lg font-semibold mb-2">Summary:</h3>
          <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/30 p-4 rounded-md shadow">
            <p className="whitespace-pre-wrap">{state.summary}</p>
          </div>
        </div>
      )}
    </Card>
  );
}
