import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';

export const useGetAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        onAuthStateChanged(auth, (newUser) => {
          if (newUser) {
            setUser(newUser)
          }
          setIsLoading(false)
        })
    }, []);

    return [user, setUser, isLoading]
}