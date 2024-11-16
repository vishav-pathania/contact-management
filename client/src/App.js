import React, { useState, useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';
import { getContacts, addContact, updateContact, deleteContact } from './services/contacts';

const App = () => {
  const [contacts, setContacts] = useState([]);

  // Fetch all contacts from the server when the component loads
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data); // Update state with server data
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  // Add a new contact
  const handleAddContact = async (newContact) => {
    try {
      const addedContact = await addContact(newContact); // Send to server
      setContacts([...contacts, addedContact]); // Update local state
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  // Edit an existing contact
  const handleEditContact = async (updatedContact) => {
    try {
      const updated = await updateContact(updatedContact.id, updatedContact); // Send to server
      setContacts(
        contacts.map((contact) =>
          contact.id === updatedContact.id ? updated : contact
        )
      ); // Update local state
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  // Delete a contact
  const handleDeleteContact = async (id) => {
    try {
      await deleteContact(id); // Remove from server
      setContacts(contacts.filter((contact) => contact.id !== id)); // Update local state
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Management
      </Typography>
      <ContactForm onSubmit={handleAddContact} />
      <ContactsTable
        contacts={contacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
    </Container>
  );
};

export default App;
