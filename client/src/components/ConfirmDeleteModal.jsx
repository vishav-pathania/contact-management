import React from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const ConfirmDeleteModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', maxWidth: 300, mt: '10%' }}>
        <Typography variant="h6">Confirm Deletion</Typography>
        <Typography variant="body1" sx={{ mt: 2, mb: 3 }}>
          Are you sure you want to delete this contact?
        </Typography>
        <Button onClick={onConfirm} variant="contained" color="error">
          Delete
        </Button>
        <Button onClick={onClose} variant="outlined" color="primary" sx={{ ml: 2 }}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ConfirmDeleteModal;
