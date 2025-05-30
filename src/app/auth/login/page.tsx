"use client"

import { Box } from '@mui/material';
import LoadingPage from '@/components/ui/LoadingPage';
import WelcomeFooter from '@/components/layouts/footers/WelcomeFooter';
import LoginPage from '@/features/auth/components/LoginPage';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { metadata } from '@/features/auth/metadata/metadata';

export default function Home() {
  const { user, isAuthLoading } = useAuth();

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
