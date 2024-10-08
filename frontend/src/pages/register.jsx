import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/a1/auth/register", formData, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((res) => {
        console.log("Registration Successful", res.data);
        // Redirect to login page after registration successful
        window.location.href = "/";
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  return (
    <>
      <div className="row container mt-4 container-custom">
      <form
          className="form-control border-dark py-4 px-5 mt-5"
          onSubmit={handleSubmit} // Menggunakan handleSubmit untuk menangani submit
          style={{ width: "380px", height: "480px", borderRadius: "30px" }}
        >
          <div className="mt-4 mb-3 fs-3 fw-bold">Register</div>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label mt-4 text-left d-flex mx-1 fw-bold"
            >
              Name
            </label>
            <input
              type="text"
              className="form-control input-custom shadow-none"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label mt-4 text-left d-flex mx-1 fw-bold"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control input-custom shadow-none"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label mt-4 text-left d-flex mx-1 fw-bold"
            >
              Password
            </label>
            <input
              className="form-control input-custom shadow-none"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row d-flex justify-content-center gap-md-4">
          <button
            type="submit"
            className="col-md-4 btn btn-outline-primary mt-4 fw-bold p-2 shadow-none"
          >
            Submit
          </button>
          <Link
            to={'/'}
            className="col-md-6 btn btn-outline-dark mt-4 fw-bold p-2 shadow-none"
          >
            Login
          </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
