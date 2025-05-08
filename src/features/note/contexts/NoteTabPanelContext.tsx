"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { NoteType } from "@/types/note/Note";
import type { GameModel } from "@/types/note/game/Game";
import type { PracticeModel } from "@/types/note/practice/Practice";

// 型定義
interface NoteTabPanelContextType {
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
  tabValue: number;
  setTabValue: (val: number) => void;
  noteCreateMenu: number;
  setNoteCreateMenu: (val: number) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  date: string;
  setDate: (val: string) => void;
  boards: any[];
  setBoards: (boards: any[]) => void;
  isCreate: boolean;
  setIsCreate: (val: boolean) => void;
}

const NoteTabPanelContext = createContext<NoteTabPanelContextType | undefined>(undefined);

export const NoteTabPanelProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [tabValue, setTabValue] = useState(0);
  const [noteCreateMenu, setNoteCreateMenu] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState("");
  const [boards, setBoards] = useState<any[]>([]);
  const [isCreate, setIsCreate] = useState(false);
  
  return (
    <NoteTabPanelContext.Provider
      value={{
        notes,
        setNotes,
        tabValue,
        setTabValue,
        noteCreateMenu,
        setNoteCreateMenu,
        isLoading,
        setIsLoading,
        date,
        setDate,
        boards,
        setBoards,
        isCreate,
        setIsCreate,
      }}
    >
      {children}
    </NoteTabPanelContext.Provider>
  );
};

export const useNoteTabPanelContext = () => {
  const context = useContext(NoteTabPanelContext);
  if (!context) {
    throw new Error("useNoteTabPanelContext must be used within a NoteTabPanelProvider");
  }
  return context;
};