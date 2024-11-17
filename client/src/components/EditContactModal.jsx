import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Grid } from '@mui/material';
import { isValidEmail, isEmpty } from '../utils/validators';

// Utility to strip phone number formatting
const stripPhoneNumberFormatting = (formattedNumber) => {
  return formattedNumber.replace(/[^\d]/g, ''); // Remove all non-numeric characters
};

const EditContactModal = ({ open, onClose, contact, onSave }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const [errors, setErrors] = useState({}); // State to store error messages

  // Update formData when the contact changes
  useEffect(() => {
    if (contact) {
      setFormData({
        ...contact,
        phoneNumber: stripPhoneNumberFormatting(contact.phoneNumber), // Unformat the phone number
      });
      setErrors({}); // Reset errors when loading a new contact
    }
  }, [contact]);

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Check required fields
    ['firstName', 'lastName', 'email', 'phoneNumber'].forEach((field) => {
      if (isEmpty(formData[field])) {
        newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} is required`;
        isValid = false;
      }
    });

    // Validate email
    if (!isEmpty(formData.email) && !isValidEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
      isValid = false;
    }

    // Validate phone number
    const phoneRegex = /^\d{10}$/; // Ensure it is 10 digits
    if (!isEmpty(formData.phoneNumber) && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
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
                error={!!errors[field]} // Show error state if validation fails
                helperText={errors[field]} // Display validation error messages
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
