import Image from 'next/image';
import { GoogleAuthProvider, getAdditionalUserInfo, signInWithPopup } from 'firebase/auth';
import { Box, Button, Typography } from '@mui/material';
import { auth } from '@/lib/firebase/config';

type PageProps = {
    setIsLoading: (isLoading: boolean) => void,
    setError: (error: boolean) => void
}

const loginBtnStyle = {
    height: "42px",
    width: "100%",
    m: "8px 0",
    bgColor: "white",
    display: "flex",
    color: "#7F7F7F",
    fontSize: "14px",
    justifyContent: "center",
    alignItems: "center",
    border: "1.5px solid #AFAFAF",
    borderRadius: "10px",
    cursor: "pointer"
}

export default function GoogleSignInButton({ setIsLoading, setError }: PageProps) {

    // Googleでログイン
    const GoogleSignIn = async () => {
        setIsLoading(true);
        const GoogleProvider = new GoogleAuthProvider();
        GoogleProvider.setCustomParameters({
            prompt: "select_account"
        });

        try {
            const res = await signInWithPopup(auth, GoogleProvider);
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
        <Button onClick={() => { GoogleSignIn() }} sx={loginBtnStyle}>
            <Box component="span" sx={{ mr: "10px" }}><Icon /></Box>
            <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600, color: "#7F7F7F", textTransform: "capitalize" }}>
                Googleではじめる
            </Typography>
        </Button>
    );
}

function Icon() {
    return (
        <Image src="/images/auth/google-icon.svg" width={20} height={20} alt="google_img" />
    );
}
