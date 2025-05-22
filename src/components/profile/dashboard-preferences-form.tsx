"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";
// import { useToast } from "@/hooks/use-toast";

export default function DashboardPreferencesForm() {
  // const { toast } = useToast();

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // Add logic to save preferences
  //   toast({
  //     title: "Preferences Saved",
  //     description: "Your dashboard preferences have been updated (simulated).",
  //   });
  // };

  return (
    <Card className="w-full max-w-lg shadow-lg">
      <CardHeader>
        <CardTitle>Dashboard Preferences</CardTitle>
        <CardDescription>Customize your dashboard appearance and widget selection. (Feature in development)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 
        Example for future implementation:
        <div className="flex items-center space-x-2">
          <Switch id="dark-mode-toggle" defaultChecked />
          <Label htmlFor="dark-mode-toggle">Enable Dark Mode</Label>
        </div>
        <div>
          <h4 className="font-medium mb-2">Widget Selection</h4>
          <p className="text-sm text-muted-foreground">
            Widget selection and reordering functionality will be available here.
          </p>
        </div> 
        */}
        <p className="text-sm text-muted-foreground">
          More customization options are coming soon, including theme adjustments and widget management.
        </p>
        <Button type="submit" disabled className="w-full sm:w-auto">Save Preferences (Disabled)</Button>
      </CardContent>
    </Card>
  );
}
