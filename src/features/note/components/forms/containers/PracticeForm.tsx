"use client"

import { useState, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase/config';
import { Box, Stack, Button, Typography, Divider, OutlinedInput, InputLabel, FormControl, Select, MenuItem, IconButton, CircularProgress, TextField } from '@mui/material';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearIcon from '@mui/icons-material/Clear';
import ConfirmCloseModal from '@/components/ui/ConfirmModal';
import { confirmModalText } from '@/constants/ConfirmModalText';
import { useGetNoteImages } from '@/features/note/hooks/useGetNoteImages';
import NoteTypeSelector from '../ui/NoteTypeSelector';
import { ImageSelector } from '../inputs/ImageSelector';
import { PracticeModel } from '@/types/note/practice/Practice';
import { NoteType } from '@/types/note/Note';
import { theme } from '@/styles/theme';
import { TextFieldSection } from '../inputs/TextFieldSection';
import { SelectSection } from '../inputs/SelectSection';
import { TextAreaSection } from '../inputs/TextAreaSection';
import SubmitButtonBox from '../ui/SubmitButtonBox';
import { AddableTextFieldSection } from '../inputs/AddableTextFieldSection';
import { GameModel } from '@/types/note/game/Game';

type pageProps = {
    practiceNote: PracticeModel,
    postData: (note: NoteType, selectedFiles: File[]) => Promise<void>,
    onClose: () => void,
    boards: any[],
    isCreate: boolean,
    menu: number,
    setMenu: (menu: number) => void
}

export default function PracticeForm({ practiceNote, postData, onClose, boards, isCreate, menu, setMenu }: pageProps) {
    const [note, setNote] = useState<PracticeModel>(practiceNote)

    const [isConfirmCloseModal, setIsConfirmCloseModal] = useState<boolean>(false)
    const [waitFlag, setWaitFlag] = useState(false);
    const [isImagesLoading, setIsImagesLoading] = useState(false)

    const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
        if (!isImagesLoading) {
            event.preventDefault()
            const uid = await auth.currentUser?.uid;
            if (uid) {
                practiceNote.uid = uid
                postData(practiceNote, selectedFiles)
            }
        }
    }

    const [title, setTitle] = useState(practiceNote.title);
    const [place, setPlace] = useState(practiceNote.place);
    const [weather, setWeather] = useState(practiceNote.weather);
    const [details, setDetails] = useState(practiceNote.details);
    const [goodPoints, setGoodPoints] = useState(practiceNote.goodPoints ?? [""]);
    const [badPoints, setBadPoints] = useState(practiceNote.badPoints ?? [""]);
    const [next, setNext] = useState(practiceNote.next);
    const [comment, setComment] = useState(practiceNote.comment);
    const [selectedFiles, setSelectedFiles] = useGetNoteImages(practiceNote.images ?? [], setIsImagesLoading)
    const [selectedBoardIds, setSelectedBoardIds] = useState<string[]>(practiceNote.boardIds || []);

    const onBoardSelect = (boardIds: string[]) => {
        setSelectedBoardIds(boardIds);
        practiceNote.boardIds = boardIds;
    };


    const AddDetails = () => {
        const input = []
        details.forEach((item: string) => {
            input.push(item)
        })
        input.push("")
        setDetails(input)
        practiceNote.details = input
    }

    const deleteDetail = (index: number) => {
        const input: string[] = []
        details.map((item: string, itemIndex: number) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setDetails(input)
        practiceNote.details = input
    }

    const ChangeDetailsContext = (newValue: string, index: number) => {
        const input: string[] = []
        details.forEach((item: string) => {
            input.push(item)
        })
        input[index] = newValue
        setDetails(input)
        practiceNote.details = input
    }

    const ChangeDetailsType = (newValue: string, index: number) => {
        const input: string[] = []
        details.forEach((item: string) => {
            input.push(item)
        })
        input[index] = newValue
        setDetails(input)
        practiceNote.details = input
    }

    const ChangeGoodPointsContext = (newValue: string, index: number) => {
        const input: string[] = []
        goodPoints.forEach((item: string) => {
            input.push(item)
        })
        input[index] = newValue
        setGoodPoints(input)
        practiceNote.goodPoints = input
    }

    const ChangeGoodPointsType = (newValue: string, index: number) => {
        const input: string[] = []
        goodPoints.forEach((item: string) => {
            input.push(item)
        })
        input[index] = newValue
        setGoodPoints(input)
        practiceNote.goodPoints = input
    }

    const AddGoodPoints = () => {
        const input: string[] = []
        goodPoints.forEach((item: string) => {
            input.push(item)
        })
        input.push("")
        setGoodPoints(input)
        practiceNote.goodPoints = input
    }

    const deleteGoodPoint = (index: number) => {
        const input: string[] = []
        goodPoints.map((item: string, itemIndex: number) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setGoodPoints(input)
        practiceNote.goodPoints = input
    }

    const ChangeBadPointsContext = (newValue: string, index: number) => {
        const input: string[] = []
        badPoints.forEach((item: string) => {
            input.push(item)
        })
        input[index] = newValue
        setBadPoints(input)
        practiceNote.badPoints = input
    }

    const ChangeBadPointsType = (newValue: string, index: number) => {
        const input: string[] = []
        badPoints.forEach((item: string) => {
            input.push(item)
        })
        input[index] = newValue
        setBadPoints(input)
        practiceNote.badPoints = input
    }

    const AddBadPoints = () => {
        const input: string[] = []
        badPoints.forEach((item: string) => {
            input.push(item)
        })
        input.push("")
        setBadPoints(input)
        practiceNote.badPoints = input
    }

    const deleteBadPoint = (index: number) => {
        const input: string[] = []
        badPoints.map((item: string, itemIndex: number) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setBadPoints(input)
        practiceNote.badPoints = input
    }

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
                    borderLeft: "solid 0.5px #b2b2b2"
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
                        <TextFieldSection title="タイトル" value={note.title} setValue={(value) => {setNote(new PracticeModel({...note, title: value}))}} />

                        <TextFieldSection title="場所" value={note.place} setValue={(value) => {setNote(new PracticeModel({...note, place: value}))}} />

                        <SelectSection title="天気" value={note.weather} setValue={(value) => {setNote(new PracticeModel({...note, weather: value}))}} options={["晴れ", "曇り", "雨", "雪"]} />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                        <AddableTextFieldSection title="練習内容" placeholder="" values={note.details} setValues={(value) => {setNote(new PracticeModel({...note, details: value}))}} titleColor="black"  />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                        <AddableTextFieldSection title="良い点" placeholder="良かったところや良かったプレーなど" values={note.goodPoints} setValues={(value) => {setNote(new PracticeModel({...note, goodPoints: value}))}} titleColor="#ff5e00" fontWeight="bold" />

                        <AddableTextFieldSection title="悪い点" placeholder="悪かったところや悪かったプレーなど" values={note.badPoints} setValues={(value) => {setNote(new PracticeModel({...note, badPoints: value}))}} titleColor="#007eff" fontWeight="bold" />

                        <TextAreaSection title="次に向けて" placeholder="次に向けての目標や取り組むことなど" value={note.next} setValue={(value) => {setNote(new PracticeModel({...note, next: value}))}} titleColor="#16b41e" fontWeight="bold" />
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
                        <TextAreaSection title="コメント" placeholder="" value={note.comment} setValue={(value) => {setNote(new PracticeModel({...note, comment: value}))}} titleColor="black"  />
                    </Box>
                </Box>

                <SubmitButtonBox isImagesLoading={isImagesLoading} />
            </Box >
        </>
    )
}