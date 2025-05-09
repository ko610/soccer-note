"use client"

import { useState } from 'react';
import { Box } from '@mui/material';
import LoadingPage from '@/components/ui/LoadingPage';
import LeftNavigationBar from '@/components/layouts/navigationBar/LeftNavigationBar';
import BottomNavigationBar from '@/components/layouts/navigationBar/BottomNavigationBar';
import NoteHeader from '@/features/note/components/layouts/NoteHeader';
import NoteMainContainer from '@/features/note/components/layouts/NoteMainContainer'
import { useAuth } from '@/features/auth/contexts/AuthContext';
import NoteSwitcher from '@/features/note/components/container/NoteSwitcher';
import { useNotes } from '@/features/note/hooks/useNotes';

export default function Home() {
  const { isAuthLoading } = useAuth();
  const [date, setDate] = useState<Date>(new Date());
  const [displayMenu, setDisplayMenu] = useState<number>(0);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const { notes, setNotes, isLoading: isNotesLoading } = useNotes(date);

  if (isAuthLoading || isNotesLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <Box sx={{ width: "100%" }}>
        <LeftNavigationBar />
        <NoteHeader 
          date={date} 
          setDate={setDate} 
          displayMenu={displayMenu} 
          setDisplayMenu={setDisplayMenu} 
          showCalendar={showCalendar} 
          setShowCalendar={setShowCalendar} 
        />
        {displayMenu === 0 && (
          <NoteMainContainer>
            <NoteSwitcher 
              notes={notes} 
              setNotes={setNotes} 
              boards={[]} 
              date={date} 
            />
          </NoteMainContainer>
        )}
        <BottomNavigationBar />
      </Box>
    </main>
  );
}
