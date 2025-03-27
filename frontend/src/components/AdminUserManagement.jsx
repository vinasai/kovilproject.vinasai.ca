import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]); // State to store all users
  const [searchTerm, setSearchTerm] = useState(''); // State to store the search term
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for editing
  const [familyMembers, setFamilyMembers] = useState([]); // State to store family members for editing

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/users');
        setUsers(response.data); // Set the fetched users to the state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Delete a user
  const deleteUser = (userId) => {
    console.log('Attempting to delete user with ID:', userId); // Debugging
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios
        .delete(`http://localhost:5000/api/users/${userId}`)
        .then(() => {
          console.log('User deleted successfully'); // Debugging
          setUsers(users.filter((user) => user._id !== userId)); // Remove the deleted user from the state
        })
        .catch((error) => {
          console.error('Error deleting user:', error);
          if (error.response) {
            console.error('Backend responded with:', error.response.data); // Debugging
          }
        });
    }
  };

  // Open modal for editing family members
  const handleEdit = (user) => {
    setSelectedUser(user);
    setFamilyMembers(user.familyMembers || []);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setFamilyMembers([]);
  };

  // Add a new family member
  const addFamilyMember = () => {
    setFamilyMembers([...familyMembers, { name: '', dob: '', relationship: '' }]);
  };

  // Update family member details
  const updateFamilyMember = (index, field, value) => {
    const updatedMembers = [...familyMembers];
    updatedMembers[index][field] = value;
    setFamilyMembers(updatedMembers);
  };

  // Save family members
  const saveFamilyMembers = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/users/${selectedUser._id}/family-members`,
        { familyMembers }
      );
      setUsers(users.map((user) => (user._id === selectedUser._id ? response.data : user)));
      closeModal();
    } catch (error) {
      console.error('Error updating family members:', error);
    }
  };

  // Filter users based on the search term
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (user.firstname && user.firstname.toLowerCase().startsWith(searchLower)) ||
      (user.lastname && user.lastname.toLowerCase().startsWith(searchLower)) ||
      (user.email && user.email.toLowerCase().startsWith(searchLower)) ||
      (user.address && user.address.toLowerCase().startsWith(searchLower))
    );
  });

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Admin User Management</h2>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by firstname, lastname, email, or address..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* List all users */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-sm text-gray-600">Firstname</th>
              <th className="py-3 px-6 text-sm text-gray-600">Lastname</th>
              <th className="py-3 px-6 text-sm text-gray-600">Email</th>
              <th className="py-3 px-6 text-sm text-gray-600">Date of Birth</th>
              <th className="py-3 px-6 text-sm text-gray-600">Address</th>
              <th className="py-3 px-6 text-sm text-gray-600">Family Members</th>
              <th className="py-3 px-6 text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td className="py-3 px-6 text-sm">{user.firstname || 'N/A'}</td>
                  <td className="py-3 px-6 text-sm">{user.lastname || 'N/A'}</td>
                  <td className="py-3 px-6 text-sm">{user.email || 'N/A'}</td>
                  <td className="py-3 px-6 text-sm">
                    {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="py-3 px-6 text-sm">{user.address || 'N/A'}</td>
                  <td className="py-3 px-6 text-sm">
                    {user.familyMembers && Array.isArray(user.familyMembers) ? (
                      user.familyMembers.map((member, index) => (
                        <div key={index}>
                          <p><strong>Name:</strong> {member.name || 'N/A'}</p>
                          <p><strong>DOB:</strong> {member.dob ? new Date(member.dob).toLocaleDateString() : 'N/A'}</p>
                          <p><strong>Relationship:</strong> {member.relationship || 'N/A'}</p>
                        </div>
                      ))
                    ) : (
                      <p>No family members</p>
                    )}
                  </td>
                  <td className="py-3 px-6 text-sm">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="py-6 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Editing Family Members */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/2">
            <h3 className="text-xl font-semibold mb-4">Edit Family Members for {selectedUser.firstname}</h3>
            {familyMembers.map((member, index) => (
              <div key={index} className="mb-4">
                <input
                  type="text"
                  placeholder="Name"
                  value={member.name}
                  onChange={(e) => updateFamilyMember(index, 'name', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={member.dob}
                  onChange={(e) => updateFamilyMember(index, 'dob', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
                <input
                  type="text"
                  placeholder="Relationship"
                  value={member.relationship}
                  onChange={(e) => updateFamilyMember(index, 'relationship', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mb-2"
                />
              </div>
            ))}
            <button
              onClick={addFamilyMember}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Add Family Member
            </button>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={saveFamilyMembers}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;