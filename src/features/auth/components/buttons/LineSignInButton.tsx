import * as React from 'react';
import Image from 'next/image';
import { getAdditionalUserInfo, signInWithPopup, OAuthProvider } from 'firebase/auth';
import { Box, Typography, Button } from '@mui/material';
import { auth } from '@/lib/firebase/config';

type PageProps = {
    setIsLoading: (isLoading: boolean) => void,
    setError: (error: boolean) => void
}

const loginBtnStyle = {
    height: "42px",
    width: "100%",
    m: "8px 0",
    backgroundColor: "#06C755",
    display: "flex",
    color: "white",
    fontSize: "14px",
    justifyContent: "center",
    alignItems: "center",
    border: "1.5px solid #06C755",
    borderRadius: "10px",
    cursor: "pointer"
}

export default function LineSignInButton({ setIsLoading, setError }: PageProps) {

    // Lineでログイン
    const LineSignIn = async () => {
        setIsLoading(true);
        const provider = new OAuthProvider('oidc.line');

        try {
            const res = await signInWithPopup(auth, provider);
            if (getAdditionalUserInfo(res)?.isNewUser) {
                localStorage.setItem('isNewUser', "true");
                localStorage.setItem('isNewCreateBoard', "true");
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setError(true);
            setIsLoading(false);
        }
    }

    return (
        <Button onClick={() => { LineSignIn() }} sx={loginBtnStyle}>
            <Box component="span" sx={{ mr: "10px" }}><Icon /></Box>
            <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600, color: "white", textTransform: "capitalize" }}>
                LINEではじめる
            </Typography>
        </Button>
    );
} 

function Icon() {
    return (
        <Image src="/images/auth/line-icon.png" width={25} height={25} alt="line_img" />
    );
}