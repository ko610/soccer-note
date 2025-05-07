"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from 'firebase/auth';
import { Box } from '@mui/material';
import LoadingPage from '@/components/ui/LoadingPage';
import WelcomeFooter from '@/components/layouts/footers/WelcomeFooter';
import LoginPage from '@/features/auth/components/LoginPage';
import { useGetAuth } from '@/features/auth/hooks/useGetAuth';
import { metadata } from '@/features/auth/metadata/metadata';

type PageProps = {
  user: User
  setUser: (user: User) => void
  isAuthLoading: boolean
}

export default function Home({user, setUser, isAuthLoading}: PageProps) {
  const router = useRouter();

  useEffect(() => {
    if (!isAuthLoading) {
      if (user) {
        router.push("/note");
      }
    }
  }, [user, isAuthLoading]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {isAuthLoading ?
        <LoadingPage />
        :
        <Box sx={{ width: "100%" }}>
          <LoginPage />
          <WelcomeFooter />
        </Box>
      }
    </main>
  );
}
