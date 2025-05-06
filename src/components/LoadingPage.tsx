import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Image from 'next/image';

export default function LoadingPage() {
    return (
        <Box sx={{ overflow: "hidden", position: "fixed", top: 0, display: 'flex', zIndex: 2200, width: "100%", maxWidth: "550px", height: "100vh", alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
            {/* <CircularProgress sx={{ zIndex: 2000 }} color="success" /> */}
            <Image src="/small-icon.png" alt="loading" width={100} height={100} /> 
        </Box>
    );
}