// This file was created to provide a dedicated sign-in page for users to authenticate with their Google account.
'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Bot } from 'lucide-react';

export default function LoginPage() {
  const { user, signIn, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center bg-background"><p>Loading...</p></div>;
  }

  if (user) {
      return null;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background text-foreground">
        <div className="flex flex-col items-center text-center">
            <Bot className="h-12 w-12 mb-4" />
            <h1 className="text-4xl font-semibold mb-2">Welcome to PocketAI</h1>
            <p className="text-lg text-foreground/80 mb-8">Your personal AI assistant.</p>
            <Button onClick={signIn} size="lg">
                Sign in with Google
            </Button>
      </div>
    </div>
  );
}
