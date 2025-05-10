
import { SyntheticEvent } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { NoteType } from "@/types/note/Note";
import { theme } from "@/styles/theme";
import { useNoteContext } from "@/features/note/contexts/NoteContext";


export default function NoteTabs() {
    const { notes, tabValue, setTabValue, setIsCreate } = useNoteContext();

    const handleTabChange = (event: SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ 
            borderBottom: 1, 
            borderColor: 'divider', 
            position: "sticky", 
            top: 0, 
            zIndex: 1000, 
            background: "white",
            left: 0,
            right: 0,
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)'
        }}>
            <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    my:1,
                    minHeight: 36,
                    '& .MuiTab-root': {
                        minHeight: 36,
                        fontSize: 13,
                        minWidth: 100,
                        maxWidth: 150,
                        textAlign: 'left',
                        alignItems: 'center',
                        borderRadius: 20,
                        border: '2px solid #aaa',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        mr: 1,
                        '&.Mui-selected': {
                            border: '2px solid #444',
                            fontWeight: "semibold"
                        }
                    },
                    '& .MuiTabs-flexContainer': {
                        mx: 2,
                    },
                    '& button': {
                        height: "40px",
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        px: "10px !important",
                        fontSize: "11px !important",
                    },
                    '& span': {
                        overflow: 'hidden',
                        display: 'block',
                    },
                    '.MuiTabs-scrollButtons': {
                        width: 20,
                        '&.Mui-disabled': {
                            opacity: 0.3
                        }
                    },
                    '& .MuiTabs-indicator': {
                        display: 'none'
                    }
                }}
            >
                <Tab 
                    icon={<AddIcon sx={{ fontSize: 18, mb: 0.2, mr: "4px !important", color: tabValue == 0 ? theme.palette.primary.main : "gray" }} />}
                    iconPosition="start"
                    label="新規作成"
                    onClick={() => setIsCreate(true)}
                    sx={{ fontSize: 13, '&.Mui-selected': { color: tabValue == 0 ? theme.palette.primary.main : "gray" } }}
                />
                {notes.map((value: NoteType, index: number) => (
                    <Tab 
                        key={index}
                        label={value.title || "無題のノート"}
                        sx={{ fontSize: 13, backgroundColor: notes[index].type == "game" ? "orange !important" : "#1976d2 !important", color: "#fff !important" }}
                        onClick={() => setIsCreate(false)}
                    />
                ))}
            </Tabs>
        </Box>
    )
}