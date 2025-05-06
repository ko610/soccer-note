"use client"

import Image from 'next/image';
import Box from '@mui/material/Box';

export default function LoadingPage() {
    return (
        <Box
            sx={{
                width: "100%",
                height: "100vh",
                overflow: "hidden",
                position: "fixed",
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: "white"
            }}
        >
            <Image
                src="/images/icon.png"
                alt="loading"
                width={60}
                height={60}
                priority
            />
        </Box>
    );
}