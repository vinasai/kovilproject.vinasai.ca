import { useState } from "react";
import axios from "axios";

const DonateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const response = await axios.post("http://localhost:5000/api/donate", formData);
      setSuccess("Thank you for your generous donation!");
      setFormData({ name: "", email: "", amount: "", message: "" });
    } catch (error) {
      setSuccess("Failed to process your donation. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-4 text-center text-black pt-6">Donate Now</h2>
      <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-[#F7F4C5] to-[#FFFF] text-black rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Donation Amount</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Message (Optional)</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 rounded bg-[#9B3A04] hover:bg-[#A0522D] text-white font-bold"
          >
            {loading ? "Processing..." : "Donate Now"}
          </button>
        </form>
        {success && <p className="text-center mt-4 text-sm">{success}</p>}
      </div>
    </>
  );
};

export default DonateForm;
