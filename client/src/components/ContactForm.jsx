import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { isValidEmail, isEmpty } from '../utils/validators';
import { formatPhoneNumber } from '../utils/formatters';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const [errors, setErrors] = useState({}); // Track validation errors

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
    const phoneRegex = /^\d{10}$/;
    if (!isEmpty(formData.phoneNumber) && !phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Format phone number if editing phoneNumber field
    const formattedValue =
      name === 'phoneNumber' ? value.replace(/[^\d]/g, '').slice(0, 10) : value;

    setFormData({ ...formData, [name]: formattedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Format phone number before submission
      const formattedData = {
        ...formData,
        phoneNumber: formatPhoneNumber(formData.phoneNumber),
      };
      onSubmit(formattedData);

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        company: '',
        jobTitle: '',
      });
      setErrors({});
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map((field, idx) => (
          <Grid item xs={12} sm={6} key={idx}>
            <TextField
              fullWidth
              label={field.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              error={!!errors[field]} // Show error state if validation fails
              helperText={errors[field]} // Display validation error messages
              required={['firstName', 'lastName', 'email', 'phoneNumber'].includes(field)}
            />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactForm;
