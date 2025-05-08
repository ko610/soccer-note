import { db } from "@/lib/firebase/config";
import { collection, getDocs } from "firebase/firestore";
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