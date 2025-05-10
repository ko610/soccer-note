import { Box } from "@mui/material";

import { GameModel } from "@/types/note/game/Game";
import NoteFormBox from "../forms/containers/NoteFormBox";
import { NoteType } from "@/types/note/Note";
import { PracticeModel } from "@/types/note/practice/Practice";
import GameNote from "../contents/notes/GameNote";
import PracticeNote from "../contents/notes/PracticeNote";
import { useNoteContext } from "@/features/note/contexts/NoteContext";

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
}


function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <Box>{children}</Box>
            )}
        </div>
    );
}       

export default function NoteTabPanel() {
    const { notes, setNotes, isLoading, setIsLoading, isCreate, setIsCreate, date, tabValue, setTabValue } = useNoteContext();
    
    console.log(tabValue)

    return (
        <>
            <CustomTabPanel value={tabValue} index={0}>
                <NoteFormBox allNotes={notes} setNotes={setNotes} isLoading={isLoading} setIsLoading={setIsLoading} isCreate={isCreate} setIsCreate={setIsCreate} date={date} setTabValue={setTabValue} />
            </CustomTabPanel>

            {notes.map((value: NoteType, index: number) => (
                <CustomTabPanel key={index} value={tabValue} index={index + 1}>
                    {value.type == "game" &&
                        <GameNote allNotes={notes} gameNote={value as GameModel} setNotes={setNotes} setTabValue={setTabValue} />
                    }
                    {value.type == "practice" &&
                        <PracticeNote allNotes={notes as NoteType[]} practiceNote={value as PracticeModel} setNotes={setNotes} setTabValue={setTabValue} />
                    }
                </CustomTabPanel>
            ))}
        </>
    )
}