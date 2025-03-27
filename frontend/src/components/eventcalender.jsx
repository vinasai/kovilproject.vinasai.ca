import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import axios from "axios";

const EventCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((response) => {
        console.log("Fetched Events:", response.data);

        const formattedEvents = response.data.map((event) => ({
          id: event._id,
          title: event.title,
          start: `${event.date}T${event.time}`, // Ensuring proper format
          description: event.description,
        }));

        console.log("Formatted Events for Calendar:", formattedEvents);

        // Adding a manual test event to see if the issue is with fetching
        const testEvent = {
          id: "test-event",
          title: "Test Event",
          start: "2024-03-08T14:00",
          description: "This is a test event.",
        };

        setEvents([...formattedEvents, testEvent]); // Add test event manually
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      });
  }, []);

  return (
    <div>
      <h2>Event Calendar</h2>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={(eventInfo) => (
          <div>
          
            <strong>{eventInfo.event.title}</strong>
            <p style={{ fontSize: "13px" }}>{eventInfo.event.extendedProps.description}</p>
          </div>
        )}
      />
    </div>
  );
};

export default EventCalendar;
