import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // Set loading to true

    // Validate inputs
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      setLoading(false); // Reset loading state
      return;
    }

    try {
      // Send login request
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Save token, role, and userId to localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userRole", response.data.role);
      localStorage.setItem("userId", response.data.userId);

      // Redirect based on role
      if (response.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#ffe6e6",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          borderRadius: "10px",
          background: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          textAlign: "center",
        }}
      >
        <h2>Login</h2>
        {error && (
          <div
            style={{
              color: "red",
              backgroundColor: "#ffe6e6",
              padding: "10px",
              borderRadius: "5px",
              marginBottom: "15px",
            }}
          >
            {error}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            style={{
              padding: "10px",
              backgroundColor: loading ? "#ccc" : "red", // Change button color when loading
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: loading ? "not-allowed" : "pointer", // Change cursor when loading
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p style={{ marginTop: "15px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")} // Redirect to the signup page
            style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;