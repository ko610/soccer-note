"use client"

import { useParams, useRouter } from 'next/navigation'
import { Box, Stack, Typography, CircularProgress } from '@mui/material';
import GameForm from '@/features/note/components/forms/containers/GameForm';
import PracticeForm from '@/features/note/components/forms/containers/PracticeForm';
import { createNote } from '../../../services/noteService';
import { NoteType } from '@/types/note/Note';
import { GameModel } from '@/types/note/game/Game';
import { useState } from 'react';
import { PracticeModel } from '@/types/note/practice/Practice';

type PageProps = {
    allNotes: NoteType[],
    setNotes: (notes: NoteType[]) => void,
    boards: any[],
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
    isCreate: boolean,
    setIsCreate: (isCreate: boolean) => void,
    date: string,
    setTabValue: (tabValue: number) => void,
}

export default function NoteFormBox({ allNotes, setNotes, boards, isLoading, setIsLoading, isCreate, setIsCreate, date, setTabValue }: PageProps) {
    const params = useParams()
    const router = useRouter()
    const [gameNote, setGameNote] = useState(new GameModel({date: date}));
    const [practiceNote, setPracticeNote] = useState(new PracticeModel({date: date}));
    const [menu, setMenu] = useState(0);

    const InsertNote = async (note: NoteType, selectedFiles: File[]) => {
        setIsLoading(true)
        await createNote(note, selectedFiles).then( async () => {
            const resultNotes = allNotes.slice()
            resultNotes.unshift(note)
            setNotes([...resultNotes])
            setTabValue(1)
            setIsLoading(false)
        })
    }

    return (
        <>
            {!isLoading && menu === 0 && (
                <GameForm 
                    gameNote={gameNote} 
                    postData={InsertNote} 
                    boards={boards} 
                    onClose={() => setIsCreate(false)} 
                    isCreate={true} 
                    menu={menu} 
                    setMenu={setMenu} 
                />
            )}

            {!isLoading && menu === 1 && (
                <PracticeForm 
                    practiceNote={practiceNote} 
                    postData={InsertNote} 
                    boards={boards} 
                    onClose={() => setIsCreate(false)} 
                    isCreate={true} 
                    menu={menu} 
                    setMenu={setMenu} 
                />
            )}

            {isLoading && (
                <Stack direction="row" justifyContent="center" alignItems="center" sx={{backgroundColor: "#fbfbfb", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", height: "100vh", overflowY: "hidden" }}>
                    <Box sx={{ textAlign: "center" }}>
                    <Typography sx={{ fontSize: 13, textAlign: "center", mb: 2, color: "black" }} component="h2">
                        ノートを保存しています
                    </Typography>
                        <CircularProgress />
                    </Box>
                </Stack>
            )}
        </>
    )
}