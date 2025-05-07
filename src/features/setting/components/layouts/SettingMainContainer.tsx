"use client"

import { Container } from '@mui/material';

export default function SettingMainContainer({ children }: { children: React.ReactNode }) {
    return (
        <Container maxWidth="md" sx={{ pt: "50px", pr: 0, pl: { md: "90px", lg: "250px" }, pb: {xs: "56px", md: "0px"}}}>
            {children}  
        </Container>
    );
}