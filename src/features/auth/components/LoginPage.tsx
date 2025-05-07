"use client"

import { useEffect, useState } from 'react';
import { Container, Typography, Box, Stack, CardMedia } from '@mui/material';
import LoadingPage from '@/components/ui/LoadingPage';
import GoogleSignInButton from '@/features/auth/components/buttons/GoogleSignInButton';
import AppleSignInButton from '@/features/auth/components/buttons/AppleSignInButton';
import LineSignInButton from '@/features/auth/components/buttons/LineSignInButton';
import OpenInBrowserGuide from '@/features/auth/components/OpenInBrowserGuide';

export default function LoginPage() {
    const [isInstagramWebBrowser, setIsInstagramWebBrowser] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() => {
        setIsInstagramWebBrowser(checkInstagramWebBrowser())
    }, [])

    const checkInstagramWebBrowser = () => {
        // User Agent 文字列
        const userAgent = window.navigator.userAgent

        // Instagramという文字列が含まれているかどうかを判定する
        const isInstagramWebOpen = /Instagram/i.test(userAgent)
        return isInstagramWebOpen
    };

    return (
        <>
            {isLoading ?
                <LoadingPage />
                : 
                <Box  sx={{
                    width: '100%', zIndex: 2500, backgroundColor: "white"
                }}>
                    <Container maxWidth="xs" fixed sx={{ px: 0,position: "relative", height: "100vh" }}>
                        <Box sx={{ px: 3, alignItems: "center", pt: "30px", pb: "15px", textAlign: "center" }}>
                            <Stack
                                direction="row"
                                alignItems="center"
                                justifyContent="center"
                                spacing={2}
                                sx={{ mb: "40px" }}>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 50, height: 50 }}
                                    image="/images/icon.png"
                                />
                                <Typography sx={{
                                    fontSize: { xs: 25, md: 30 },
                                    fontWeight: "bold",
                                    color: "black"
                                }}>
                                    coco-board
                                </Typography>
                            </Stack>
                            {isInstagramWebBrowser
                                ? <OpenInBrowserGuide />
                                : <Box>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h5" sx={{ textAlign: "center", fontSize: "20px", fontWeight: 400, color: "black" }}>
                                            coco-boardでサッカーの記録を始めましょう。
                                        </Typography>
                                    </Box>
                                    <GoogleSignInButton setIsLoading={setIsLoading} setError={setError} />
                                    <AppleSignInButton setIsLoading={setIsLoading} setError={setError} />
                                    <LineSignInButton setIsLoading={setIsLoading} setError={setError} /> 

                                    {error &&
                                        <Box sx={{ mb: "5px" }}>
                                            <Typography variant="body1" sx={{ fontSize: 12, color: "red" }}>
                                                ログインに失敗しました。
                                            </Typography>
                                            <Typography variant="body1" sx={{ fontSize: 12, color: "red" }}>
                                                ブラウザをリロードして再度ログインしてください。
                                            </Typography>
                                        </Box>
                                    }

                                    <Box sx={{ mt: "30px" }}>
                                        <Typography variant="body1" sx={{ fontSize: 12, color: "#555" }}>
                                            続行すると、利用規約とプライバシーポリシーに同意したことになります。
                                        </Typography>
                                    </Box>
                                </Box>
                            }
                        </Box>
                    </Container >
                </Box>
            }
        </>
    );
}