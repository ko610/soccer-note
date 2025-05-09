"use client"

import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

type ImageGalleryProps = {
    images: string[]
}

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [activeImageIndex, setActiveImageIndex] = React.useState(0);
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    return (
        <>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 2000
                }}
            >
                <Box
                    onClick={(e) => e.stopPropagation()}
                    sx={{
                        position: 'relative',
                        maxWidth: '90vw',
                        maxHeight: '90vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <IconButton
                        onClick={() => setIsModalOpen(false)}
                        sx={{
                            position: 'absolute',
                            color: 'black',
                            background: "white !important",
                            zIndex: 2100,
                            top: -18,
                            right: -18,
                            p: 0,
                        }}
                    >
                        <HighlightOffIcon />
                    </IconButton>
                    <img
                        src={images[activeImageIndex]}
                        alt={`画像 ${activeImageIndex + 1}`}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '90vh',
                            objectFit: 'contain'
                        }}
                    />
                </Box>
            </Modal>

            <Box sx={{ px: 2, my: 2 }}>
                <Box sx={{ position: 'relative', width: '100%', height: 200 }}>
                    <IconButton
                        onClick={() => setActiveImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1)}
                        sx={{
                            position: 'absolute',
                            left: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                        }}
                    >
                        <KeyboardArrowLeft />
                    </IconButton>

                    <Box sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'relative'
                    }}>
                        <img
                            src={images[activeImageIndex]}
                            alt={`画像 ${activeImageIndex + 1}`}
                            onClick={() => setIsModalOpen(true)}
                            style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                                cursor: 'pointer'
                            }}
                        />
                        <Typography sx={{
                            position: 'absolute',
                            bottom: 8,
                            right: 8,
                            backgroundColor: 'rgba(0, 0, 0, 0.6)',
                            color: 'white',
                            padding: '4px 8px',
                            borderRadius: 1,
                            fontSize: 12
                        }}>
                            {activeImageIndex + 1} / {images.length}
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={() => setActiveImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0)}
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            zIndex: 1,
                            backgroundColor: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                        }}
                    >
                        <KeyboardArrowRight />
                    </IconButton>
                </Box>
            </Box>
        </>
    );
}
