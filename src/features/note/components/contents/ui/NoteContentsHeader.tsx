
import { useRouter } from 'next/navigation';
import { CardMedia, Stack, IconButton, Typography, Box, Divider, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { NoteType } from '@/types/note/Note';


type PageProps = {
    note: NoteType,
    editButtonClick: () => void,
    deleteButtonClick: () => void,
    sharerText: string
}

export default function NoteContentsHeader( {
    note,
    editButtonClick,
    deleteButtonClick,
    sharerText
} : PageProps) {

    const router = useRouter()
    const { user, isAuthLoading } = useAuth();

    return (
        <Box sx={{
            position: 'sticky', top: 0, left: 0, right: 0, backgroundColor: "white", zIndex: 1900
        }} >
            <Stack sx={{ px: 1, height: "40px" }} direction="row" alignItems="center" justifyContent="center">
                <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ width: "100%" }}>
                    {user ?
                        user.uid == note.uid &&
                        <>
                            <IconButton onClick={editButtonClick} size='small' sx={{ width: "30px", height: "30px", my: "auto !important" }}><EditIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                            <IconButton onClick={deleteButtonClick} size='small' sx={{ width: "30px", height: "30px", my: "auto !important" }}><DeleteIcon sx={{ fontSize: "1.25rem" }} /></IconButton>
                            <IconButton>
                                    {note.uid == user?.uid &&
                                    <a href={`https://social-plugins.line.me/lineit/share?url=https://cocoboard.jp/practice/${note.id}?openExternalBrowser=1&text=${sharerText} - 練習:${note.title}`} target="_blank" rel="nofollow noopener">
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
    )
}