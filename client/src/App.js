import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
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

  useEffect(() => {
    const fetchContacts = async () => {
      const data = await getContacts();
      setContacts(data);
    };
    fetchContacts();
  }, []);

  const handleAddContact = async (newContact) => {
    const addedContact = await addContact(newContact);
    setContacts([...contacts, addedContact]);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedContact) => {
    const savedContact = await updateContact(updatedContact._id, updatedContact);
    setContacts(contacts.map((contact) => (contact._id === savedContact._id ? savedContact : contact)));
    setEditModalOpen(false);
  };

  const handleDeleteContact = (contact) => {
    setSelectedContact(contact);
    setDeleteModalOpen(true);
  };

  const confirmDeleteContact = async () => {
    try {
      await deleteContact(selectedContact._id); // Use the full contact object, not just an ID
      setContacts(contacts.filter((contact) => contact._id !== selectedContact._id));
      setDeleteModalOpen(false);
    } catch (error) {
      alert('Failed to delete contact. Please try again.');
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Management
      </Typography>
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
