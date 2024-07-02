import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8000/api/a1/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login Response:", res.data);

      if (res.data.Status) {
        const { token, isAdmin } = res.data;
        localStorage.setItem("token", token);

        console.log("isAdmin:", isAdmin);

        if (isAdmin === 1) {
          navigate("/dashboard");
          setTimeout(
            () => toast.success("Selamat datang di halaman admin"),
            500
          );
        } else {
          navigate("/home");
          setTimeout(
            () => toast.success("Selamat datang di website kami"),
            500
          ); 
        }
      } else {
        setError(
          res.data.Message ||
            "Login failed. Please check your email and password."
        );
      }
    } catch (error) {
      console.error("Error", error);
      setError("An error occurred during login. Please try again later.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="row mt-5 container mx-auto">
        <form
          className="form-control border-dark py-4 px-3 rounded"
          onSubmit={handleSubmit}
          style={{ width: "50vw" }}
        >
          <div className="mb-3 fs-3 fw-bold">Login</div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label mt-4 text-left d-flex mx-1 fw-bold"
            >
              Email
            </label>
            <input
              type="email"
              className="form-control"
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
              className="form-control"
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row d-flex justify-content-center gap-md-3">
            <button
              type="submit"
              className="col-md-5 btn btn-primary mt-4 fw-bold p-2"
            >
              Submit
            </button>
            <Link
              to="/register"
              className="col-md-6 btn btn-outline-dark mt-4 fw-bold p-2"
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
