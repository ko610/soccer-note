"use client"

import { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { theme } from '@/styles/theme';

type PageProps = {
    alignment: Number,
    setAlignment: Function
}

export default function NoteTypeSelector({ alignment, setAlignment }: PageProps) {
    const handleAlignment = (
        event: MouseEvent<HTMLElement>,
        newAlignment: number,
    ) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "40px" }}>
            <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="note type"
                sx={{
                    height: "35px",
                    '& .MuiToggleButton-root': {
                        px: 2,
                        border: '1px solid #ddd',
                        borderRadius: "10px",
                        '&.Mui-selected': {
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            '&:hover': {
                                backgroundColor: theme.palette.primary.main,
                            }
                        }
                    }
                }}
            >
                <ToggleButton value={0} aria-label="game" size="small" sx={{ fontSize: 12, mx: 2, color: theme.palette.primary.main }}>
                    試合
                </ToggleButton>
                <ToggleButton value={1} aria-label="practice" size="small" sx={{ fontSize: 12, mx: 2, color: theme.palette.primary.main }}>
                    練習
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}