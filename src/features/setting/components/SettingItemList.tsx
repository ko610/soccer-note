import { Box, List, Divider, Card } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import GavelIcon from '@mui/icons-material/Gavel';
import SecurityIcon from '@mui/icons-material/Security';
import LogoutButton from './LogoutButton';
import SettingItem from './SettingButton';

export default function SettingPage() {
    return (
        <Box sx={{ width: "100%", maxWidth: 600, mx: "auto" }}>
            <List sx={{ px: 2 }}>
                <Card sx={{ borderRadius: "10px", boxShadow: "none" }}>
                    <SettingItem href="/contact" fontColor="black" primary="お問い合わせ" icon={<EmailOutlinedIcon />} />
                    <SettingItem href="/privacy" fontColor="black" primary="プライバシーポリシー" icon={<SecurityIcon />} />
                    <SettingItem href="/term" fontColor="black" primary="利用規約" icon={<GavelIcon />} />
                </Card>
                
                <Divider />

                <LogoutButton />
                <Divider />
            </List>
        </Box>
    );
}