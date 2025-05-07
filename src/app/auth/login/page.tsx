"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import LoadingPage from "@/components/LoadingPage";
import WelcomeFooter from "@/components/footers/WelcomeFooter";
import LoginPage from "@/features/auth/components/LoginPage";
import { useGetAuth } from "@/features/auth/hooks/useGetAuth";
export default function Home() {
  const router = useRouter();
  const [user, setUser, isAuthLoading] = useGetAuth();

  useEffect(() => {
    if (user) {
      router.push("/home");
    }
  }, [user]);

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
