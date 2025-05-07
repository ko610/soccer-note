"use client"

import { AppBar, Typography, Stack } from '@mui/material';

const barStyle = {
    width: "100%",
    height: 45,
    bgcolor: "white",
    color: "black",
    mx: "auto",
    position: "fixed",
    zIndex: "100",
    boxShadow: "none",
    borderBottom: "solid 1px rgb(219, 219, 219)",
    pl: { md: "90px", lg: "250px" }
}

export default function SettingHeader() {
    return (
        <AppBar sx={barStyle} position="static">
            <Stack sx={{ px: 1, maxWidth: "550px", mx: "auto", height: 45 }} direction="row" justifyContent="center" alignItems="center" >
                <Typography component="h2" fontSize={15} >
                    設定
                </Typography>
            </Stack>
        </AppBar >
    );
}
