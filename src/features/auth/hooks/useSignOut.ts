import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { signOut } from "firebase/auth";
import { auth } from '@/lib/firebase/config';

export const useSignOut = async (router: AppRouterInstance) => {
    await signOut(auth).then(() => {
        router.push("/auth/login")
    }).catch((error) => {
        console.log(error)
    })
}