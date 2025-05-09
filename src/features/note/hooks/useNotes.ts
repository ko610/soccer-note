import { useState, useEffect } from 'react';
import { useAuth } from '@/features/auth/contexts/AuthContext';
import { fetchNotes } from '../services/noteService';
import { NoteType } from '@/types/note/Note';

export const useNotes = (date: Date) => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        const fetchedNotes = await fetchNotes();
        setNotes(fetchedNotes);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch notes'));
      } finally {
        setIsLoading(false);
      }
    };

    loadNotes();
  }, [user, date]);

  return { notes, setNotes, isLoading, error };
}; 