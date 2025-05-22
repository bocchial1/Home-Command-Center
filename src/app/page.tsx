import { redirect } from 'next/navigation';

export default function HomePage() {
  // For this application, the default page for unauthenticated users is login.
  // Authenticated users will be directed to /dashboard from login.
  redirect('/login');
  // This return is technically unreachable due to redirect, but good practice.
  return null; 
}
