import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DonationManagementAdmin = () => {
  const [donations, setDonations] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: '',
    message: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentDonationId, setCurrentDonationId] = useState(null);

  // Fetch donations on component mount
  useEffect(() => {
    axios.get('http://localhost:5000/api/donations')
      .then(response => setDonations(response.data))
      .catch(error => console.error('Error fetching donations:', error));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

 



 
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center" >Donation Management</h2>

      {/* Donation Form */}
      {/* Donations Table */}
    
      <div className="overflow-x-auto shadow-md border-b border-gray-200 rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Name</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Email</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Amount</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Message</th>
             
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation._id} className="border-t border-gray-200">
                <td className="px-6 py-4 text-sm text-gray-900">{donation.name}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{donation.email}</td>
                <td className="px-6 py-4 text-sm text-gray-900">${donation.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{donation.message}</td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationManagementAdmin;
