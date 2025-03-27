import { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    dob: "",
    address: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [familyMembers, setFamilyMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateFamilyMembers = () => {
    for (const member of familyMembers) {
      if (!member.name || !member.dob || !member.relationship) {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setError("Please enter a valid email address.");
        setLoading(false);
        return;
      }

    // Validate family members
    if (familyMembers.length > 0 && !validateFamilyMembers()) {
      setError("Please fill out all fields for family members.");
      setLoading(false);
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmpassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const payload = { ...formData, familyMembers }; // Combine data
      const response = await axios.post("http://localhost:5000/api/signup", payload);
      setSuccess("Thank you for creating an account!");
      setFormData({
        firstname: "",
        lastname: "",
        dob: "",
        address: "",
        email: "",
        password: "",
        confirmpassword: "",
      });
      setFamilyMembers([]);
    } catch (error) {
      setError("Failed to process your registration. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-4xl font-bold mb-4 text-center text-black pt-6">Sign Up</h2>
      <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-[#F7F4C5] to-[#FFFF] text-black rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">First Name</label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Name</label>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
            />
          </div>

          {/* Add Family Members */}
          <div
            className="flex items-center mt-2 cursor-pointer text-[#1E3A8A] hover:text-[#2563EB]"
            onClick={() =>
              setFamilyMembers([...familyMembers, { name: "", dob: "", relationship: "" }])
            }
          >
            <FaPlus className="mr-2" />
            <span className="font-medium">Add Family Members</span>
          </div>

          {familyMembers.map((member, index) => (
            <div
              key={index}
              className="mt-4 p-4 border border-[#8B4513] rounded bg-[#FFFF]"
            >
              <div className="mb-2">
                <label className="block text-sm font-medium">Family Member Name</label>
                <input
                  type="text"
                  value={member.name}
                  onChange={(e) => {
                    const updated = [...familyMembers];
                    updated[index].name = e.target.value;
                    setFamilyMembers(updated);
                  }}
                  required
                  className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">Date of Birth</label>
                <input
                  type="date"
                  value={member.dob}
                  onChange={(e) => {
                    const updated = [...familyMembers];
                    updated[index].dob = e.target.value;
                    setFamilyMembers(updated);
                  }}
                  required
                  className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>

              <div className="mb-2">
                <label className="block text-sm font-medium">
                  Specify the relationship with the family member
                </label>
                <input
                  type="text"
                  value={member.relationship}
                  onChange={(e) => {
                    const updated = [...familyMembers];
                    updated[index].relationship = e.target.value;
                    setFamilyMembers(updated);
                  }}
                  required
                  className="w-full p-2 rounded bg-[#FFFF] text-black border border-[#8B4513] focus:outline-none focus:ring-2 focus:ring-[#D2B48C]"
                />
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 rounded bg-[#1E3A8A] hover:bg-[#2563EB] text-white font-bold"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>
        </form>
        {success && <p className="text-center mt-4 text-sm text-green-600">{success}</p>}
        {error && <p className="text-center mt-4 text-sm text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default SignupForm;