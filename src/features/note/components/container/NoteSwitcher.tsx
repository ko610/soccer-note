"use client"

import { useEffect, useState, SyntheticEvent } from 'react';
import type { User } from 'firebase/auth';
import { Box, Tabs, Tab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import GameNote from '@/features/note/components/contents/notes/GameNote';
import PracticeNote from '@/features/note/components/contents/notes/PracticeNote';
import NoteFormBox from '@/features/note/components/forms/containers/NoteFormBox';
import { NoteType } from '@/types/note/Note';
import { GameModel } from '@/types/note/game/Game';
import { PracticeModel } from '@/types/note/practice/Practice';
import { theme } from '@/styles/theme';
import NoteTabs from '@/features/note/components/ui/NoteTabs';
import NoteTabPanel from '../ui/NoteTabPanel';
import { NoteProvider } from '@/features/note/contexts/NoteContext';

type PageProps = {
    notes: NoteType[],
    setNotes: (notes: NoteType[]) => void,
    date: string
}

export default function NoteSwitcher({ notes, setNotes, date }: PageProps) {
    return (
        <Box sx={{ background: "white", overflowY: "scroll", overflowX: "hidden", position: "fixed", zIndex: 1000, width: "100%", maxWidth: "550px", height: "100%", left: { xs: "50%", md: "unset"}, ml: { xs: "0px", md: "120px", lg: "55px" }, transform: { xs: "translateX(-50%)", md: "translateX(0)" } }}>
            <NoteProvider notes={notes} setNotes={setNotes} date={date}>
                <NoteTabs />
                <NoteTabPanel />
            </NoteProvider>
        </Box>
    )
}