import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Alert,
  TextField,
  TablePagination,
} from "@mui/material";
import ContactForm from "./components/ContactForm";
import ContactsTable from "./components/ContactsTable";
import EditContactModal from "./components/EditContactModal";
import ConfirmDeleteModal from "./components/ConfirmDeleteModal";
import {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts();
        setContacts(data);
        setFilteredContacts(data);
        setLoading(false);
      } catch (err) {
        setError("Unable to connect to server");
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterContacts(query);
  };

  const filterContacts = (query) => {
    const filtered = contacts.filter((contact) =>
      contact.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredContacts(filtered);
    setPage(0); // Reset pagination to the first page on search
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddContact = async (newContact) => {
    try {
      const addedContact = await addContact(newContact);
      setContacts((prevContacts) => [...prevContacts, addedContact]);
      setFilteredContacts((prevFilteredContacts) => [...prevFilteredContacts, addedContact]); // If search is implemented
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
      
      // Update the contacts state immediately after editing
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === savedContact._id ? savedContact : contact
        )
      );
  
      // Also update the filteredContacts to ensure the search results remain consistent
      setFilteredContacts((prevFilteredContacts) =>
        prevFilteredContacts.map((contact) =>
          contact._id === savedContact._id ? savedContact : contact
        )
      );
  
      setEditModalOpen(false); // Close the modal
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
      await deleteContact(selectedContact._id); // Delete contact from the database
      // Update the frontend state by filtering out the deleted contact
      setContacts((prevContacts) => 
        prevContacts.filter((contact) => contact._id !== selectedContact._id)
      );
      setDeleteModalOpen(false); // Close the modal
      setSelectedContact(null); // Clear the selected contact
    } catch (error) {
      alert('Failed to delete contact. Please try again.');
      console.error('Error deleting contact:', error);
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
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
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography
        variant="h4"
        align="center"
        sx={{ marginBottom: 4, fontWeight: 600, color: "primary.main" }}
      >
        Contact Management
      </Typography>

      {/* Search */}
      <TextField
        label="Search by Email"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearchChange}
        sx={{ mb: 4 }}
      />

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3, fontWeight: 500 }}>
          {error}
        </Alert>
      )}

      {/* Contact Form */}
      <Box
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 2,
          borderRadius: 2,
          padding: 3,
          mb: 4,
        }}
      >
        <ContactForm onSubmit={handleAddContact} />
      </Box>

      {/* Contacts Table */}
      <Box
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 2,
          borderRadius: 2,
          padding: 3,
          mb: 4,
        }}
      >
        <ContactsTable
          contacts={filteredContacts.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredContacts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>

      {/* Modals */}
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
