import { Box, Stack, InputLabel, FormControl, OutlinedInput, IconButton } from "@mui/material"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { theme } from '@/styles/theme';

type AddableTextFieldSectionProps = {
    title: string;
    placeholder?: string;
    values: string[];
    setValues: (values: string[]) => void;
    titleColor?: string;
    fontWeight?: string;
}

export const AddableTextFieldSection = ({ 
    title, 
    placeholder, 
    values, 
    setValues,
    titleColor = "black",
    fontWeight = "normal"
}: AddableTextFieldSectionProps) => {
    const addField = () => {
        setValues([...values, ""]);
    };

    const deleteField = (index: number) => {
        const newValues = values.filter((_, i) => i !== index);
        setValues(newValues);
    };

    const updateValue = (value: string, index: number) => {
        const newValues = [...values];
        newValues[index] = value;
        setValues(newValues);
    };

    return (
        <Box sx={{ my: 1 }}>
            <Stack spacing={2} direction="row" justifyContent="space-between" sx={{ alignItems: "center", mb: 0.5 }}>
                <InputLabel sx={{ mx: 1, fontSize: 13, color: titleColor, fontWeight: fontWeight }}>{title}</InputLabel>
                <IconButton size="small" sx={{ color: theme.palette.primary.main }} onClick={addField}>
                    <AddCircleOutlineIcon sx={{ width: "20px", height: "20px" }} /> 
                </IconButton>
            </Stack>
            {values.map((value, index) => (
                <FormControl key={index} fullWidth sx={{ mb: 1, position: "relative" }}>
                    <OutlinedInput
                        multiline
                        minRows={1}
                        value={value}
                        onChange={newValue => updateValue(newValue.target.value, index)}
                        sx={{ fontSize: 13, py: "9px" }}
                        placeholder={index === 0 ? placeholder || "" : ""}
                        startAdornment
                    />
                    {index !== 0 && !values[index] && (
                        <IconButton onClick={() => deleteField(index)} sx={{ position: "absolute", right: "-5px", top: "-5px", p: 0, backgroundColor: "white !important" }}>
                            <HighlightOffIcon sx={{ width: "20px", height: "20px" }} />
                        </IconButton>
                    )}
                </FormControl>
            ))}
        </Box>
    )
} 