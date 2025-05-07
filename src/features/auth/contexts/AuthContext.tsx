// features/auth/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

const AuthContext = createContext<{
  user: User | null;
  isLoading: boolean;
}>({
  user: null,
  isLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
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

    useEffect(() => {
        if (!isLoading) {
            if (user) {
                router.push("/note");
            } else {
                router.push("/auth/login");
            }
        }
    }, [user, isLoading])

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
