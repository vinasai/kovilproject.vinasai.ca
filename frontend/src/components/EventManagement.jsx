import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManagement = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => setEvents(response.data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEditing ? `http://localhost:5000/api/events/update/${currentEventId}` : 'http://localhost:5000/api/events/add';
    const method = isEditing ? axios.put : axios.post;

    method(url, formData)
      .then((response) => {
        if (isEditing) {
          setEvents(events.map(event => event._id === currentEventId ? response.data.event : event));
        } else {
          setEvents([...events, response.data.event]);
        }
        resetForm();
      })
      .catch(error => console.error('Error saving event:', error));
  };

  const handleEdit = (event) => {
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
    });
    setIsEditing(true);
    setCurrentEventId(event._id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      axios.delete(`http://localhost:5000/api/events/delete/${id}`)
        .then(() => {
          setEvents(events.filter(event => event._id !== id));
        })
        .catch(error => console.error('Error deleting event:', error));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      time: '',
    });
    setIsEditing(false);
    setCurrentEventId(null);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Event Management</h2>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <form onSubmit={handleSubmit}>
          <h4 className="text-xl font-medium text-center mb-6">{isEditing ? 'Edit Event' : 'Create Event'}</h4>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <input
              type="time"
              className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-6 py-2 bg-[#9B3A04] text-white rounded-lg hover:bg-[#A0522D] focus:outline-none focus:ring-2 focus:ring"
            >
              {isEditing ? 'Update Event' : 'Create Event'}
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
              onClick={resetForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <h4 className="text-2xl font-semibold mb-4">All Events</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Title</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Description</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Time</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event._id} className="border-b border-gray-200">
                <td className="py-2 px-4 text-sm text-gray-700">{event.title}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{event.description}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{event.date}</td>
                <td className="py-2 px-4 text-sm text-gray-700">{event.time}</td>
                <td className="py-2 px-4 text-sm">
                  <button
                    className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
                    onClick={() => handleEdit(event)}
                  >
                    Edit
                  </button>
                  <button
                    className="ml-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(event._id)}
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

export default EventManagement;
