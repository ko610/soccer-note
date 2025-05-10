import { Typography, Box } from "@mui/material";

type PageProps = {
    title: string;
}

export default function TitleSection({ title }: PageProps) {
    return (
        <Box sx={{ width: "100%", alignItems: "center", p: 1, mx: 1  }} >
            <Typography variant="h6" sx={{ fontSize: 16, color: "black" }} component="div">
                {title || "無題のノート"}
            </Typography>
        </Box>
    )
}   