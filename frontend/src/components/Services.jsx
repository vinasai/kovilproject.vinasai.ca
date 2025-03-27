import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ServiceManagement = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // Fetch services from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then(response => {
        setServices(response.data);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
      });
  }, []);

  return (
    <section className="py-10 bg-gray-100">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold">Our Services</h2>
        <p className="text-gray-600 mt-4">
          Our temple provides a wide range of prayer services in the form of Archana/Aarthi, Abishekam, and Homas. 
          Archana can be performed on a daily basis both morning and evening.
          <br />
          <strong>Abishekam’s and Pirasatham’s bookings need to be pre-booked 1 day prior to the service date.</strong>
          Special services such as Homams and Weddings are only booked through phone. 
          <a href="#" className="text-blue-600"> More details available below</a>
        </p>
      </div>

      <div className="text-center bg-yellow-400 text-black py-2 text-xl font-bold mb-8">
        Services can be booked and paid online
      </div>

      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map(service => (
          <div key={service._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {service.imageUrl && (
              <img 
                src={`http://localhost:5000${service.imageUrl}`} 
                alt={service.name} 
                className="w-full h-70 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
              <p className="text-gray-800 font-bold mt-2">${service.amount}</p>
              <button 
                className="w-full p-2 rounded bg-[#9B3A04] hover:bg-[#A0522D] text-white font-bold"
                onClick={() => navigate(`/servicedetails/${service._id}`)}
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceManagement;
