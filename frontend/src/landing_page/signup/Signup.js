import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        "http://localhost:3002/api/auth/signup",
        form
      );

      // OPTIONAL: directly log in user after signup
      localStorage.setItem("token", res.data.token);
      setSuccess("Signup successful! Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "http://localhost:3001"; // dashboard app
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.msg || "Something went wrong. Please try again."
      );
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
        <h2 className="text-center mb-4 fw-bold">Create Account</h2>

        {error && <p className="text-danger text-center">{error}</p>}
        {success && <p className="text-success text-center">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control py-2"
              type="text"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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

          <button type="submit" className="btn btn-primary w-100 py-2">
            Sign up
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-primary fw-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
