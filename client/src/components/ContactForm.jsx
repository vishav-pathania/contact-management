import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    jobTitle: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      company: '',
      jobTitle: '',
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <Grid container spacing={2}>
        {['firstName', 'lastName', 'email', 'phoneNumber', 'company', 'jobTitle'].map((field, idx) => (
          <Grid item xs={12} sm={6} key={idx}>
            <TextField
              fullWidth
              label={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
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
