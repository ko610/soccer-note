"use client"

import { useState } from 'react';
import { Box } from '@mui/material';
import LoadingPage from '@/components/ui/LoadingPage';
import LeftNavigationBar from '@/components/layouts/navigationBar/LeftNavigationBar';
import BottomNavigationBar from '@/components/layouts/navigationBar/BottomNavigationBar';
import SettingHeader from '@/features/setting/components/layouts/SettingHeader';
import SettingMainContainer from '@/features/setting/components/layouts/SettingMainContainer';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import SettingItemList from '@/features/setting/components/SettingItemList';

export default function Home() {
  const { user, isAuthLoading } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [displayMenu, setDisplayMenu] = useState<number>(0);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      {isAuthLoading ?
        <LoadingPage />
        :
        <Box sx={{ width: "100%" }}>
          <LeftNavigationBar />
          <SettingHeader />

          <SettingMainContainer>
            <SettingItemList />
          </SettingMainContainer>

          <BottomNavigationBar />
        </Box>
      }
    </main>
  );
}
