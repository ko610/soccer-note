"use client"

import { FormEvent, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/config';
import { Box, Stack, IconButton, Divider } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import ConfirmCloseModal from '@/components/ui/ConfirmModal';
import { confirmModalText } from '@/constants/ConfirmModalText';
import { useGetNoteImages } from '@/features/note/hooks/useGetNoteImages';
import { GameTeamModel } from '@/types/note/game/GameTeam';
import { GameModel } from '@/types/note/game/Game';
import { NoteType } from '@/types/note/Note';
import { TextFieldSection } from '../inputs/TextFieldSection';
import { ImageSelector } from '../inputs/ImageSelector';
import NoteTypeSelector from '../ui/NoteTypeSelector';
import { TeamFieldSection } from '../inputs/TeamFieldSection';
import { AddableTextFieldSection } from '../inputs/AddableTextFieldSection';
import { TextAreaSection } from '../inputs/TextAreaSection';
import { SelectSection } from '../inputs/SelectSection';
import SubmitButtonBox from '../ui/SubmitButtonBox';

type pageProps = {
    gameNote: GameModel,
    postData: (note: NoteType, selectedFiles: File[]) => Promise<void>,
    onClose: () => void,
    isCreate: boolean,
    menu: number,
    setMenu: (menu: number) => void
}

export default function GameForm({ gameNote, postData, onClose, isCreate, menu, setMenu }: pageProps) {
    const [isConfirmCloseModal, setIsConfirmCloseModal] = useState<boolean>(false)
    const [isImagesLoading, setIsImagesLoading] = useState(false)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (!isImagesLoading) {
            event.preventDefault()
            const uid = await auth.currentUser?.uid;
            if (uid) {
                gameNote.uid = uid
                postData(gameNote, selectedFiles)
            }
        }
    }

    useEffect(() => {
        if (!gameNote.teams) {
            gameNote.teams = [new GameTeamModel({})]
        }
    }, [gameNote])

    const [note, setNote] = useState<GameModel>(gameNote)
    const [selectedFiles, setSelectedFiles] = useGetNoteImages(gameNote.images ?? [], setIsImagesLoading)


    return (
        <>
            <ConfirmCloseModal open={isConfirmCloseModal} setOpen={setIsConfirmCloseModal} text={confirmModalText.cancelRecord} onSubmit={onClose} />
            <Box
                component="form"
                onSubmit={onSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                    paddingBottom: { xs: "148px", md: "90px" },
                    minHeight: "100vh",
                    backgroundColor: "white",
                    borderRight: "solid 0.5px #b2b2b2",
                    borderLeft: "solid 0.5px #b2b2b2",
                }}
                noValidate
                autoComplete="off"
                method='POST'
            >
                {!isCreate &&
                    <Box>
                        <Stack direction="row" sx={{ px: 2, height: "36px" }} alignContent="center" justifyContent="flex-start">
                            <IconButton size="small" sx={{ width: "30px", height: "30px", my: "auto !important" }} onClick={() => setIsConfirmCloseModal(true)}>
                                <ClearIcon sx={{ fontSize: "1.25rem" }} />
                            </IconButton>
                        </Stack>

                        <Divider />
                    </Box>
                }

                <Box>
                    {isCreate &&
                        <Box sx={{ px: 2 }}>
                            <NoteTypeSelector alignment={menu} setAlignment={setMenu} />
                        </Box>
                    }

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                        <TextFieldSection title="タイトル" value={note.title} setValue={(value) => {setNote(new GameModel({...note, title: value}))}} />

                        <TextFieldSection title="場所" value={note.place} setValue={(value) => {setNote(new GameModel({...note, place: value}))}} />

                        <SelectSection title="天気" value={note.weather} setValue={(value) => {setNote(new GameModel({...note, weather: value}))}} options={["晴れ", "曇り", "雨", "雪"]} />

                        <TextFieldSection title="ポジション" value={note.position} setValue={(value) => {setNote(new GameModel({...note, position: value}))}} />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                        <TeamFieldSection teams={note.teams} setTeams={(value) => {setNote(new GameModel({...note, teams: value}))}} />
                    </Box>

                    <Divider />


                    <Box sx={{ my: 2, px: 2 }}>
                        <AddableTextFieldSection title="良い点" placeholder="良かったところや良かったプレーなど" values={note.goodPoints} setValues={(value) => {setNote(new GameModel({...note, goodPoints: value}))}} titleColor="#ff5e00" fontWeight="bold" />

                        <AddableTextFieldSection title="悪い点" placeholder="悪かったところや悪かったプレーなど" values={note.badPoints} setValues={(value) => {setNote(new GameModel({...note, badPoints: value}))}} titleColor="#007eff" fontWeight="bold" />

                        <TextAreaSection title="次に向けて" placeholder="次に向けての目標や取り組むことなど" value={note.next} setValue={(value) => {setNote(new GameModel({...note, next: value}))}} titleColor="#16b41e" fontWeight="bold" />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2, px: 2 }}>
                        <ImageSelector
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                            maxImages={5}
                            isLoading={isImagesLoading}
                        />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2, px: 2 }}>
                        <TextAreaSection title="コメント" placeholder="" value={note.comment} setValue={(value) => {setNote(new GameModel({...note, comment: value}))}} titleColor="black"  />
                    </Box>
                </Box>

                <SubmitButtonBox isImagesLoading={isImagesLoading} />
            </Box >
        </>
    )
}