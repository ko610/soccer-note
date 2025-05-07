import { useState } from "react";
import { useRouter } from "next/navigation";
import { ListItem, ListItemText, ListItemIcon, ListItemButton, Card } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useSignOut } from "@/features/auth/hooks/useSignOut";
import ConfirmModal from "@/components/ui/ConfirmModal";
import { confirmModalText } from "@/constants/ConfirmModalText";

export default function LogoutButton() {
    const router = useRouter()
    const [logoutModalOpen, setLogoutModalOpen] = useState<boolean>(false)

    const handleLogout = () => {
        useSignOut(router)
        setLogoutModalOpen(false)
    }

    return (
        <Card sx={{ borderRadius: "10px", boxShadow: "none" }}>
            <ConfirmModal open={logoutModalOpen} setOpen={setLogoutModalOpen} onClick={handleLogout} text={confirmModalText.logout} />
            <ListItem disablePadding>
                <ListItemButton 
                onClick={() => setLogoutModalOpen(true)}
                sx={{ color: "red" }}
            >
                <ListItemIcon sx={{ minWidth: 40 }}>
                    <LogoutIcon sx={{ color: "red" }} />
                </ListItemIcon>
                <ListItemText 
                    primary="ログアウト"
                    sx={{ span: { fontSize: 14 } }}
                />
            </ListItemButton>
            </ListItem>
        </Card>
    );
}