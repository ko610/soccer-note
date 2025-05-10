"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Divider, Skeleton, CircularProgress } from '@mui/material';
import DeleteConfirmModal from '@/components/ui/ConfirmModal';
import { confirmModalText } from '@/constants/ConfirmModalText';
import { sharerText } from '@/constants/SharerText';    
import { deleteNote } from '@/features/note/services/noteService';
import { updateNote } from '@/features/note/services/noteService';
import GameForm from '@/features/note/components/forms/containers/GameForm';
import { NoteType } from '@/types/note/Note';
import { GameModel } from '@/types/note/game/Game';
import ImageGallery from '@/features/note/components/contents/viewer/ImageGallery';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import BasicInfoSection from '../viewer/BasicInfoSection';
import TitleSection from '../viewer/TitleSection';
import TeamSection from '../viewer/TeamSection';
import TextListSection from '../viewer/TextListSection';
import TextSection from '../viewer/TextSection';
import NoteContentsHeader from '../ui/NoteContentsHeader';

type PageProps = {
    allNotes: NoteType[],
    gameNote: GameModel,
    setNotes: (notes: NoteType[]) => void,
    setTabValue: (tabValue: number) => void
}

export default function GameNote({ allNotes, gameNote, setNotes, setTabValue }: PageProps) {
    const router = useRouter()
    const [isEditLoading, setIsEditLoading] = useState(false)

    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState<boolean>(false)

    const { user, isAuthLoading } = useAuth();

    const editButtonClick = () => {
        setEditModalOpen(true)
    }

    const deleteButtonClick = () => {
        setDeleteModalOpen(true)
    }

    const deleteGameContent = async () => {
        setDeleteModalOpen(false)
        await deleteNote(gameNote)
        .then(() => {
            const newNotes = allNotes.filter(value => value.id != gameNote.id)
            setNotes(newNotes)
            setTabValue(newNotes.length == 0 ? 0 : 1)
        })
    }

    const updateGameContent = async (gameNote: NoteType, selectedFiles: File[]) => {
        setEditModalOpen(false)
        setIsEditLoading(true)

        await updateNote(gameNote, selectedFiles).then(() => {
            const newNotes = allNotes.map(note => {
                if (gameNote.id === note.id) {
                    return gameNote;
                }
                return note;
            });
            setNotes(newNotes)
            setIsEditLoading(false)
        })
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} text={confirmModalText.deleteRecode} onSubmit={deleteGameContent} />

            {!isEditLoading ? (
                <>
                    {editModalOpen ? (
                        <GameForm 
                            gameNote={gameNote} 
                            postData={updateGameContent} 
                            onClose={() => setEditModalOpen(false)} 
                            isCreate={false}
                            menu={-1}
                            setMenu={() => {}}
                        />
                    ) : (
                        <Box sx={{ backgroundColor: "#fbfbfb", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", minHeight: "100vh", pb: {xs: "150px", md: "100px"} }}>
                            <NoteContentsHeader note={gameNote} editButtonClick={editButtonClick} deleteButtonClick={deleteButtonClick} sharerText={sharerText} />

                            {gameNote != undefined ?
                                <Box>
                                    <TitleSection title={gameNote.title} />
                                    <BasicInfoSection title="場所" value={gameNote.place} />
                                    <BasicInfoSection title="天気" value={gameNote.weather} />
                                    <BasicInfoSection title="ポジション" value={gameNote.position} />
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={65} />
                            }
                            <Divider />

                            {gameNote != undefined ?
                                <TeamSection teams={gameNote.teams} />
                                :
                                <Skeleton variant="rectangular" height={87} />
                            }
                            
                            <Divider />

                            {gameNote != undefined ?
                                <TextListSection title="良かったところ" list={gameNote.goodPoints} color="#ff5e00" />
                                :
                                <Skeleton variant="rectangular" height={62} />
                            }


                            {gameNote != undefined ?
                                <TextListSection title="悪かった点" list={gameNote.badPoints} color="#007eff" />
                                :
                                <Skeleton variant="rectangular" height={62} />
                            }

                            {gameNote != undefined ?
                                <TextSection title="次に向けて" text={gameNote.next} color="#16b41e" />
                                :
                                <Skeleton variant="rectangular" height={62} />
                            }

                            {/* 画像 */}
                            {gameNote.images && gameNote.images.length > 0 && (
                                <Box>
                                    <Divider />
                                    <ImageGallery images={gameNote.images.map(img => String(img).toString())} />
                                </Box>
                            )}


                            {gameNote != undefined && gameNote.comment != "" &&
                                <Box>
                                    <Divider />
                                    <TextSection title="コメント" text={gameNote.comment} color="black" />
                                </Box>
                            }
                            
                            <Divider />
                        </Box >
                    )}
                </>
            ) : (
                <Box sx={{ textAlign: "center", height: "100vh", marginBottom: "50%", marginTop: "50%" }}>
                    <Typography sx={{ fontSize: 13, textAlign: "center", mb: 2, color: "black" }} component="h2">
                        ノートを保存しています
                    </Typography>
                    <CircularProgress />
                </Box>
            )}
        </>
    )
}

