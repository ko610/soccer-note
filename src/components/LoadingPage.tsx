import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Image from 'next/image';

export default function LoadingPage() {
    return (
        <Box sx={{ overflow: "hidden", position: "fixed", top: 0, display: 'flex', zIndex: 2200, width: "100%", maxWidth: "550px", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            {/* <CircularProgress sx={{ zIndex: 2000 }} color="success" /> */}
            <span style={{ position: 'relative', width: '60px', height: '60px', display: 'inline-block' }}>
                <Image 
                    src="/images/icon.png" 
                    alt="loading" 
                    fill
                    priority
                    sizes="60px"
                    style={{ objectFit: 'contain' }}
                /> 
            </span>
        </Box>
    );
}