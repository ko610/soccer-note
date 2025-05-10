"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, Divider, Skeleton, CircularProgress } from '@mui/material';
import { deleteNote } from '@/features/note/services/noteService';
import { updateNote } from '@/features/note/services/noteService';
import DeleteConfirmModal from '@/components/ui/ConfirmModal';
import { confirmModalText } from '@/constants/ConfirmModalText';
import { sharerText } from '@/constants/SharerText'; 
import PracticeForm from '@/features/note/components/forms/containers/PracticeForm';
import { NoteType } from '@/types/note/Note';
import { PracticeModel } from '@/types/note/practice/Practice';
import ImageGallery from '@/features/note/components/contents/viewer/ImageGallery';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import TextSection from '../viewer/TextSection';
import TitleSection from '../viewer/TitleSection';
import TextListSection from '../viewer/TextListSection';
import NoteContentsHeader from '../ui/NoteContentsHeader';

type PageProps = {
    allNotes: NoteType[],
    setNotes: (notes: NoteType[]) => void,
    practiceNote: PracticeModel,
    boards: any[],
    setTabValue: (tabValue: number) => void
}

export default function PracticeContentBox({ allNotes, practiceNote, setNotes, boards, setTabValue }: PageProps) {
    const router = useRouter()
    const [isEditLoading, setIsEditLoading] = React.useState(false)

    const [deleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [editModalOpen, setEditModalOpen] = React.useState<boolean>(false)

    const { user, isAuthLoading } = useAuth();  

    const editButtonClick = () => {
        setEditModalOpen(true)
    }

    const deleteButtonClick = () => {
        setDeleteModalOpen(true)
    }

    const deletePracticeContent = async () => {
        setDeleteModalOpen(false)
        await deleteNote(practiceNote)
        .then(() => {
            const newContents = allNotes.filter(value => value.id != practiceNote.id)
            setNotes(newContents)
            setTabValue(newContents.length == 0 ? 0 : 1)
        })
    }

    const updatePracticeContent = async (practiceNote: NoteType, selectedFiles: File[]) => {
        setEditModalOpen(false)
        setIsEditLoading(true)

        await updateNote(practiceNote, selectedFiles).then((data) => {
            const newNotes = allNotes.map(note => {
                if (note.id === practiceNote.id) {
                    return practiceNote;
                }
                return note;
            });
            setNotes(newNotes)
            setIsEditLoading(false)
        })
    }

    return (
        <>
            <DeleteConfirmModal open={deleteModalOpen} setOpen={setDeleteModalOpen} text={confirmModalText.deleteRecode} onSubmit={deletePracticeContent} />
            
            {!isEditLoading ? ( 
                <>
                    {editModalOpen ? (
                        <PracticeForm 
                            practiceNote={practiceNote} 
                            postData={updatePracticeContent} 
                            boards={boards} 
                            onClose={() => setEditModalOpen(false)} 
                            isCreate={false}
                            menu={-1}
                            setMenu={() => {}}
                        />
                    ) : (
                        <Box sx={{ backgroundColor: "#fbfbfb", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", minHeight: "100vh", pb: {xs: "150px", md: "100px"} }}>
                            <NoteContentsHeader note={practiceNote} editButtonClick={editButtonClick} deleteButtonClick={deleteButtonClick} sharerText={sharerText} />

                            {practiceNote != undefined ?
                                <Box>
                                    <TitleSection title={practiceNote.title} />
                                    <TextSection title="場所" text={practiceNote.place} color="black" />
                                    <TextSection title="天気" text={practiceNote.weather} color="black" />
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={94} />
                            }

                            <Divider />

                            {practiceNote != undefined ?
                                <TextListSection title="練習メニュー" list={practiceNote.details} color="black" />
                                :
                                <Skeleton variant="rectangular" height={62} />
                            }

                    <Divider />

                    {practiceNote != undefined ?
                        <TextListSection title="良かったところ" list={practiceNote.goodPoints} color="#ff5e00" />
                        :
                        <Skeleton variant="rectangular" height={62} />
                    }

                    {practiceNote != undefined ?
                        <TextListSection title="悪かった点" list={practiceNote.badPoints} color="#007eff" />
                        :
                        <Skeleton variant="rectangular" height={62} />
                    }

                    {practiceNote != undefined ?
                        <TextSection title="次に向けて" text={practiceNote.next} color="#16b41e" />
                        :
                        <Skeleton variant="rectangular" height={62} />
                    }

                    {/* 画像 */}
                    {practiceNote.images && practiceNote.images.length > 0 &&
                        <Box>
                            <Divider />
                            <ImageGallery images={practiceNote.images.map((img: string) => String(img).toString())} />
                        </Box>
                    }

                    {practiceNote != undefined && practiceNote.comment != "" &&
                        <Box>
                            <Divider />
                            <TextSection title="コメント" text={practiceNote.comment} color="black" />
                        </Box>
                    }

                    <Divider />
                </Box >)}
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