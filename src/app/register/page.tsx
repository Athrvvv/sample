// This file was created to provide a registration page for new users.
'use client';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function RegisterPage() {
  const { user, registerWithEmail, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerWithEmail(email, password);
      router.push('/');
    } catch (error: any) {
      console.error('Registration error', error.message);
      toast({
        title: 'Registration Failed',
        description: error.message || 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="flex h-screen w-full items-center justify-center bg-background"><p>Loading...</p></div>;
  }
  
  if (user) {
    return null;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <div className="flex w-full h-full">
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-sm space-y-6">
                    <div className="flex flex-col items-center text-center">
                        <Bot className="h-12 w-12 mb-4" />
                        <h1 className="text-4xl font-semibold mb-2">Create an Account</h1>
                        <p className="text-lg text-foreground/80">Get started with your personal AI assistant.</p>
                    </div>
                    <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-1"
                            />
                        </div>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </Button>
                    </form>
                    <p className="text-center text-sm text-foreground/80">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-primary hover:underline">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
            <div className="hidden md:flex flex-1 bg-card"></div>
        </div>
    </div>
  );
}
