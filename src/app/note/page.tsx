"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box } from "@mui/material";
import LoadingPage from "@/components/ui/LoadingPage";
import LeftHeader from "@/components/layouts/headers/LeftHeader";
import { useGetAuth } from "@/features/auth/hooks/useGetAuth";

export default function Home() {
  const router = useRouter();
  const [user, setUser, isAuthLoading] = useGetAuth();

  // ログインしていない場合はログイン画面にリダイレクト
  useEffect(() => {
    if (!isAuthLoading)
      if (!user) {
        router.push("/auth/login");
      }
  }, [user, isAuthLoading]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {isAuthLoading ?
        <LoadingPage />
        :
        <Box sx={{ width: "100%" }}>
          <LeftHeader />
          <h1>Home</h1>
        </Box>
      }
    </main>
  );
}
