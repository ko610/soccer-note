import { useState } from "react"
import { InputLabel, TextField, Stack } from "@mui/material"

type TextFieldSectionProps = {
    title: string,
    value: string,
    setValue: (value: string) => void
}

export const TextFieldSection = ({ title, value, setValue }: TextFieldSectionProps) => {

    return (
        <Stack sx={{ mb: 1 }} direction="row" spacing={0} alignItems="center">
            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black" }} >{title}</InputLabel>
            <TextField
                required
                fullWidth
                size="small"
                variant="standard"
                name="title"
                value={value}
                onChange={newValue => {
                    setValue(newValue.target.value)
                }}
                sx={{ '& .MuiInputBase-input': { fontSize: 13 } }}
            />
        </Stack>
    )
}