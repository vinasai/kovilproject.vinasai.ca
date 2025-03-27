import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    description: '',
    time: '',
    days: '',
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentServiceId, setCurrentServiceId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData(prevState => ({
      ...prevState,
      image: file,
    }));
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isNaN(formData.amount) || formData.amount === '') {
      alert('Amount should be a number.');
      return;
    }

    const form = new FormData();
    form.append('amount', formData.amount);
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('time', formData.time);
    form.append('days', formData.days.join(', '));
    if (formData.image) {
      form.append('image', formData.image);
    }

    const url = isEditing
      ? `http://localhost:5000/api/services/${currentServiceId}`
      : 'http://localhost:5000/api/services';
    const method = isEditing ? axios.put : axios.post;
    method(url, form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(() => {
      axios.get('http://localhost:5000/api/services')
        .then(response => {
          setServices(response.data);
          resetForm();
        });
    }).catch(error => {
      console.error('Error saving service:', error);
    });
  };

  const deleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      axios.delete(`http://localhost:5000/api/services/${serviceId}`)
        .then(() => {
          setServices(services.filter(service => service._id !== serviceId));
        })
        .catch(error => {
          console.error('Error deleting service:', error);
        });
    }
  };

  const handleEdit = (service) => {
    setFormData({
      amount: service.amount,
      name: service.name,
      description: service.description,
      time: service.time,
      days: service.days.join(', '),
      image: null,
    });
    setPreview(service.imageUrl);
    setIsEditing(true);
    setCurrentServiceId(service._id);
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      name: '',
      description: '',
      time: '',
      days: '',
      image: null,
    });
    setPreview(null);
    setIsEditing(false);
    setCurrentServiceId(null);
  };

  const handleDaysChange = (e) => {
    const { options } = e.target;
    const selectedDays = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedDays.push(options[i].value);
      }
    }
    setFormData(prevState => ({
      ...prevState,
      days: selectedDays,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">Service Management</h2>

      {/* Form to create or edit a service */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-medium mb-4 text-gray-600">{isEditing ? 'Edit Service' : 'Create New Service'}</h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Amount:</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-600">Time:</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Time</option>
                <option value="09:00">09:00 AM</option>
                <option value="09:30">09:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="12:30">12:30 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">Days:</label>
              <select
                name="days"
                value={formData.days}
                onChange={handleDaysChange}
                multiple
                className="w-full p-3 mt-1 border border-gray-300 rounded-md"
                required
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md"
            />
            {preview && <img src={preview} alt="Preview" className="mt-4 w-32 h-32 object-cover" />}
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600"
            >
              {isEditing ? 'Update Service' : 'Create Service'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-6 py-3 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* List all services */}
      <div className="overflow-x-auto bg-white shadow-lg rounded-lg p-6">
        <table className="w-full table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-sm text-gray-600">Name</th>
              <th className="py-3 px-6 text-sm text-gray-600">Description</th>
              <th className="py-3 px-6 text-sm text-gray-600">Amount</th>
              <th className="py-3 px-6 text-sm text-gray-600">Time</th>
              <th className="py-3 px-6 text-sm text-gray-600">Days</th>
              <th className="py-3 px-6 text-sm text-gray-600">Image</th>
              <th className="py-3 px-6 text-sm text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service._id}>
                <td className="py-3 px-6 text-sm">{service.name}</td>
                <td className="py-3 px-6 text-sm">{service.description}</td>
                <td className="py-3 px-6 text-sm">{service.amount}</td>
                <td className="py-3 px-6 text-sm">{service.time}</td>
                <td className="py-3 px-6 text-sm">{service.days.join(', ')}</td>
                <td className="py-3 px-6 text-sm">
                  {service.imageUrl && (
                    <img src={`http://localhost:5000${service.imageUrl}`} alt={service.name} className="w-16 h-16 object-cover" />
                  )}
                </td>
                <td className="py-3 px-6 text-sm">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-500 hover:text-blue-600 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteService(service._id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceManagement;
