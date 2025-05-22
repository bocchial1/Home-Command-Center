import Link from 'next/link';
import { UserNav } from './user-nav';
import type { User } from '@/lib/auth'; // Import the User type
import { LayoutDashboard } from 'lucide-react'; // Icon for title

interface AppHeaderProps {
  user: User | null; // Make user prop explicit
}

export default function AppHeader({ user }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center">
        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
          <LayoutDashboard className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block text-lg">
            Home Command Center
          </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {/* Add other nav links here if needed, e.g.
            <Link href="/dashboard" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/profile" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Profile</Link>
            */}
          </nav>
          <UserNav user={user} />
        </div>
      </div>
    </header>
  );
}
