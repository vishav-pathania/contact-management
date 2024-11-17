import api from "./api";

// Fetch all contacts
export const getContacts = async (searchQuery, page, limit) => {
  const response = await api.get("/contacts", {
    params: {
      searchQuery,
      page,
      limit,
    },
  });
  return response.data;
};

// Add a new contact
export const addContact = async (contactData) => {
  const response = await api.post("/contacts", contactData);
  return response.data;
};

// Update a contact
export const updateContact = async (id, updatedData) => {
  const response = await api.put(`/contacts/${id}`, updatedData);
  return response.data;
};

// Delete a contact
export const deleteContact = async (id) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
};
