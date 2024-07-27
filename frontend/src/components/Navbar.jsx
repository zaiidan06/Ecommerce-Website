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
import LightMode from "../assets/light-mode.png";
import NightMode from "../assets/night-mode.png";
import Product from "../pages/product";

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

  
  function Mode() {
    document.body.classList.toggle("dark-theme");
    var img = document.getElementById("img-theme");
    if (document.body.classList.contains("dark-theme")) {
      img.src = NightMode;
    } else {
      img.src = LightMode;
    }
  }

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand mt-4  nav-custom">
        <a href="https://github.com/zaiidan06">
          <img
            src={reactLogo}
            className="logo react mx-3"
            alt="React logo"
          ></img>
        </a>
        <div
          className="navbar-nav mr-auto p-2 mx-5 fw-semibold fs-5 gap-md-4"
          style={{
            width: "50vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <li className="nav-item">
            {isLoggedIn ? (
              <Link
                to={"/dashboard"}
                className="nav-link shadow-none secondary-color"
              >
                Dashboard
              </Link>
            ) : (
              <button
                onClick={back}
                className="nav-link shadow-none secondary-color"
              >
                Dashboard
              </button>
            )}
          </li>
          <li className="nav-item shadow-none">
            {isLoggedIn ? (
              <Link
                to={"/home"}
                className="nav-link shadow-none secondary-color"
              >
                Home
              </Link>
            ) : (
              <button
                onClick={back}
                className="nav-link shadow-none secondary-color"
              >
                Home
              </button>
            )}
          </li>
          <li className="nav-item shadow-none">
            {isLoggedIn ? (
              <Link
                to={"/product"}
                className="nav-link shadow-none secondary-color"
              >
                Product
              </Link>
            ) : (
              <button
                onClick={back}
                className="nav-link shadow-none secondary-color"
              >
                Product
              </button>
            )}
          </li>

          <li className="nav-item shadow-none">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="nav-link shadow-none btn btn-link secondary-color"
              >
                Logout
              </button>
            ) : (
              <Link to={"/"} className="nav-link shadow-none secondary-color">
                Login
              </Link>
            )}
          </li>
        </div>
        <img
          className="light-mode"
          id="img-theme"
          src={LightMode}
          alt="Mode"
          style={{ width: "45px" }}
          onClick={Mode}
        />
      </nav>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/product/*" element={<Product />} />
      </Routes>
    </>
  );
};

export default Navbar;
