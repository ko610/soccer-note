import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

type ConfirmModalText = {
    title: string;
    description: string;
    submitButtonText: string;
    cancelButtonText: string;
  };
  
  type ConfirmModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSubmit: () => void;
    text: ConfirmModalText;
  };

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: 320,
    maxWidth: '100%'
};

export default function ConfirmModal({ open, setOpen, onSubmit, text }: ConfirmModalProps) {
    const handleClose = () => setOpen(false);

    const SubmitButtonClick = () => {
        onSubmit()
    }

    const CancelButtonClick = () => {
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper sx={style} >
                <Box sx={{ textAlign: "center", p: 2 }}>
                    <Typography variant="h4" sx={{ fontSize: 15, mb: 1 }}>
                        {text.title}
                    </Typography>
                    {text.description && (
                        <Typography variant="body1" sx={{ fontSize: 12 }}>
                            {text.description}
                        </Typography>
                    )}
                </Box>
                <Divider />
                <MenuList sx={{ textAlign: "center" }}>
                    <MenuItem sx={{ py: 1 }} onClick={SubmitButtonClick} >
                        <Typography variant="button" sx={{ mx: "auto", color: "red", fontWeight: "bold" }} >{text.submitButtonText}</Typography>
                    </MenuItem>
                    <MenuItem sx={{ py: 1 }} onClick={CancelButtonClick}>
                        <Typography variant="button" sx={{ mx: "auto" }}>{text.cancelButtonText}</Typography>
                    </MenuItem>
                </MenuList>
            </Paper>
        </Modal>
    )
}