import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const ContactsTable = ({ contacts, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {['First Name', 'Last Name', 'Email', 'Phone Number', 'Company', 'Job Title', 'Actions'].map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {contacts.map((contact, index) => (
            <TableRow key={index}>
              {Object.values(contact).map((value, idx) => (
                <TableCell key={idx}>{value}</TableCell>
              ))}
              <TableCell>
                <Button color="primary" onClick={() => onEdit(contact)}>Edit</Button>
                <Button color="secondary" onClick={() => onDelete(contact.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ContactsTable;
