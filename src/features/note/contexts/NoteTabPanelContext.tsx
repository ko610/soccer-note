"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { NoteType } from "@/types/note/Note";

// コンテキスト型
interface NoteTabPanelContextType {
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
  tabValue: number;
  setTabValue: (val: number) => void;
  noteCreateMenu: number;
  setNoteCreateMenu: (val: number) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  date: Date;
  isCreate: boolean;
  setIsCreate: (val: boolean) => void;
}

const NoteTabPanelContext = createContext<NoteTabPanelContextType | undefined>(undefined);

// Providerのprops型
type NoteTabPanelProviderProps = {
  children: ReactNode;
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
  boards: any[];
  date: Date;
};

export const NoteTabPanelProvider = ({
  children,
  notes,
  setNotes,
  boards,
  date,
}: NoteTabPanelProviderProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [noteCreateMenu, setNoteCreateMenu] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(false);

  useEffect(() => {
    const hasNotes = notes && notes.length > 0;
    setTabValue(hasNotes ? 1 : 0);
    setIsCreate(!hasNotes);
  }, [date, notes]);

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
        isCreate,
        setIsCreate,
      }}
    >
      {children}
    </NoteTabPanelContext.Provider>
  );
};

// 正しいフック
export const useNoteTabPanelContext = () => {
  const context = useContext(NoteTabPanelContext);
  if (!context) {
    throw new Error("useNoteTabPanelContext must be used within a NoteTabPanelProvider");
  }
  return context;
};
