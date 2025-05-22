import type { ReactNode } from 'react';
import Link from 'next/link';
import { Home } from 'lucide-react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <div className="absolute left-4 top-4">
        <Link href="/" aria-label="Back to home">
          <Home className="h-8 w-8 text-foreground hover:text-accent transition-colors" />
        </Link>
      </div>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  );
}
