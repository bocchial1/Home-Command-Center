import ChangePasswordForm from '@/components/profile/change-password-form';
import DashboardPreferencesForm from '@/components/profile/dashboard-preferences-form';
import { Separator } from '@/components/ui/separator';

export default function ProfilePage() {
  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="space-y-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Profile</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>
        
        <Separator />

        <ChangePasswordForm />

        <Separator />

        <DashboardPreferencesForm />
      </div>
    </div>
  );
}
