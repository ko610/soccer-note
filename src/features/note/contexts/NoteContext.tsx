"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import type { NoteType } from "@/types/note/Note";

// コンテキスト型
interface NoteContextType {
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

const NoteContext = createContext<NoteContextType | undefined>(undefined);

// Providerのprops型
type NoteProviderProps = {
  children: ReactNode;
  notes: NoteType[];
  setNotes: (notes: NoteType[]) => void;
  date: Date;
};

export const NoteProvider = ({
  children,
  notes,
  setNotes,
  date,
}: NoteProviderProps) => {
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
    <NoteContext.Provider
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
    </NoteContext.Provider>
  );
};

export const useNoteContext = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNoteContext must be used within a NoteProvider");
  }
  return context;
};
