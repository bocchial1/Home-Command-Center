"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { User } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Sun, Moon, CloudSun } from "lucide-react";

interface WelcomeWidgetProps {
  user: User | null;
}

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return { text: "Good Morning", Icon: Sun };
  if (hour < 18) return { text: "Good Afternoon", Icon: CloudSun };
  return { text: "Good Evening", Icon: Moon };
}

export default function WelcomeWidget({ user }: WelcomeWidgetProps) {
  const [greeting, setGreeting] = useState(getGreeting());

  useEffect(() => {
    // Update greeting if component is long-lived and crosses time boundaries
    // For most cases, initial greeting is fine. This is more for completeness.
    const timer = setInterval(() => {
      setGreeting(getGreeting());
    }, 60000 * 30); // Update every 30 minutes
    return () => clearInterval(timer);
  }, []);
  
  const { Icon, text } = greeting;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Icon className="mr-3 h-7 w-7 text-accent" />
          {text}, {user?.username || "User"}!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">
          Welcome to your Home Command Center. Here&apos;s what&apos;s happening.
        </p>
      </CardContent>
    </Card>
  );
}
