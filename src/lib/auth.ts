// src/lib/auth.ts (placeholder)
"use server"; // Marking for potential server-side logic, even if mock

import { redirect } from 'next/navigation';

export type User = {
  id: string;
  username: string;
  email: string;
};

// Simulate a logged-in user. In a real app, this would involve session/token management.
// This state is server-side and will reset on server restart / recompile in dev.
// For a persistent mock, you'd need to use cookies or a simple file/db.
let MOCK_USER: User | null = null; 

export async function getCurrentUser(): Promise<User | null> {
  return MOCK_USER;
}

export async function signIn(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // Basic validation - Replace with actual auth logic
  if (email === 'user@example.com' && password === 'password') {
    MOCK_USER = { id: '1', username: 'DemoUser', email: 'user@example.com' };
    return { success: true };
  }
  if (email === 'admin@example.com' && password === 'adminpass') {
    MOCK_USER = { id: '0', username: 'AdminUser', email: 'admin@example.com' };
    return { success: true };
  }
  return { error: 'Invalid credentials. Try user@example.com / password' };
}

export async function signUp(formData: FormData): Promise<{ error?: string; message?: string }> {
  const username = formData.get('username') as string;
  const email = formData.get('email') as string;
  // In a real app, save user to DB with 'pending_approval' status
  console.log(`Signup attempt: ${username}, ${email}`);
  return { message: 'Account created. Waiting for admin approval.' };
}

export async function forgotPasswordAction(formData: FormData): Promise<{ message?: string; error?: string }> {
  const email = formData.get('email') as string;
  console.log(`Forgot password attempt for: ${email}`);
  // In a real app, you would send a password reset email.
  return { message: 'If an account with this email exists, a password reset link has been sent.' };
}

export async function changePasswordAction(formData: FormData): Promise<{ error?: string; message?: string }> {
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    // Add validation and actual password change logic here
    if (!currentPassword || !newPassword) {
        return { error: "All fields are required." };
    }
    console.log(`Password change attempt for user: ${MOCK_USER?.email}`);
    return { message: 'Password changed successfully (simulated).' };
}

export async function signOutAction(): Promise<void> {
  MOCK_USER = null;
  redirect('/login');
}
