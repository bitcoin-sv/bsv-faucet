'use client';
import { useClerk } from '@clerk/nextjs';

const SignOutButton = () => {
  const { signOut } = useClerk();
  return <button onClick={() => signOut()}>Sign Out</button>;
};

export default SignOutButton;
