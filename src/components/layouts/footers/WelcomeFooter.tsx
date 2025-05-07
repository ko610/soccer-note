"use client"

import * as React from 'react';
import { Typography, Button, Stack, Grid, Box, Divider } from '@mui/material';

export default function InfoFooter() {
    return (
        <Box sx={{ position: "sticky", left: 0, right: 0, bottom: 0, width: "100%", zIndex: 100 }}>
            <Divider />
            <Stack
                direction="row"
                justifyContent="center"
                alignContent="center"
                sx={{ height: 100, bgColor: "white", px: 2, display: { xs: "none", sm: "flex" } }}>
                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{ px: 2 }}
                    spacing={2}
                >
                    <Button size="small" href='/' sx={{ fontSize: 12, color: "gray", textTransform: "lowercase", height: 30 }}>coco-boardについて</Button>
                    <Button size="small" target="_blank" href="/privacy" sx={{ fontSize: 12, color: "gray", height: 30 }}>プライバシー</Button>
                    <Button size="small" target="_blank" href="/terms" sx={{ fontSize: 12, color: "gray", height: 30 }}>利用規約</Button>
                    <Button size="small" target="_blank" href="/contact" sx={{ fontSize: 12, color: "gray", height: 30 }}>お問い合わせ</Button>
                    <Button size="small" target="_blank" href="https://www.instagram.com/coco_board/" sx={{ fontSize: 12, color: "gray", textTransform: "lowercase", height: 30 }}>Instagram</Button>
                </Stack>
                <Typography sx={{ fontSize: 12, color: "gray", display: "inline-flex", alignItems: "center", letterSpacing: 0.8 }}>© 2024 coco-board</Typography>
            </Stack>
            <Box sx={{ bgColor: "white", display: { xs: "block", sm: "none" }, pb: 1 }}>
                <Grid container spacing={2} sx={{ textAlign: "center", pt: 2, bgColor: "white", margin: "auto" }}>
                    <Grid size={{ xs: 6, md: 8 }}>
                        <Button size='small' href='/' sx={{ fontSize: 12, color: "gray", textTransform: "lowercase" }}>coco-boardについて</Button>
                    </Grid>
                    <Grid size={{ xs: 6, md: 8 }}>
                        <Button size='small' target="_blank" href="/privacy" sx={{ fontSize: 11, color: "gray" }}>プライバシー</Button>
                    </Grid>
                    <Grid size={{ xs: 6, md: 8 }}>
                        <Button size='small' target="_blank" href="/terms" sx={{ fontSize: 11, color: "gray" }}>利用規約</Button>
                    </Grid>
                    <Grid size={{ xs: 6, md: 8 }}>
                        <Button size='small' target="_blank" href="/contact" sx={{ fontSize: 11, color: "gray" }}>お問い合わせ</Button>
                    </Grid>
                    <Grid size={{ xs: 6, md: 8 }}>
                        <Button size='small' target="_blank" href="https://www.instagram.com/coco_board/" sx={{ fontSize: 11, color: "gray", textTransform: "lowercase" }}>Instagram</Button>
                    </Grid>
                </Grid>
                <Box sx={{ width: "100%", height: 30, display: "inline-flex", alignItems: "center" }}>
                    <Typography sx={{ fontSize: 11, color: "gray", mx: "auto", alignItems: "center", letterSpacing: 0.8 }}>© 2024 coco-board</Typography>
                </Box>
            </Box>
        </Box>
    );
}