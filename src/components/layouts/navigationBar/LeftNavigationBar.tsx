"use client"

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppBar, Toolbar, Typography, CssBaseline, IconButton, Stack, Button, CardMedia } from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import { theme } from '@/styles/theme';

const barStyle = {
    bgcolor: 'background.paper',
    width: { md: "90px", lg: "250px" },
    p: 0,
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: "1100",
    display: { xs: "none", sm: "none", md: "block" },
    color: "black",
    boxShadow: "none",
    borderRight: "solid 1px rgb(219, 219, 219)",
}

const buttonStyle = {
    my: 1,
    justifyContent: "flex-start",
}

const typographyStyle = {
    fontSize: 17,
    px: 2,
    display: { md: "none", lg: "block" }
}

const getLabel = (pathName: string[]) => pathName[1] === "note" ? 0 : pathName[1] === "setting" ? 1 : 0;

export default function LeftNavigationBar() {
    const router = useRouter()

    const pathName = usePathname().split('/')
    const [value, setValue] = useState(getLabel(pathName))

    const handleNavigation = (path: string, label: number) => {
        router.push(path);
        setValue(label);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar sx={barStyle} position="static">
                <Toolbar>
                    <Stack
                        direction="column"
                        justifyItems="center"
                        sx={{ height: "100vh", width: "100%", background: "white" }}>
                        <Stack direction="row" justifyItems="center" alignItems="center" sx={{ py: 5, mb: 3 }}>
                            <IconButton sx={{ p: "0" }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 45, height: 45 }}
                                    image="/images/icon.png"
                                />
                            </IconButton>
                            <Typography variant="h6" component="h2" sx={{ display: { md: "none", lg: "block" }, pl: 2 }}>
                                coco-board
                            </Typography>
                        </Stack>

                        <Button 
                            sx={{ ...buttonStyle, color: value === 0 ? theme.palette.primary.main : "#666" }} 
                            onClick={() => handleNavigation('/note', 0)}
                        >
                            <Stack direction="row" justifyItems="center" alignItems="center">
                                <EditNoteIcon sx={{ fontSize: 32, mx: "auto" }} />
                                <Typography sx={{ ...typographyStyle, fontWeight: value === 0 ? "bold" : "normal" }}>
                                    ノート
                                </Typography>
                            </Stack>
                        </Button>

                        <Button 
                            sx={{ ...buttonStyle, color: value === 1 ? theme.palette.primary.main : "#666" }} 
                            onClick={() => handleNavigation('/setting', 1)}
                        >
                            <Stack direction="row" justifyItems="center" alignItems="center">
                                <SettingsIcon sx={{ fontSize: 32 }} />
                                <Typography sx={{ ...typographyStyle, fontWeight: value === 1 ? "bold" : "normal" }}>
                                    設定
                                </Typography>
                            </Stack>
                        </Button>
                    </Stack>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}