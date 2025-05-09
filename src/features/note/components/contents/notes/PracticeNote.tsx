"use client"

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Stack, Box, CardMedia, Typography, List, Divider, Skeleton, Button, IconButton, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
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
                        <Box sx={{ backgroundColor: "#fbfbfb", borderRight: "solid 0.5px #b2b2b2", borderLeft: "solid 0.5px #b2b2b2", pb: {xs: "150px", md: "100px"} }}>
                            <Box sx={{
                                position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 1900
                            }} >
                                <Stack sx={{ px: 1, height: "40px" }} direction="row" alignItems="center" justifyContent="center">
                                    <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ width: "100%" }}>
                                        {user ?
                                            user.uid == practiceNote.uid &&
                                            <>
                                                <IconButton onClick={editButtonClick} size='small' sx={{ width: "30px", height: "30px", my: "auto !important" }}><EditIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                                                <IconButton onClick={deleteButtonClick} size='small' sx={{ width: "30px", height: "30px", my: "auto !important" }}><DeleteIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                                                <IconButton>
                                                    {practiceNote.uid == user?.uid &&
                                                        <a href={`https://social-plugins.line.me/lineit/share?url=https://cocoboard.jp/practice/${practiceNote.id}?openExternalBrowser=1&text=${sharerText} - 練習:${practiceNote.title}`} target="_blank" rel="nofollow noopener">
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

                            {practiceNote != undefined ?
                                <Box>
                                    <Box sx={{ width: "100%", alignItems: "center", p: 1, mx: 1  }} >
                                        <Typography variant="h6" sx={{ fontSize: 16, color: "black" }} component="div">
                                            {practiceNote.title || "無題のノート"}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" alignItems="center" sx={{ p: 1, mx: 1 }} spacing={1}>
                                        <Typography sx={{ fontSize: 12 }} color="text.secondary">
                                            場所
                                        </Typography>
                                        {practiceNote.place &&
                                            <Typography variant="body2" sx={{ color: "black" }}>
                                                {String(practiceNote.place)}
                                            </Typography>
                                        }
                                    </Stack>
                                    <Stack direction="row"  alignItems="center" sx={{ p: 1, mx: 1 }} spacing={1}>
                                        <Typography sx={{ fontSize: 12}} color="text.secondary">
                                            天気
                                        </Typography>
                                        {practiceNote.weather &&
                                            <Typography variant="body2" sx={{ color: "black" }}>
                                                {String(practiceNote.weather)}
                                            </Typography>
                                        }
                                    </Stack>
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={94} />
                            }

                            <Divider />

                            {practiceNote != undefined ?
                                <Box sx={{ px: 2, my: 1 }}>
                                    <Typography sx={{ fontSize: 12, mb: 1 }} color="text.secondary">
                                        練習メニュー
                                    </Typography>
                                    {practiceNote.details[0] ?
                                        <List sx={{ px: 0, my: 1, py: 0 }}>
                                            {practiceNote.details.map((detail, index) => (
                                                <Box key={index}>
                                                    {
                                                        detail != undefined &&
                                                        // <ListText primary={detail} secondary={elementsCategories[Number(detail.type)].title} />
                                                        <Typography variant="body2" sx={{ fontSize: 14, mb: 1, color: "black" }}>
                                                            ・{detail}
                                                        </Typography>
                                                    }
                                                </Box>
                                            ))
                                            }
                                        </List>
                                        :
                                        <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14 }}>
                                            なし
                                        </Typography>
                                    }
                                </Box>
                                :
                                <Skeleton variant="rectangular" height={62} />
                            }

                    <Divider />

                    {practiceNote != undefined ?
                        <Box sx={{ px: 2, mb: 3, mt: 2 }}>
                            <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }} color="#ff5e00">
                                良かったところ
                            </Typography>
                            {practiceNote.goodPoints[0] ?
                                <List sx={{ px: 0, my: 1, py: 0 }}>
                                    {practiceNote.goodPoints.map((goodPoint: string, index: number) => (
                                        <Box key={index}>
                                            {
                                                goodPoint != undefined &&
                                                goodPoint.split("\n").map((line: string, index: number) => (
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
                                    ))}
                                </List>
                                :
                                <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                                    なし
                                </Typography>
                            }
                        </Box>
                        :
                        <Skeleton variant="rectangular" height={62} />
                    }

                    {practiceNote != undefined ?
                        <Box sx={{ px: 2, my: 3 }}>
                            <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }} color="#007eff">
                                悪かった点
                            </Typography>
                            {practiceNote.badPoints[0] ? 
                                <List sx={{ px: 0, my: 1, py: 0 }}>
                                    {practiceNote.badPoints.map((badPoint: string, index: number) => (
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
                                    ))}
                                </List>
                                :
                                <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                                    なし
                                </Typography>
                            }
                        </Box>
                        :
                        <Skeleton variant="rectangular" height={62} />
                    }

                    {practiceNote != undefined ?
                        <Box sx={{ px: 2, my: 3 }}>
                            <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold" }} color="#16b41e">
                                次に向けて
                            </Typography>
                            {practiceNote.next ?
                                <Typography variant="body2" sx={{ fontSize: 14, color: "black" }}>
                                    {practiceNote.next.split("\n").map((line: string, index: number) => (
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
                    {/* {content.boardIds && content.boardIds.length > 0 && (
                        <>
                            <Divider />
                            <BoardGallery boards={boards} boardIds={content.boardIds} />
                        </>
                    )} */}

                    {/* 画像 */}
                    {practiceNote.images && practiceNote.images.length > 0 &&
                        <>
                            <Divider />
                            <ImageGallery images={practiceNote.images.map((img: string) => String(img).toString())} />
                        </>
                    }

                    {practiceNote != undefined && practiceNote.comment != "" &&
                        <>
                            <Divider />
                            <Box sx={{ px: 2, my: 1 }}>
                                <Typography sx={{ fontSize: 14, mb: 1 }} color="text.secondary">
                                    コメント
                                </Typography>
                                <Typography variant="body2" sx={{ pb: 1, color: "black" }}>
                                    {practiceNote.comment.split("\n").map((line: string, index: number) => (
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