import React, { useState } from 'react';
import { Container, Typography } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactsTable from './components/ContactsTable';

const App = () => {
  const [contacts, setContacts] = useState([]);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, { id: contacts.length + 1, ...newContact }]);
  };

  const handleEditContact = (updatedContact) => {
    setContacts(contacts.map((contact) => (contact.id === updatedContact.id ? updatedContact : contact)));
  };

  const handleDeleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Contact Management
      </Typography>
      <ContactForm onSubmit={handleAddContact} />
      <ContactsTable contacts={contacts} onEdit={handleEditContact} onDelete={handleDeleteContact} />
    </Container>
  );
};

export default App;
