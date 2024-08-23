import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiHelper from "../utils/apiHelper";
import { API_BASE_URL } from "../constants";

const ContactList = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [editContactId, setEditContactId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    contactNumber: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await apiHelper(
        "get",
        `${API_BASE_URL}/contacts`
      );
      if (data) {
        setContacts(data);
      } else {
        setError(error);
      }
      setLoading(false);
    };

    fetchContacts();
  }, []);

  const handleEditClick = (contact) => {
    setEditContactId(contact._id);
    setEditFormData({
      firstName: contact.firstName,
      lastName: contact.lastName,
      contactNumber: contact.contactNumber,
      email: contact.email,
    });
  };

  const handleInputChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = async (id) => {
    setLoading(true);

    const { data, error } = await apiHelper(
      "put",
      `${API_BASE_URL}/contacts/${id}`,
      editFormData
    );

    if (data) {
      const updatedContacts = contacts.map((contact) =>
        contact._id === id ? { ...contact, ...editFormData } : contact
      );
      setContacts(updatedContacts);
      setEditContactId(null);
    } else {
      setError(error || "Failed to update contact");
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      const { data, error } = await apiHelper(
        "delete",
        `${API_BASE_URL}/contacts/${id}`
      );
      if (data) {
        setContacts(contacts.filter((contact) => contact._id !== id));
      } else {
        alert(error || "Failed to delete the contact");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          Contact List{" "}
          <span className="text-gray-500">({contacts.length})</span>
        </h2>
        <button
          onClick={() => navigate("/contacts/new")} // Navigate to CreateContact page
          className="bg-purple-600 text-white px-6 py-2 rounded-full shadow-lg hover:bg-purple-800 transition duration-300"
        >
          + Add New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">First Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Contact Number</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-100">
                {editContactId === contact._id ? (
                  <>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="firstName"
                        value={editFormData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="lastName"
                        value={editFormData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="text"
                        name="contactNumber"
                        value={editFormData.contactNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        className="text-green-500 mr-2 hover:underline"
                        onClick={() => handleSaveClick(contact._id)}
                      >
                        Save
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => setEditContactId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-4 py-2">{contact.firstName}</td>
                    <td className="border px-4 py-2">{contact.lastName}</td>
                    <td className="border px-4 py-2">
                      {contact.contactNumber}
                    </td>
                    <td className="border px-4 py-2">{contact.email}</td>
                    <td className="border px-4 py-2">
                      <button
                        className="text-blue-500 mr-2 hover:underline"
                        onClick={() => handleEditClick(contact)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:underline"
                        onClick={() => handleDelete(contact._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
