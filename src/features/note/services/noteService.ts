import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { NoteType } from "@/types/note/Note";
import { GameModel } from "@/types/note/game/Game";
import { PracticeModel } from "@/types/note/practice/Practice";

// ノートを取得する
export const fetchNotes = async (): Promise<NoteType[]> => {
  const notesRef = collection(db, "notes");
  const snapshot = await getDocs(notesRef);

  const notes: NoteType[] = snapshot.docs.map((doc) => {
    const data = doc.data();

    if (data.type === "game") {
      return new GameModel(data);
    } else if (data.type === "practice") {
      return new PracticeModel(data);
    } else {
      throw new Error(`Unknown note type: ${data.type}`);
    }
  });

  return notes;
};

// ノートを作成する
export const createNote = async (note: NoteType) => {
  const notesRef = collection(db, "notes");
  await addDoc(notesRef, {
    ...note,
    createDate: serverTimestamp(),
    updateDate: serverTimestamp(),
  });
};

// ノートを更新する
export const updateNote = async (note: NoteType) => {
  const notesRef = doc(db, "notes", note.id);
  await updateDoc(notesRef, {
    ...note,
    updateDate: serverTimestamp(),
  });
};

// ノートを削除する
export const deleteNote = async (note: NoteType) => {
  const notesRef = doc(db, "notes", note.id);
  await deleteDoc(notesRef);
};