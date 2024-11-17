import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Grid } from '@mui/material';

const EditContactModal = ({ open, onClose, contact, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  // Update formData when the contact changes
  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!contact) return null; // Render nothing if no contact is provided

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 4, backgroundColor: 'white', margin: 'auto', maxWidth: 400, mt: '10%' }}>
        <h3>Edit Contact</h3>
        <Grid container spacing={2}>
          {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map((field) => (
            <Grid item xs={12} key={field}>
              <TextField
                fullWidth
                label={field.replace(/([A-Z])/g, ' $1')}
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button onClick={handleSave} variant="contained" color="primary">
              Save
            </Button>
            <Button onClick={onClose} variant="outlined" color="secondary" sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default EditContactModal;
