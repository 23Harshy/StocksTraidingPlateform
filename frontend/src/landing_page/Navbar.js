import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
      role="navigation"
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img src="/Media/logo.svg" style={{ width: "25%" }} alt="Logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <div className="d-flex">
            <ul className="navbar-nav mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/signup">
                  Signup
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/login">
                  login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/about">
                  About
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/product">
                  Product
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/pricing">
                  Pricing
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/support">
                  Support
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
