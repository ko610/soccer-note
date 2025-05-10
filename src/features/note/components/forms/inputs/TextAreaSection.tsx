import { Box, InputLabel, FormControl, OutlinedInput } from "@mui/material"

type TextAreaSectionProps = {
    title: string;
    placeholder?: string;
    value: string;
    setValue: (value: string) => void;
    minRows?: number;
    titleColor?: string;
    fontWeight?: string;
}

export const TextAreaSection = ({ 
    title, 
    placeholder, 
    value, 
    setValue, 
    minRows = 1,
    titleColor = "black",
    fontWeight = "normal"
}: TextAreaSectionProps) => {
    return (
        <Box sx={{ my: 1 }}>
            <InputLabel sx={{ mb: 1, fontSize: 13, color: titleColor, fontWeight: fontWeight }}>{title}</InputLabel>
            <FormControl fullWidth sx={{ fontSize: 13 }} variant="outlined">
                <OutlinedInput
                    sx={{ m: "0 !important", fontSize: 13, py: "9px" }}
                    multiline
                    minRows={minRows}
                    value={value}
                    onChange={newValue => setValue(newValue.target.value)}
                    placeholder={placeholder}
                />
            </FormControl>
        </Box>
    )
} 