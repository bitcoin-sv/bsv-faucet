'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { BsvTextLogo } from '@/components/icons';
import { useRouter } from 'next/navigation'; // Import useRouter

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      // Replace this with your sign-up logic
      await signUpWithEmail(email, password); // Hypothetical function for signing up
      router.push('/'); // Redirect after successful sign-up
    } catch (err) {
      setError('Sign up failed, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push('/login'); 
  };

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <div className="flex justify-center mt-4">
          <BsvTextLogo className="h-12 w-15 transition-all group-hover:scale-110" />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Sign Up</CardTitle>
          <CardDescription>
            Please create an account by filling in the details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="w-full space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-3 py-2 border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full px-3 py-2 border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="mt-1 w-full px-3 py-2 border rounded-md"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="mt-4 text-center">
            <span className="text-sm">
              Already have an account?{' '}
              <button
                onClick={handleLoginRedirect}
                className="text-blue-500 hover:underline"
              >
                Login
              </button>
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

// Hypothetical function for signing up
async function signUpWithEmail(email: string, password: string) {
  // Implement your sign-up logic here
}
