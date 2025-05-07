"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import LoadingPage from '@/components/ui/LoadingPage';
import LeftNavigationBar from '@/components/layouts/navigationBar/LeftNavigationBar';
import BottomNavigationBar from '@/components/layouts/navigationBar/BottomNavigationBar';
import TopHeader from '@/components/layouts/headers/TopHeader';
import MainContainer from '@/components/layouts/container/MainContainer';
import { useGetAuth } from '@/features/auth/hooks/useGetAuth';

export default function Home() {
  const router = useRouter();
  const [user, setUser, isAuthLoading] = useGetAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [displayMenu, setDisplayMenu] = useState<number>(0);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

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
          <LeftNavigationBar />
          <TopHeader date={date} setDate={setDate} displayMenu={displayMenu} setDisplayMenu={setDisplayMenu} showCalendar={showCalendar} setShowCalendar={setShowCalendar} />
          <MainContainer>
            <h1>Home</h1>
          </MainContainer>
          <BottomNavigationBar />
        </Box>
      }
    </main>
  );
}
