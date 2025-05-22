import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface PlaceholderWidgetProps {
  title: string;
  icon: LucideIcon;
  content?: string;
  className?: string;
}

export default function PlaceholderWidget({ title, icon: Icon, content = "Feature coming soon.", className }: PlaceholderWidgetProps) {
  return (
    <Card className={`shadow-lg ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Icon className="mr-2 h-5 w-5 text-accent" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}
