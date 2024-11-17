import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress, Box, Alert } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import EditContactModal from './components/EditContactModal';
import ConfirmDeleteModal from './components/ConfirmDeleteModal';
import { getContacts, addContact, updateContact, deleteContact } from './services/contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
        setLoading(false);
      } catch (err) {
        setError('Unable to connect to server');  // Set error message
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleAddContact = async (newContact) => {
    try {
      const addedContact = await addContact(newContact);
      setContacts([...contacts, addedContact]);
    } catch (err) {
      setError('Unable to connect to server');
    }
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedContact) => {
    try {
      const savedContact = await updateContact(updatedContact._id, updatedContact);
      setContacts(contacts.map((contact) => (contact._id === savedContact._id ? savedContact : contact)));
      setEditModalOpen(false);
    } catch (err) {
      setError('Unable to connect to server');
    }
  };

  const handleDeleteContact = (contact) => {
    setSelectedContact(contact);
    setDeleteModalOpen(true);
  };

  const confirmDeleteContact = async () => {
    try {
      await deleteContact(selectedContact._id);
      setContacts(contacts.filter((contact) => contact._id !== selectedContact._id));
      setDeleteModalOpen(false);
    } catch (error) {
      alert('Failed to delete contact. Please try again.');
      console.error('Error deleting contact:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography variant="h4" align="center" color="error" gutterBottom>
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Management
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <ContactForm onSubmit={handleAddContact} />
      <ContactsTable contacts={contacts} onEdit={handleEditContact} onDelete={handleDeleteContact} />
      <EditContactModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        contact={selectedContact}
        onSave={handleSaveEdit}
      />
      <ConfirmDeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteContact}
      />
    </Container>
  );
};

export default App;
