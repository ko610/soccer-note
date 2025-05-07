"use client"

import { useState } from "react";
import type { User } from "firebase/auth"
import { Box } from "@mui/material";
import LoadingPage from "@/components/LoadingPage";
import WelcomeFooter from "@/components/footers/WelcomeFooter";
import LoginPage from "@/features/auth/components/LoginPage";

export default function Home() {
  const [user, setUser] = useState<User | undefined>(undefined);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {user != undefined ?
        <LoadingPage />
        :
        <Box>
          <LoginPage />
          <WelcomeFooter />
        </Box>
      }
    </main>
  );
}
