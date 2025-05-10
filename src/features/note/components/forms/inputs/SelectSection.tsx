import { InputLabel, Select, MenuItem, Stack } from "@mui/material"

type SelectSectionProps = {
    title: string;
    value: string;
    setValue: (value: string) => void;
    options: string[];
}

export const SelectSection = ({ title, value, setValue, options }: SelectSectionProps) => {
    return (
        <Stack sx={{ mb: 1 }} direction="row" spacing={0} alignItems="center">
            <InputLabel sx={{ fontSize: 13, width: "90px", color: "black" }}>{title}</InputLabel>
            <Select
                sx={{ 
                    mx: 1, py: "2px",
                    '& .MuiSelect-select': { fontSize: 13 }
                }}
                variant="standard"
                size="small"
                fullWidth
                value={value}
                onChange={newValue => setValue(newValue.target.value)}
            >
                {options.map((option) => (
                    <MenuItem 
                        key={option} 
                        value={option}
                        sx={{ fontSize: 13 }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </Stack>
    )
} 