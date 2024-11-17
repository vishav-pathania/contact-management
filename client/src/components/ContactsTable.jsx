import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ContactsTable = ({ contacts, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone Number</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact._id}>
              <TableCell>{contact.firstName}</TableCell>
              <TableCell>{contact.lastName}</TableCell>
              <TableCell>{contact.email}</TableCell>
              <TableCell>{contact.phoneNumber}</TableCell>
              <TableCell>{contact.company}</TableCell>
              <TableCell>{contact.jobTitle}</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {/* Edit Button */}
                  <Button
                    color="primary"
                    onClick={() => onEdit(contact)}
                    startIcon={<EditIcon />}
                    variant="outlined"
                    size="medium"
                    sx={{ width: "100%" }} // Ensures both buttons have the same width
                  >
                    Edit
                  </Button>

                  {/* Delete Button */}
                  <Button
                    color="error"
                    onClick={() => onDelete(contact)}
                    startIcon={<DeleteIcon />}
                    variant="outlined"
                    size="medium"
                    sx={{ width: "100%" }} // Ensures both buttons have the same width
                  >
                    Delete
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
