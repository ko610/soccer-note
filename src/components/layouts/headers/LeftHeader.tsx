"use client"

import { Fragment, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';

const barStyle = {
    bgcolor: 'background.paper',
    color: "black",
    position: 'fixed',
    zIndex: "1100",
    width: { md: "90px", lg: "250px" },
    top: 0,
    left: 0,
    display: { xs: "none", sm: "none", md: "block" },
    p: 0,
    boxShadow: "none",
    borderRight: "solid 1px rgb(219, 219, 219)",
}

const setLabel = (pathName: string[]) => {
    if (pathName[1] === "note") {
        return 0
    }
    else if (pathName[1] === "setting") {
        return 1
    }
}

export default function LeftHeader() {
    const pathName = usePathname().split('/')
    const router = useRouter()
    const [value, setValue] = useState(setLabel(pathName))

    const ClickNoteButton = () => {
        router.push('/note')
    };

    const ClickSettingButton = () => {
        router.push('/setting')
    };


    return (
        <Fragment>
            <CssBaseline />
            <AppBar sx={barStyle} position="static">
                <Toolbar>
                    <Stack
                        direction="column"
                        justifyItems="center"
                        sx={{ height: "100vh", width: { md: "90px", lg: "250px" }, background: "white" }}>
                        <Stack direction="row" justifyItems="center" alignItems="center" sx={{ py: 5, mb: 3 }}>
                            <IconButton sx={{ p: "0" }} onClick={(event) => {  }}>
                                < CardMedia
                                    component="img"
                                    sx={{ width: 45, height: 45 }}
                                    image="/images/icon.png"
                                />
                            </IconButton>
                            <Typography variant="h6" component="h2" sx={{ display: { md: "none", lg: "block" }, pl: 2 }}>
                                coco-board
                            </Typography>
                        </Stack>

                        <Button sx={{ my: 1, justifyContent: "flex-start", color: value == 0 ? "black" : "#666" }} onClick={ClickNoteButton}>
                            <Stack direction="row" justifyItems="center" alignItems="center" sx={{ width: "100%" }}>
                                <EditNoteIcon sx={{ fontSize: 32 }} />
                                <Typography sx={{ fontSize: 17, px: 2, fontWeight: value === 0 ? "bold" : "normal", display: { md: "none", lg: "block" } }}>ノート</Typography>
                            </Stack>
                        </Button>

                        <Button sx={{ my: 1, justifyContent: "flex-start", color: value == 1 ? "black" : "#666" }} onClick={ClickSettingButton}>
                            <Stack direction="row" justifyItems="center" alignItems="center" sx={{ width: "100%" }}>
                                <SettingsIcon sx={{ fontSize: 32 }} />
                                <Typography sx={{ fontSize: 17, px: 2, fontWeight: value === 1 ? "bold" : "normal", display: { md: "none", lg: "block" } }}>設定</Typography>
                            </Stack>
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </Fragment >
    );
};