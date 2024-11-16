const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  createContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');

// Get all contacts
router.get('/', getAllContacts);

// Add a new contact
router.post('/', createContact);

// Update a contact
router.put('/:id', updateContact);

// Delete a contact
router.delete('/:id', deleteContact);

module.exports = router;
