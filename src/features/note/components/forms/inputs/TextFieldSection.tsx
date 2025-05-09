import { FormControl, Typography, OutlinedInput } from "@mui/material"

import { Box } from "@mui/material"
import { useState } from "react"


export const TextFieldSection = ({ title, value }: { title: string, value: string}) => {
    const [inputValue, setInputValue] = useState(value)

    return (
        <Box sx={{ my: 2, px: 2 }}>
            <Typography variant="h6" sx={{ fontSize: 13, mb: 1, color: "black" }}>
                {title}
                </Typography>
                <FormControl fullWidth sx={{ fontSize: 13, mb: 4 }} variant="outlined">
                    <OutlinedInput
                        sx={{ fontSize: 13, py: "9px" }}
                        multiline
                        minRows={1}
                        value={inputValue}
                        onChange={newValue => {
                            setInputValue(newValue.target.value);
                            value = newValue.target.value;
                        }}
                    />
            </FormControl>
        </Box>
    )
}