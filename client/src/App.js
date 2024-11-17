import React, { useState, useEffect, useCallback } from "react";
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
import debounce from "lodash/debounce";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [totalContacts, setTotalContacts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const debouncedFetchContacts = useCallback(
    debounce(async (searchQuery, page, rowsPerPage) => {
      setLoading(true);
      try {
        const { contacts, totalContacts, totalPages, currentPage } =
          await getContacts(searchQuery, page + 1, rowsPerPage);
        console.log(contacts);
        setContacts(contacts);
        setTotalContacts(totalContacts);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (err) {
        setError("Unable to connect to server");
        setLoading(false);
      }
    }, 800),
    []
  );

  useEffect(() => {
    debouncedFetchContacts(searchQuery, page, rowsPerPage); // Call the debounced function
    return () => {
      debouncedFetchContacts.cancel(); // Cleanup the debounce on component unmount or when dependencies change
    };
  }, [page, rowsPerPage, searchQuery, debouncedFetchContacts]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
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
    } catch (err) {
      setError("Unable to connect to server");
    }
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
    setEditModalOpen(true);
  };

  const handleSaveEdit = async (updatedContact) => {
    try {
      const savedContact = await updateContact(
        updatedContact._id,
        updatedContact
      );

      // Update the contacts state immediately after editing
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact._id === savedContact._id ? savedContact : contact
        )
      );

      setEditModalOpen(false); // Close the modal
    } catch (err) {
      setError("Unable to connect to server");
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
      alert("Failed to delete contact. Please try again.");
      console.error("Error deleting contact:", error);
    }
  };

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

      {loading && (
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(255, 255, 255, 0.7)" // Optional: adds semi-transparent background to make loader stand out
          zIndex="999" // Ensures loader is on top
        >
          <CircularProgress />
        </Box>
      )}

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
          contacts={contacts}
          onEdit={handleEditContact}
          onDelete={handleDeleteContact}
        />
      </Box>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalContacts}
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
