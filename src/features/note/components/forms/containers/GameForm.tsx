"use client"

import { FormEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'
import { auth } from '@/lib/firebase/config';
import { Box, Stack, Button, IconButton, Divider, InputLabel, FormControl, Select, MenuItem, TextField, OutlinedInput } from '@mui/material';
import Typography from '@mui/material/Typography';
import ClearIcon from '@mui/icons-material/Clear';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import ConfirmCloseModal from '@/components/ui/ConfirmModal';
import { confirmModalText } from '@/constants/ConfirmModalText';
import { useGetNoteImages } from '@/features/note/hooks/useGetNoteImages';
import { GameTeamModel } from '@/types/note/game/GameTeam';

import { theme } from '@/styles/theme';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { GameModel } from '@/types/note/game/Game';
import { NoteType } from '@/types/note/Note';
import { TextFieldSection } from '../inputs/TextFieldSection';
import { ImageSelector } from '../inputs/ImageSelector';
import NoteTypeSelector from '../ui/NoteTypeSelector';
import { GameTeamType } from '@/types/note/game/GameTeam';
// import { BoardSelecter } from '../inputs/BoardSelecter';

type pageProps = {
    gameNote: GameModel,
    postData: (note: NoteType, selectedFiles: File[]) => Promise<void>,
    onClose: () => void,
    boards: any[],
    isCreate: boolean,
    menu: number,
    setMenu: (menu: number) => void
}

export default function GameForm({ gameNote, postData, onClose, boards, isCreate, menu, setMenu }: pageProps) {
    const router = useRouter()
    const params = useParams()
    const [isConfirmCloseModal, setIsConfirmCloseModal] = useState<boolean>(false)
    const [waitFlag, setWaitFlag] = useState(false);

    const [onPosition, setOnPosition] = useState(gameNote.position != undefined)
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

    const [title, setTitle] = useState(gameNote.title);
    const [place, setPlace] = useState(gameNote.place);
    const [weather, setWeather] = useState(gameNote.weather);
    const [teams, setTeams] = useState(gameNote.teams ?? [new GameTeamModel({})]);
    const [position, setPosition] = useState(gameNote.position);
    const [goodPoints, setGoodPoints] = useState(gameNote.goodPoints);
    const [badPoints, setBadPoints] = useState(gameNote.badPoints);
    const [next, setNext] = useState(gameNote.next);
    const [comment, setComment] = useState(gameNote.comment);
    const [selectedFiles, setSelectedFiles] = useGetNoteImages(gameNote.images ?? [], setIsImagesLoading)
    const [selectedBoardIds, setSelectedBoardIds] = useState<string[]>(gameNote.boardIds || []);

    const onBoardSelect = (boardIds: string[]) => {
        setSelectedBoardIds(boardIds);
        gameNote.boardIds = boardIds;
    };

    const ChangeTeamName = (newValue: string, index: number) => {
        const input: GameTeamType[] = []
        teams.forEach((item) => {
            input.push(item)
        })
        input[index].team = newValue
        setTeams(input)
        gameNote.teams = input
    }

    const ChangeScore1 = (newValue: string, index: number) => {
        const input: GameTeamType[] = []
        teams.forEach((item) => {
            input.push(item)
        })
        input[index].score1 = newValue
        setTeams(input)
        gameNote.teams = input
    }

    const ChangeScore2 = (newValue: string, index: number) => {
        const input: GameTeamType[] = []
        teams.forEach((item) => {
            input.push(item)
        })
        input[index].score2 = newValue
        setTeams(input)
        gameNote.teams = input
    }

    const AddTeam = () => {
        const input: GameTeamType[] = []
        teams.forEach((item) => {
            input.push(item)
        })
        input.push(new GameTeamModel({}))
        setTeams(input)
        gameNote.teams = input
    }

    const deleteTeam = (index: number) => {
        const input: GameTeamType[] = []
        teams.map((item, itemIndex) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setTeams(input)
        gameNote.teams = input
    }

    const ChangeGoodPointsContext = (newValue: string, index: number) => {
        const input: string[] = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input[index] = newValue
        setGoodPoints(input)
        gameNote.goodPoints = input
    }

    const AddGoodPoints = () => {
        const input: string[] = []
        goodPoints.forEach((item) => {
            input.push(item)
        })
        input.push("")
        setGoodPoints(input)
        gameNote.goodPoints = input
    }

    const deleteGoodPoint = (index: number) => {
        const input: string[] = []
        goodPoints.map((item, itemIndex) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setGoodPoints(input)
        gameNote.goodPoints = input
    }

    const ChangeBadPointsContext = (newValue: string, index: number) => {
        const input: string[] = []
        badPoints.forEach((item) => {
            input.push(item)
        })
        input[index] = newValue
        setBadPoints(input)
        gameNote.badPoints = input
    }

    const AddBadPoints = () => {
        const input: string[] = []
        badPoints.forEach((item) => {
            input.push(item)
        })
        input.push("")
        setBadPoints(input)
        gameNote.badPoints = input
    }

    const deleteBadPoint = (index: number) => {
        const input: string[] = []
        badPoints.map((item, itemIndex) => {
            if (itemIndex != index) {
                input.push(item)
            }
        })
        setBadPoints(input)
        gameNote.badPoints = input
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

                    <Box sx={{ my: 1 }}>
                        <Stack sx={{ mb: 1, px: 2 }} direction="row" spacing={0} alignItems="center">
                            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black" }} >タイトル</InputLabel>
                            <TextField
                                required
                                fullWidth
                                size="small"
                                variant="standard"
                                name="title"
                                value={gameNote.title}
                                onChange={newValue => {
                                    setTitle(newValue.target.value)
                                    gameNote.title = newValue.target.value
                                }}
                                inputProps={{style: {fontSize: 13}}}
                                sx={{ backgroundColor: "background.paper" }}
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
                                value={gameNote.place}
                                onChange={newValue => {
                                    setPlace(newValue.target.value)
                                    gameNote.place = newValue.target.value
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
                                value={gameNote.weather}
                                onChange={newValue => {
                                    setWeather(newValue.target.value)
                                    gameNote.weather = newValue.target.value
                                }}
                            >
                                <MenuItem sx={{ fontSize: 13 }} value="晴れ">晴れ</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value="曇り">曇り</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value="雨">雨</MenuItem>
                                <MenuItem sx={{ fontSize: 13 }} value="雪">雪</MenuItem>
                            </Select>
                        </Stack>

                        <Stack sx={{ px: 2 }} direction="row" spacing={0} alignItems="center">
                            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black", whiteSpace: "normal" }} >ポジション</InputLabel>
                            <TextField
                                inputProps={{style: {fontSize: 13}}}
                                fullWidth
                                variant="standard"
                                name="position"
                                size="small"
                                value={gameNote.position}
                                    onChange={newValue => {
                                        setPosition(newValue.target.value)
                                        gameNote.position = newValue.target.value
                                    }}
                            />
                        </Stack>
                    </Box>

                    <Divider />

                    <Box sx={{ my: 1, px: 2 }}>
                            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: 1 }}>
                                <InputLabel sx={{ mb: 1, fontSize: 13, color: "black" }} >対戦チーム</InputLabel>
                                <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={AddTeam}>
                                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px"  }} /> 
                                </IconButton>
                            </Stack>
                            {gameNote.teams &&
                                gameNote.teams.map((input, index) => (
                                    <Box key={index} sx={{ position: "relative" }}>
                                        <Stack sx={{ my: 2, alignItems: "center" }} direction="row" spacing={1} alignContent="flex-start">
                                            <InputLabel sx={{ fontSize: 13, color: "black", minWidth: "25px" }} >VS</InputLabel>

                                            <Box>
                                                <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-start">
                                                    <InputLabel sx={{ fontSize: 13, color: "black", minWidth: "60px" }} >チーム名</InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        variant="standard"
                                                        name="team"
                                                        inputProps={{style: {fontSize: 13}}}
                                                        value={gameNote.teams[index].team}
                                                        onChange={newValue => ChangeTeamName(newValue.target.value, index)}
                                                    />
                                                </Stack>

                                                <Stack direction="row" spacing={0} alignItems="center" justifyContent="flex-start">
                                                    <InputLabel sx={{ fontSize: 13, color: "black", minWidth: "60px" }} >スコア</InputLabel>
                                                    <Stack sx={{ alignItems: "center" }} direction="row" spacing={0} alignContent="flex-start">
                                                        <TextField
                                                            fullWidth
                                                            inputProps={{style: {fontSize: 13}}}
                                                            variant="standard"
                                                            value={gameNote.teams[index].score1}
                                                            onChange={newValue => ChangeScore1(newValue.target.value, index)}
                                                        />
                                                        <InputLabel sx={{ fontSize: 17, color: "black", mx: 2, width: "40px" }} >ー</InputLabel>
                                                        <TextField
                                                            fullWidth
                                                            inputProps={{style: {fontSize: 13}}}
                                                            variant="standard"
                                                            value={gameNote.teams[index].score2}
                                                            onChange={newValue => ChangeScore2(newValue.target.value, index)}
                                                            />
                                                    </Stack>
                                                </Stack>
                                            </Box>
                                        </Stack>
                                        {index != 0 && !gameNote.teams[index].team && !gameNote.teams[index].score1 && !gameNote.teams[index].score2 &&
                                            <IconButton onClick={() => deleteTeam(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                                <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                            </IconButton>
                                        }

                                        {index != gameNote.teams.length - 1 &&
                                            <Divider />
                                        }
                                    </Box>
                                ))
                            }
                    </Box>

                    <Divider />


                    <Box sx={{ my: 2, px: 2 }}>
                        <Box sx={{ my: 1 }}>
                            <Stack sx={{ mb: 1 }} spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                <InputLabel sx={{ mx: 1, fontSize: 13, color: "#ff5e00", fontWeight: "bold" }}>良い点</InputLabel>
                                <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={AddGoodPoints}>
                                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px"  }} /> 
                                </IconButton>
                            </Stack>
                            {gameNote.goodPoints.map((input, index) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1, position: "relative" }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={1}
                                        value={gameNote.goodPoints[index]}
                                        onChange={newValue => ChangeGoodPointsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 13, py: "9px" }}
                                        placeholder={index == 0 ? "良かったところや良かったプレーなど" : ""}
                                        startAdornment
                                    />
                                    {index != 0 && !gameNote.goodPoints[index] &&
                                        <IconButton onClick={() => deleteGoodPoint(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                                        </IconButton>
                                    }
                                </FormControl>
                            ))}
                        </Box>

                        <Box sx={{ my: 1 }}>
                            <Stack sx={{ mb: 1 }} spacing={2} direction="row" justifyContent="space-between" alignItems="center">
                                <InputLabel sx={{ mx: 1, fontSize: 13, color: "#007eff", fontWeight: "bold" }}>悪い点</InputLabel>
                                <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={AddBadPoints}>
                                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px"  }} /> 
                                </IconButton>
                            </Stack>
                            {gameNote.badPoints.map((input, index) => (
                                <FormControl key={index} fullWidth sx={{ mb: 1 }}>
                                    <OutlinedInput
                                        multiline
                                        minRows={1}
                                        value={gameNote.badPoints[index]}
                                        onChange={newValue => ChangeBadPointsContext(newValue.target.value, index)}
                                        sx={{ fontSize: 13, py: "9px" }}
                                        placeholder={index == 0 ? "悪かったところや悪かったプレーなど" : ""}
                                    />
                                    {index != 0 && !gameNote.badPoints[index] &&
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
                                    value={gameNote.next}
                                    onChange={newValue => {
                                        setNext(newValue.target.value)
                                        gameNote.next = newValue.target.value
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
                    </Box>

                    <Divider /> */}

                    <Box sx={{ my: 2, px: 2 }}>
                        <Typography variant="h6" sx={{ fontSize: 13, mb: 2, color: "black" }}>
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

                    <TextFieldSection title="コメント" value={gameNote.comment} />
                </Box>
                
                <Box sx={{ position: 'sticky', bottom: { xs: "135px", md: "80px" }, left: 0, right: 0, backgroundColor: "white", zIndex: 100 }}>
                    <Divider />
                    <Stack justifyContent="center" alignItems="center" sx={{ pt: 2, pb: 1 }} >
                        <Button size="small" fullWidth sx={{ width: "90%", borderRadius: "10px", cursor: isImagesLoading ? "pointer" :  "default", backgroundColor: isImagesLoading ? "#aaa !important" :  "#2e7d32 !important" }} type='submit'>
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