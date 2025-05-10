import { Box } from "@mui/material";

import { Typography } from "@mui/material";

type PageProps = {
    title: string;
    text: string;
    color: string;
}

export default function TextSection({ title, text, color }: PageProps) {
    return (
        <Box sx={{ px: 2, my: 3 }}>
            <Typography sx={{ fontSize: 12, mb: 1, fontWeight: "bold", color: color }}>
                {title}
            </Typography>
            {text ?
                <Typography variant="body2" sx={{ fontSize: 14, color: "black" }}>
                    {text.split('\n').map((line, index) => (
                        <Typography
                            key={index}
                            variant="body2"
                            sx={{
                                fontSize: 14,
                                color: "black"
                            }}
                        >
                            {line}
                        </Typography>
                    ))}
                </Typography>
                :
                <Typography variant="body2" sx={{ px: 1, width: "100px", fontSize: 14, color: "black" }}>
                    なし
                </Typography>
            }
        </Box>
    )
}