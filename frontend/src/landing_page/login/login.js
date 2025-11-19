// frontend/src/landing_page/login/Login.js
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3002/api/auth/login",
        form
      );

      // Save token and redirect to dashboard
      localStorage.setItem("token", res.data.token);
      setSuccess("Login successful! Redirecting to dashboard...");

      setTimeout(() => {
        window.location.href = "http://localhost:3001"; // dashboard app
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.msg || "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="signup-wrapper d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="signup-card shadow p-4 rounded"
        style={{ width: "450px", background: "#ffffff" }}
      >
        <h2 className="text-center mb-4 fw-bold">Login</h2>

        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control py-2"
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              className="form-control py-2"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-primary fw-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
