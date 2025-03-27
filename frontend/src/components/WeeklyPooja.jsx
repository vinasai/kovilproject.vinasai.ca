import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, ChevronDown } from 'lucide-react';

const WeeklyPooja = () => {
  const [events, setEvents] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/events/upcoming-events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error('Error fetching events:', err));
  }, []);

  return (
    <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-8 border border-gray-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white bg-black p-4 border rounded-lg">Upcoming Events</h2>
        <Link to="/event">
          <CalendarDays className="text-red-500 w-10 h-10" />
        </Link>
      </div>

      {/* Event List */}
      <div className="space-y-3">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={event._id} className="border rounded-lg overflow-hidden">
              <button
                className="flex justify-between items-center w-full p-4 bg-gradient-to-r from-red-100 to-orange-100 text-gray-800 font-semibold hover:bg-orange-200 transition"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span>{event.title}</span>
                <ChevronDown className={`w-6 h-6 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white border-t transition-all duration-300">
                  <p className="text-gray-700">{event.description}</p>
                  <p className="text-gray-600">
                    <strong>Date:</strong> {new Date(event.date).toDateString()}
                  </p>
                  {event.time && (
                    <p className="text-gray-600">
                      <strong>Time:</strong> {event.time}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No upcoming events at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default WeeklyPooja;
