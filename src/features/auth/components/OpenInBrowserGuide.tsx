import { Box, Typography } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LaunchIcon from '@mui/icons-material/Launch';

export default function OpenInBrowserGuide() {
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ color: "black", fontSize: 14, fontWeight: 400 }}>
                    Instagramからご利用の方は、以下の方法でブラウザからご利用ください。
                </Typography>
            </Box>
            <Box>
                <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1, textAlign: "left" }}>
                    1. 右上の「{<MoreHorizIcon />}」ボタンをクリックする
                </Typography>
                <Typography variant="body1" sx={{ color: "black", fontSize: 14, pb: 1, textAlign: "left" }}>
                    2. 「外部ブラウザーで開く {<LaunchIcon />}」をクリックする
                </Typography>
            </Box>
        </Box>
    )
}
