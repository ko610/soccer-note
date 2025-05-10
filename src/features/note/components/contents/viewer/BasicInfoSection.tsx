import { Typography, Stack } from "@mui/material";

type PageProps = {
    title: string;
    value: string;
}

export default function BasicInfoSection({ title, value }: PageProps) {
    return (
        <Stack direction="row" alignItems="center" sx={{ p: 1, mx: 1 }} spacing={1}>
            <Typography sx={{ fontSize: 12 }} color="text.secondary">
                {title}
            </Typography>
            {value &&
                <Typography variant="body2" sx={{ color: "black" }}>
                    {String(value)}
                </Typography>
            }
        </Stack>
    )
}