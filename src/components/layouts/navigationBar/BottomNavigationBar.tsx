"use client"

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import AppBar from '@mui/material/AppBar';
import EditNoteIcon from '@mui/icons-material/EditNote';
import SettingsIcon from '@mui/icons-material/Settings';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { theme } from '@/styles/theme';

const setLabel = (pathName: string[]) => pathName[1] === "note" ? 0 : pathName[1] === "setting" ? 1 : 0;

export default function Footer() {
    const pathName = usePathname().split('/')

    const [value, setValue] = useState(setLabel(pathName))

    return (
        <AppBar position="fixed" sx={{ width: "100%", top: 'auto', bottom: 0, backgroundColor: 'background.paper', display: { sm: "block", md: "none" } }}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction 
                    href="/note" 
                    value={0} 
                    label="ノート"
                    icon={<EditNoteIcon />} 
                    sx={{
                        color: 'text.secondary',
                        '&.Mui-selected': {
                            color: theme.palette.primary.main,
                            '& .MuiSvgIcon-root': {
                                color: theme.palette.primary.main,
                            }
                        }
                    }}
                />
                <BottomNavigationAction 
                    href="/setting" 
                    value={1} 
                    label="設定" 
                    icon={<SettingsIcon />} 
                    sx={{
                        color: 'text.secondary',
                        '&.Mui-selected': {
                            color: theme.palette.primary.main,
                            '& .MuiSvgIcon-root': {
                                color: theme.palette.primary.main,
                            }
                        }
                    }}
                />
            </BottomNavigation>
        </AppBar>
    );
}