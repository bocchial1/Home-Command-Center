import type { ReactNode } from 'react';
import AppHeader from '@/components/layout/app-header';
import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  // For this demo, if there's no mock user, redirect to login.
  // In a real app, session/token validation would happen here or in middleware.
  if (!user) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
