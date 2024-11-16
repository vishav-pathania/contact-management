import api from './api';

// Fetch all contacts
export const getContacts = async () => {
  const response = await api.get('/contacts');
  return response.data;
};

// Add a new contact
export const addContact = async (contactData) => {
  const response = await api.post('/contacts', contactData);
  return response.data;
};

// Update a contact
export const updateContact = async (id, updatedData) => {
  const response = await api.put(`/contacts/${id}`, updatedData);
  return response.data;
};

// Delete a contact
export const deleteContact = async (id) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
};
