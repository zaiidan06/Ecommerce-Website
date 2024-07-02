import { Routes, Route, Link, useNavigate } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import Dashboard from "../pages/dashboard";
import Login from "../pages/login";
import Register from "../pages/register";
import Edit from "../pages/edit";
import Create from "../pages/create";
import Home from "../pages/home";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("token");
  const [isAdmin, setIsAdmin] = useState(false);

  // const fetchUserData = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/api/a1/auth/user", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     const data = await response.json();
  //     // setUser(data);
  //     setIsAdmin(data.isAdmin === 1);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };
  // fetchUserData();

  const FetchData = async () => {
    // const token = localStorage.setItem("token");
    await axios
      .get("http://localhost:8000/api/a1/auth/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setIsAdmin(res.isAdmin === 1);
        // console.log('token = ', token)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  FetchData();

  const navigate = useNavigate();

  const back = () => {
    window.alert("Silahkan Login terlebih dahulu 🙏");
    navigate("/");
  };
  const adminAlert = () => {
    if (!isAdmin) {
      window.alert("Anda bukan admin!!");
    } else {
      window.alert("Selamat datang di halaman Admin");
    }
  };

  useEffect(() => {
    // Redirect to login if not logged in and trying to access protected routes
    // if (!isLoggedIn && window.location.pathname !== "/" ) {
    //   navigate("/");
    // }
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    // Menghapus status login dari localStorage
    localStorage.removeItem("token");
    toast.success("Logout Successfully");

    // Mengarahkan pengguna ke halaman login setelah logout
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top justify-content-between nav-height mb-5">
        <a href="#">
          <img src={reactLogo} className="logo react mx-3" alt="React logo" />
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
            {isLoggedIn && isAdmin ? (
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            ) : (
              <button onClick={adminAlert} className="nav-link">
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
};
export default Navbar;
