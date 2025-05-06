"use client"

import * as React from 'react';
import type { User } from 'firebase/auth';
import LoadingPage from '@/components/LoadingPage';
import LoginPage from '@/features/auth/components/LoginPage';

export default function Home() {
  const [user, setUser] = React.useState<User | undefined>(undefined);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {user == undefined ?
        <LoadingPage />
        :
        <LoginPage />
      }
    </main>
  );
}
