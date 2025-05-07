import { ListItem, ListItemText, ListItemIcon, ListItemButton, Card } from "@mui/material";

type LogoutButtonProps = {
    href: string;
    fontColor: string;
    primary: string;
    icon: React.ReactNode;
}

export default function SettingItem({ href, fontColor, primary, icon }: LogoutButtonProps) {
    return (
        <Card sx={{ borderRadius: "10px", boxShadow: "none" }}>
            <ListItem disablePadding>
                <ListItemButton 
                component="a"
                href={href}
                target="_blank"
                sx={{ color: fontColor }}
            >
                <ListItemIcon sx={{ minWidth: 40 }}>
                    {icon}
                </ListItemIcon>
                <ListItemText 
                    primary={primary}
                    sx={{ span: { fontSize: 14 } }}
                />
            </ListItemButton>
            </ListItem>
        </Card>
    );
}