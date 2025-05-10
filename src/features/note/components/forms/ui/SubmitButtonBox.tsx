import { Divider, Button, Typography, Stack, Box } from "@mui/material";
import { theme } from "@/styles/theme";

type pageProps = {
    isImagesLoading: boolean,
}

export default function SubmitButtonBox({ isImagesLoading }: pageProps) {
    return (
        <Box sx={{ position: 'sticky', bottom: { xs: "135px", md: "80px" }, left: 0, right: 0, backgroundColor: "white", zIndex: 100 }}>
            <Divider />
            <Stack justifyContent="center" alignItems="center" sx={{ pt: 2, pb: 1 }} >
                <Button size="small" fullWidth sx={{ color: theme.palette.primary.contrastText, width: "90%", height: "38px", borderRadius: "10px", cursor: isImagesLoading ? "pointer" :  "default", backgroundColor: isImagesLoading ? theme.palette.secondary.main :  theme.palette.primary.main }} type='submit'>
                    <Typography fontSize={13} component="p">
                        記録する
                    </Typography>
                </Button>
            </Stack>
        </Box>
    )
}