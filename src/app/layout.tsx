import type { Metadata } from 'next';
// Removed: import { GeistSans } from 'geist/font/sans';
// Removed: import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

// Removed: const geistSans = GeistSans; 

export const metadata: Metadata = {
  title: 'Home Command Center',
  description: 'Your personalized home dashboard.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark"> {/* Apply dark class globally */}
      <body
        className="antialiased" // Removed geistSans.variable
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
