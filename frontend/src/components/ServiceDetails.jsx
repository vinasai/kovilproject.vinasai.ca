import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ServiceDetails = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [count, setCount] = useState(1);
  const [selectedDates, setSelectedDates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/services/${id}`)
      .then((response) => {
        setService(response.data);
      })
      .catch((error) => {
        console.error("Error fetching service details:", error);
      });
  }, [id]);

  // Disable past dates
  const isTileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today; // Disable past dates
  };

  // Highlight selected dates
  const tileClassName = ({ date }) => {
    const formattedDate = date.toDateString();
    return selectedDates.includes(formattedDate) ? "bg-orange-500 text-white rounded-full" : "";
  };

  // Handle date selection and removal
  const handleDateSelect = (date) => {
    const formattedDate = date.toDateString();
    setSelectedDates((prev) =>
      prev.includes(formattedDate)
        ? prev.filter((d) => d !== formattedDate) // Remove date if already selected
        : [...prev, formattedDate] // Add date if not selected
    );
  };

  const calculateTotalAmount = () => {
    return service ? service.amount * count * selectedDates.length : 0;
  };

  const handlePayment = () => {
    navigate("/payment", {
      state: {
        serviceName: service.name,
        totalAmount: calculateTotalAmount(),
        count,
        selectedDates,
      },
    });
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {service ? (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          {/* Service Details */}
          <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-3xl font-bold mb-2">{service.name}</h2>
            <p className="text-gray-600 mb-2">{service.description}</p>
            <p className="text-xl font-semibold mb-4">${service.amount} per unit</p>

            {/* Count Section */}
            <div className="flex items-center gap-2 mb-4">
              <label className="font-semibold">Count:</label>
              <input
                type="number"
                value={count}
                min="1"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "") {
                    setCount(""); // Allow empty input while typing
                  } else {
                    const parsedValue = parseInt(value, 10);
                    if (!isNaN(parsedValue) && parsedValue >= 1) {
                      setCount(parsedValue);
                    }
                  }
                }}
                onBlur={() => {
                  if (count === "" || count < 1) {
                    setCount(1); // Reset to 1 if the user leaves it empty or below 1
                  }
                }}
                className="border p-2 rounded w-20"
              />
            </div>

            {/* Calendar Section */}
            <p className="font-semibold mb-2">Select Service Dates:</p>
            <Calendar
              onClickDay={handleDateSelect}
              tileDisabled={isTileDisabled} // Disable past dates
              tileClassName={tileClassName} // Highlight selected dates
              className="rounded-lg shadow w-full"
            />
          </div>

          {/* Cart Summary */}
          <div className="w-full md:w-1/3 bg-gray-100 p-6 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Cart Summary</h3>
            <p>
              <strong>Service:</strong> {service?.name}
            </p>
            <p>
              <strong>Amount per Unit:</strong> ${service?.amount}
            </p>
            <p>
              <strong>Count:</strong> {count}
            </p>

            <p className="mt-2 font-semibold">Selected Dates:</p>
            {selectedDates.length > 0 ? (
              <ul className="list-disc ml-5">
                {selectedDates.map((date, index) => (
                  <li key={index}>{date}</li>
                ))}
              </ul>
            ) : (
              <p>No dates selected</p>
            )}

            <p className="mt-4 font-semibold text-xl">
              Total Amount: ${calculateTotalAmount()}
            </p>
            <button
              className="w-full mt-6 p-2 rounded bg-[#9B3A04] hover:bg-[#A0522D] text-white font-bold"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading service details...</p>
      )}
    </div>
  );
};

export default ServiceDetails;
