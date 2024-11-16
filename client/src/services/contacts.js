import api from './api';

// Fetch all contacts
export const getContacts = async () => {
  try {
    const response = await api.get('/contacts');
    return response.data;
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// Add a new contact
export const addContact = async (contactData) => {
  try {
    const response = await api.post('/contacts', contactData);
    return response.data;
  } catch (error) {
    console.error('Error adding contact:', error);
    throw error;
  }
};

// Update an existing contact
export const updateContact = async (id, updatedData) => {
  try {
    const response = await api.put(`/contacts/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};
