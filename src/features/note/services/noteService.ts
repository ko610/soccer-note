import { addDoc, collection, deleteDoc, doc, getDocs, serverTimestamp, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "@/lib/firebase/config";
import { NoteType } from "@/types/note/Note";
import { GameModel } from "@/types/note/game/Game";
import { PracticeModel } from "@/types/note/practice/Practice";
import { getDownloadURL } from "firebase/storage";
import { uploadBytes } from "firebase/storage";
import { ref } from "firebase/storage";

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
export const createNote = async (note: NoteType, images: File[]) => {
  const uid = await auth.currentUser?.uid;
  if (!uid) {
    throw new Error("User not found");
  }

  const notesRef = collection(db, "notes");
  const imageUrls = await uploadImage(images, uid);
  await addDoc(notesRef, {
    ...note,
    uid: uid,
    imageUrls: imageUrls,
    createDate: serverTimestamp(),
    updateDate: serverTimestamp(),
  });
};

// ノートを更新する
export const updateNote = async (note: NoteType, images: File[]) => {
  const uid = await auth.currentUser?.uid;
  if (!uid) {
    throw new Error("User not found");
  }

  const notesRef = doc(db, "notes", note.id);
  const imageUrls = await uploadImage(images, uid);
  await updateDoc(notesRef, {
    ...note,
    imageUrls: imageUrls,
    updateDate: serverTimestamp(),
  });
};

// ノートを削除する
export const deleteNote = async (note: NoteType) => {
  const notesRef = doc(db, "notes", note.id);
  await deleteDoc(notesRef);
};

// 画像をアップロードする
export const uploadImage = async (images: File[], uid: string): Promise<string[]> => {
    const imageUrls: string[] = [];
    for (let i = 0; images.length; i++) {
        const file = images[i];
        const fileName = `note/${uid}/${Date.now()}_${i}_${file.name}`;

        const storageRef = ref(storage, fileName);
        const fileBuffer = await file.arrayBuffer();
        await uploadBytes(storageRef, new Uint8Array(fileBuffer));

        const publicUrl = await getDownloadURL(storageRef);
        imageUrls.push(publicUrl);
    }

    return imageUrls;
};
