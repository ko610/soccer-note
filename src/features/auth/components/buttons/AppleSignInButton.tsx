import Image from 'next/image';
import { signInWithPopup, OAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
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
    backgroundColor: "black",
    display: "flex",
    color: "white",
    fontSize: "14px",
    justifyContent: "center",
    alignItems: "center",
    border: "1.5px solid black",
    borderRadius: "10px",
    cursor: "pointer"
}



export default function AppleSignInButton({ setIsLoading, setError }: PageProps) {

    // Appleでログイン
    const AppleSignIn = async () => {
        setIsLoading(true)
        const AppleProvider = new OAuthProvider('apple.com');
    
        await signInWithPopup(auth, AppleProvider)
            .then((res) => {
                if (getAdditionalUserInfo(res)?.isNewUser) {
                    localStorage.setItem('isNewUser', "true");
                    localStorage.setItem('isNewCreateBoard', "true");
                }
                setIsLoading(false)
            }).catch((error) => {
                console.log(error)
                setError(true)
                setIsLoading(false)
            });
    }

    return (
        <Button onClick={() => { AppleSignIn() }} sx={loginBtnStyle}>
            <Box component="span" sx={{ mr: "10px" }}><Icon /></Box>
            <Typography variant="body1" sx={{ fontSize: 14, fontWeight: 600, color: "white", textTransform: "capitalize" }}>
                Appleではじめる
            </Typography>
        </Button>
    );
}

function Icon() {
    return (
        <Image src="/images/auth/apple-icon.png" width={20} height={20} alt="apple_img" />
    );
}
