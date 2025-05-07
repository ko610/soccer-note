// features/auth/contexts/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, getAuth, User } from "firebase/auth";
import { auth } from "@/lib/firebase/config";

const AuthContext = createContext<{
  user: User | null;
  isAuthLoading: boolean;
}>({
  user: null,
  isAuthLoading: true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);


useEffect(() => {
    onAuthStateChanged(auth, (newUser) => {
        if (newUser) {
        setUser(newUser)
        }
        setIsAuthLoading(false)
    })
    }, []);

    useEffect(() => {
        if (!isAuthLoading) {
            if (user) {
                router.push("/note");
            } else {
                router.push("/auth/login");
            }
        }
    }, [user, isAuthLoading])

  return (
    <AuthContext.Provider value={{ user, isAuthLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
