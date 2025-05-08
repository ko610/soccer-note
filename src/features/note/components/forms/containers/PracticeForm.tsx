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
    const router = useRouter()
    const params = useParams()
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

                    <Box sx={{ my: 1 }}>
                        <Stack sx={{ mb: 1, px: 2 }} direction="row" spacing={0} alignItems="center">
                            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black" }} >タイトル</InputLabel>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                variant="standard"
                                name="title"
                                value={practiceNote.title}
                                onChange={newValue => {
                                    setTitle(newValue.target.value)
                                    practiceNote.title = newValue.target.value
                                }}
                                inputProps={{style: {fontSize: 13}}}
                            />
                        </Stack>

                        <Stack sx={{ mb: 1, px: 2 }} direction="row" spacing={0} alignItems="center">
                            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black" }} >場所</InputLabel>
                            <TextField
                                inputProps={{style: {fontSize: 13}}}
                                fullWidth
                                variant="standard"
                                size="small"
                                name="place"
                                value={practiceNote.place}
                                onChange={newValue => {
                                    setPlace(newValue.target.value)
                                    practiceNote.place = newValue.target.value
                                }}
                            />
                        </Stack>

                        <Stack sx={{ mb: 1, px: 2 }} direction="row" spacing={0} alignItems="center">
                            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black" }} >天気</InputLabel>
                            <Select
                                sx={{ fontSize: 13, backgroundColor: "background.paper", mx: 1 }}
                                variant="standard"
                                name="weather"
                                size="small"
                                fullWidth
                                value={practiceNote.weather}
                                onChange={newValue => {
                                    setWeather(newValue.target.value)
                                    practiceNote.weather = newValue.target.value
                                }}
                            >
                                <MenuItem sx={{ fontSize: 13 }} value="晴れ">晴れ</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value="曇り">曇り</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value="雨">雨</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value="雪">雪</MenuItem>
                            </Select>
                        </Stack>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2, px: 2 }}>
                        <Box sx={{ mb: 1 }}>
                            <Stack sx={{ mb: 1 }} spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                <InputLabel sx={{ mb: 1, fontSize: 13, color: "black" }} >練習内容</InputLabel>
                                <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={AddDetails}>
                                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px"  }} /> 
                                </IconButton>
                            </Stack>
                            {practiceNote.details.map((text: string, index: number) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1 }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={1}
                                        value={practiceNote.details[index]}
                                        onChange={newValue => ChangeDetailsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 13, py: "9px" }}
                                    />
                                    {index != 0 && !practiceNote.details[index] &&
                                        <IconButton onClick={() => deleteDetail(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        {/* <AddInputBox title="取り組んだこと" practiceNote={practiceNote.details} ChangeInput={ChangeDetails} AddInput={AddDetails} /> */}
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2, px: 2 }}>
                        <Box sx={{ my: 1 }}>
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: 1 }}>
                                <InputLabel sx={{ mx: 1, fontSize: 13, color: "#ff5e00", fontWeight: "bold" }}>良い点</InputLabel>
                                <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={AddGoodPoints}>
                                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px"  }} /> 
                                </IconButton>
                            </Stack>
                            {practiceNote.goodPoints.map((text: string, index: number) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1, position: "relative" }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={1}
                                        value={practiceNote.goodPoints[index]}
                                        onChange={newValue => ChangeGoodPointsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 13, py: "9px" }}
                                        placeholder={index == 0 ? "良かったところや良かったプレーなど" : ""}
                                        startAdornment
                                    />
                                    {index != 0 && !practiceNote.goodPoints[index] &&
                                        <IconButton onClick={() => deleteGoodPoint(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        <Box sx={{ my: 1 }}>
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: 1 }}>
                                <InputLabel sx={{ mx: 1, fontSize: 13, color: "#007eff", fontWeight: "bold" }}>悪い点</InputLabel>
                                <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={AddBadPoints}>
                                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px"  }} /> 
                                </IconButton>
                            </Stack>
                            {practiceNote.badPoints.map((text: string, index: number) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1 }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={1}
                                        value={practiceNote.badPoints[index]}
                                        onChange={newValue => ChangeBadPointsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 13, py: "9px" }}
                                        placeholder={index == 0 ? "悪かったところや悪かったプレーなど" : ""}
                                    />
                                    {index != 0 && !practiceNote.badPoints[index] &&
                                        <IconButton onClick={() => deleteBadPoint(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        <Box sx={{ my: 1 }}>
                            <InputLabel sx={{ mb: 1, fontSize: 13, color: "#16b41e", fontWeight: "bold" }}>次に向けて</InputLabel>
                            <FormControl fullWidth sx={{ fontSize: 13 }} variant="outlined">
                                <OutlinedInput
                                    sx={{ m: "0 !important", fontSize: 13, py: "9px" }}
                                    multiline
                                    minRows={1}
                                    value={practiceNote.next}
                                    onChange={newValue => {
                                        setNext(newValue.target.value)
                                        practiceNote.next = newValue.target.value
                                    }}
                                    placeholder='次に向けての目標や取り組むことなど'
                                />
                            </FormControl>
                        </Box>
                    </Box>

                    <Divider />

                    {/* <Box sx={{ my: 2, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 13, mb: 0.5, color: "black" }}>
                            ボード
                        </Typography>
                        <Typography variant="h6" sx={{ fontSize: 12, mb: 1, color: "#888" }}>
                            記録日のボードを選択することができます
                        </Typography>
                        <BoardSelectForm
                            boards={boards}
                            selectedBoards={selectedBoardIds}
                            onBoardSelect={onBoardSelect}
                        />
                    </Box> */}

                    <Divider />

                    <Box sx={{ my: 2, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 13, mb: 1, color: "black" }}>
                            画像
                        </Typography>
                        <ImageSelector
                            selectedFiles={selectedFiles}
                            setSelectedFiles={setSelectedFiles}
                            maxImages={5}
                            isLoading={isImagesLoading}
                        />
                    </Box>

                    <Divider />

                    <Box sx={{ my: 2, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 13, mb: 1, color: "black" }} component="div">
                            コメント
                        </Typography>
                        <FormControl fullWidth sx={{ fontSize: 13 }} variant="outlined">
                            <OutlinedInput
                                sx={{ fontSize: 13, py: "9px" }}
                                multiline
                                minRows={1}
                                value={practiceNote.comment}
                                onChange={newValue => {
                                    setComment(newValue.target.value)
                                    practiceNote.comment = newValue.target.value
                                }}
                                notched={practiceNote.comment != ""}
                            />
                        </FormControl>
                    </Box>
                </Box >

                <Box sx={{ position: 'sticky', bottom: { xs: "135px", md: "80px" }, left: 0, right: 0, backgroundColor: "white", zIndex: 100 }}>
                    <Divider />
                    <Stack justifyContent="center" alignItems="center" sx={{ height: "50px" }} >
                        <Button size="small" fullWidth sx={{ width: "90%", borderRadius: "10px", cursor: isImagesLoading ? "pointer" : "default", backgroundColor: isImagesLoading ? "#aaa !important" : "#2e7d32 !important" }} type='submit'>
                            <Typography fontSize={13} component="p">
                                記録する
                            </Typography>
                        </Button>
                    </Stack>
                </Box>
            </Box >
        </>
    )
}