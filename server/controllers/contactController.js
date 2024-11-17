import Contact from "../models/Contact.js";

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const searchQuery = req.query.searchQuery;
    const query =
      searchQuery && searchQuery.trim() !== ""
        ? { email: { $regex: searchQuery, $options: "i" } }
        : {};
    const contacts = await Contact.find(query).skip(skip).limit(limit);
    const totalContacts = await Contact.countDocuments();

    res.status(200).json({
      contacts,
      totalContacts,
      totalPages: Math.ceil(totalContacts / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log("Error in getAllContacts: ", error);
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};

// Add a new contact
export const createContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const contact = await newContact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: "Error adding contact", error });
  }
};

// Update a contact
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: "Error updating contact", error });
  }
};

// Delete a contact
export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};
