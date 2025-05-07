import { useRouter } from 'next/navigation'
import { signOut } from "firebase/auth";
import { auth } from '@/lib/firebase/config';

export const useSignOut = async () => {
    const router = useRouter()

    await signOut(auth).then(() => {
        router.push("/auth/signout")
    }).catch((error) => {
        console.log(error)
    })
}