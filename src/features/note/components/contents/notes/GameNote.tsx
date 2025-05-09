"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Stack, Box, CardMedia, Button, Typography, List, Divider,  Skeleton, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
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



type PageProps = {
    allNotes: NoteType[],
    gameNote: GameModel,
    setNotes: (notes: NoteType[]) => void,
    boards: any[],
    setTabValue: (tabValue: number) => void
}

export default function GameNote({ allNotes, gameNote, setNotes, boards, setTabValue }: PageProps) {
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
                            boards={boards} 
                            onClose={() => setEditModalOpen(false)} 
                            isCreate={false}
                            menu={-1}
                            setMenu={() => {}}
                        />
                    ) : (
                        <Box sx={{ backgroundColor: "#fbfbfb", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", pb: {xs: "150px", md: "100px"} }}>
                            <Box sx={{
                                position: 'sticky', top: "40px", left: 0, right: 0, backgroundColor: "white", zIndex: 1900
                            }} >
                                <Stack sx={{ px: 1, height: "40px" }} direction="row" alignItems="center" justifyContent="center">
                                    <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ width: "100%" }}>
                                        {user ?
                                            user.uid == gameNote.uid &&
                                            <>
                                                <IconButton onClick={editButtonClick} size='small' sx={{ width: "30px", height: "30px", my: "auto !important" }}><EditIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                                                <IconButton onClick={deleteButtonClick} size='small' sx={{ width: "30px", height: "30px", my: "auto !important" }}><DeleteIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                                                <IconButton>
                                                    {gameNote.uid == user?.uid &&
                                                        <a href={`https://social-plugins.line.me/lineit/share?url=https://cocoboard.jp/game/${gameNote.id}?openExternalBrowser=1&text=${sharerText} - 試合:${gameNote.title}`} target="_blank" rel="nofollow noopener">
                                                            <CardMedia
                                                                component='img'
                                                                image="/images/welcomePage/LINE-icon.png"
                                                                sx={{ width: 20, height: 20 }}
                                                            />
                                                        </a>
                                                    }
                                                </IconButton>
                                            </>
                                            :
                                            <Button size="medium" onClick={() => router.push('/accounts/login')}>
                                                <Typography sx={{ fontSize: 13 }}>ログイン</Typography>
                                            </Button>
                                        }
                                    </Stack>
                                </Stack>
                                <Divider />
                            </Box>

                            {gameNote != undefined ?
                                <Box>
                                    <Box sx={{ width: "100%", alignItems: "center", p: 1, mx: 1  }} >
                                        <Typography variant="h6" sx={{ fontSize: 16, color: "black" }} component="div">
                                            {gameNote.title || "無題のノート"}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" alignItems="center" sx={{ p: 1, mx: 1 }} spacing={1}>
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                            場所
                                        </Typography>
                                        {gameNote.place &&
                                            <Typography variant="body2" sx={{ color: "black" }}>
                                                {String(gameNote.place)}
                                            </Typography>
                                        }
                                    </Stack>
                                    <Stack direction="row"  alignItems="center" sx={{ p: 1, mx: 1 }} spacing={1}>
                                        <Typography sx={{ fontSize: 12}} color="text.secondary">
                                            天気
                                        </Typography>
                                        {gameNote.weather &&
                                            <Typography variant="body2" sx={{ color: "black" }}>
                                                {String(gameNote.weather)}
                                            </Typography>
                                        }
                                    </Stack>
                                    <Stack direction="row"  alignItems="center" sx={{ p: 1, mx: 1 }} spacing={1}>
                                        <Typography sx={{ fontSize: 12}} color="text.secondary">
                                            ポジション
                                        </Typography>
                                        {gameNote.position &&
                                            <Typography variant="body2" sx={{ color: "black" }}>
                                                {String(gameNote.position)}
                                            </Typography>
                                        }
                                    </Stack>
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={65} />
                            }
                            <Divider />

                            {gameNote != undefined ?
                                gameNote.teams && gameNote.teams[0]?.team &&
                                    <List sx={{ mx: 2 }}>
                                        {gameNote.teams.map((team, index) => (
                                        <Stack key={index} direction="row" justifyContent="space-between" sx={{ my: 1 }}>
                                             <Stack direction="row" alignItems="center" >
                                                <Typography variant="body2" color="text.secondary" sx={{ fontSize: 12, mr: 1 }}>
                                                    VS
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: 14, color: "black" }}>
                                                    {String(team.team)}
                                                </Typography>
                                            </Stack>
                                            <Stack direction="row" alignItems="center" sx={{ mr: 2 }}>
                                                <Typography variant="body2" sx={{ fontSize: 16, color: "black" }}>
                                                    {String(team.score1)}
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: 16, mx: "6px", color: "black", transform: "scale(2, 1)" }}>
                                                    -
                                                </Typography>
                                                <Typography variant="body2" sx={{ fontSize: 16, color: "black" }}>
                                                    {String(team.score2)}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                            ))
                                        }
                                    </List>
                                :
                                <Skeleton variant="rectangular" height={87} />
                            }
                            
                            <Divider />

                            {gameNote != undefined ?
                                <Box sx={{ px: 2, mb: 3, mt: 2 }}>
                                    <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }} color="#ff5e00">
                                        良かったところ
                                    </Typography>
                                    {gameNote.goodPoints[0] ?
                                        <List sx={{ px: 0, my: 1, py: 0 }}>
                                            {gameNote.goodPoints.map((goodPoint, index) => (
                                                <Box key={index}>
                                                    {
                                                        goodPoint != undefined &&
                                                        goodPoint.split('\n').map((line, index) => (
                                                            <Typography
                                                                key={index}
                                                                variant="body2"
                                                                sx={{ 
                                                                    fontSize: 14,
                                                                    color: "black",
                                                                    ml: index === 0 ? 0 : 2
                                                                }}
                                                            >
                                                                {index === 0 && "・"}{line}
                                                            </Typography>
                                                        ))
                                                    }
                                                </Box>
                                            ))
                                            }
                                        </List >
                                        :
                                        <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                                            なし
                                        </Typography>
                                    }
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={62} />
                            }


                            {gameNote != undefined ?
                                <Box sx={{ px: 2, my: 3 }}>
                                    <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }} color="#007eff">
                                        悪かった点
                                    </Typography>
                                    {gameNote.badPoints[0] ?
                                        <List sx={{ px: 0, my: 1, py: 0 }}>
                                            {gameNote.badPoints.map((badPoint, index) => (
                                                <Box key={index}>
                                                    {
                                                        badPoint != undefined &&
                                                        badPoint.split('\n').map((line, index) => (
                                                            <Typography
                                                                key={index}
                                                                variant="body2"
                                                                sx={{
                                                                    fontSize: 14,
                                                                    color: "black",
                                                                    ml: index === 0 ? 0 : 2
                                                                }}
                                                            >
                                                                {index === 0 && "・"}{line}
                                                            </Typography>
                                                        ))
                                                    }
                                                </Box>
                                            ))
                                            }
                                        </List >
                                        :
                                        <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                                            なし
                                        </Typography>
                                    }
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={62} />
                            }

                            {gameNote != undefined ?
                                <Box sx={{ px: 2, my: 3 }}>
                                    <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }} color="#16b41e">
                                        次に向けて
                                    </Typography>
                                    {gameNote.next ?
                                        <Typography variant="body2" sx={{ fontSize: 14, color: "black" }}>
                                            {gameNote.next.split('\n').map((line, index) => (
                                                <Typography
                                                    key={index}
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: 14,
                                                        color: "black"
                                                    }}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
                                        </Typography>
                                        :
                                        <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                                            なし
                                        </Typography>
                                    }
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={62} />
                            }

                            

                            {/* ボード */}
                            {/* {gameNote.boardIds && gameNote.boardIds.length > 0 && (
                                <>
                                    <Divider />
                                    <BoardGallery boards={boards} boardIds={gameNote.boardIds} />
                                </>
                            )} */}

                            {/* 画像 */}
                            {gameNote.images && gameNote.images.length > 0 && (
                                <>
                                    <Divider />
                                    <ImageGallery images={gameNote.images.map(img => String(img).toString())} />
                                </>
                            )}


                            {gameNote != undefined && gameNote.comment != "" &&
                                <>
                                    <Divider />
                                    <Box sx={{ px: 2, my: 1 }}>
                                        <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                            コメント
                                        </Typography>

                                        <Typography variant="body2" sx={{ pb: 1, color: "black" }}>
                                            {gameNote.comment.split('\n').map((line, index) => (
                                                <Typography
                                                    key={index}
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: 14,
                                                        color: "black"
                                                    }}
                                                >
                                                    {line}
                                                </Typography>
                                            ))}
                                        </Typography>
                                    </Box>
                                </>
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

