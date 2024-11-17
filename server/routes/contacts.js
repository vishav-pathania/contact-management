import express from 'express';
const router = express.Router();
import {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact
} from '../controllers/contactController.js';

// Get all contacts
router.get('/', getAllContacts);

// Add a new contact
router.post('/', createContact);

// Update a contact
router.put('/:id', updateContact);

// Delete a contact
router.delete('/:id', deleteContact);

export default router;
