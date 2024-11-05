'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { signInWithEmail } from '@/lib/auth'; // Hypothetical function for email sign-in
import { BsvTextLogo } from '@/components/icons';
import { signIn } from '@/lib/auth'; // GitHub sign-in function
import { useRouter } from 'next/navigation'; // Import useRouter

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialize useRouter

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmail(email, password); // Custom function to authenticate user
      window.location.href = '/'; // Redirect after successful login
    } catch (err) {
      setError('Invalid credentials, please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      await signIn('github', { redirectTo: '/' }); // GitHub sign-in
    } catch (err) {
      setError('GitHub login failed, please try again.');
    }
  };

  const handleSignupRedirect = () => {
    router.push('/signup'); // Redirect to the signup page
  };

  return (
    <div className="min-h-screen flex justify-center items-start md:items-center p-8">
      <Card className="w-full max-w-sm">
        <div className="flex justify-center mt-4">
          <BsvTextLogo className="h-12 w-15 transition-all group-hover:scale-110" />
        </div>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Please enter your email and password to log in.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="w-full space-y-4">
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <h6 className="text-center">or</h6>
            <Button type="button" className="w-full" onClick={handleGithubSignIn}>
              Sign in with GitHub
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="mt-4 text-center">
            <span className="text-sm">
              Don't have an account?{' '}
              <button
                onClick={handleSignupRedirect}
                className="text-blue-500 hover:underline"
              >
                Sign Up
              </button>
            </span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
