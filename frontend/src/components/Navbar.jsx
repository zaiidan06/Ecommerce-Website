import { Routes, Route, Link, useNavigate } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Register from "../pages/register";
import Edit from "../pages/edit";
import Create from "../pages/create";
import Home from "../pages/home";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");

  const navigate = useNavigate();

  const back = () => {
    window.alert("Silahkan Login terlebih dahulu 🙏");
    navigate("/");
  };

  useEffect(() => {
    // Redirect to login if not logged in and trying to access protected routes
    // if (!isLoggedIn && window.location.pathname !== "/" ) {
    //   navigate("/");
    // }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setTimeout(() => toast.success("Logout Successfully"), 300);
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top justify-content-between nav-height mb-5">
        <a href="https://github.com/zaiidan06">
          <img src={reactLogo} className="logo react mx-3" alt="React logo">
          </img>
        </a>
        <div className="navbar-nav mr-auto p-2 mx-5 fw-semibold fs-5 gap-md-4">
          <li className="nav-item">
            {isLoggedIn ? (
              <Link to={"/dashboard"} className="nav-link">
                Dashboard
              </Link>
            ) : (
              <button onClick={back} className="nav-link">
                Dashboard
              </button>
            )}
          </li>
          <li className="nav-item">
            {isLoggedIn ? (
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            ) : (
              <button onClick={back} className="nav-link">
                Home
              </button>
            )}
          </li>

          <li className="nav-item">
            {isLoggedIn ? (
              <button onClick={handleLogout} className="nav-link btn btn-link">
                Logout
              </button>
            ) : (
              <Link to={"/"} className="nav-link">
                Login
              </Link>
            )}
          </li>
        </div>
      </nav>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/home/*" element={<Home />} />
      </Routes>
    </>
  );
};
export default Navbar;
