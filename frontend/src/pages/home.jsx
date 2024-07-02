import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import Dashboard from "./dashboard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Banner from "../assets/coming-soon.png";
import Product1 from "../assets/keyboard-noir-n1-grey.png";

const Home = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is admin
    axios
      .get("http://localhost:8000/api/a1/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          // "Content-type": "multipart/form-data",
          // type: "formData",
        },
      })
      .then((res) => {
        setIsAdmin(res.data.data.isAdmin);
        console.log(res.data.data.isAdmin);
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("Anda bukan admin!!");
        navigate("/dashboard");
      });
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    setTimeout(() => toast.success("Logout Successfully"), 300);
  };

  const cekAdmin = () => {
    if (isAdmin === 1) {
      navigate("/dashboard");
    } else {
      window.alert("Anda bukan admin!!");
      navigate("/home");
    }
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
            <button onClick={cekAdmin} className="nav-link">
              Dashboard
            </button>
          </li>
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link btn btn-link">
              Logout
            </button>
          </li>
        </div>
      </nav>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
      </Routes>

      <div className="header"></div>
      <div className="container">
        <div className="content">
          <div className="categories">
            <div className="dummy">
              <h1 className="category mt-5 mb-4">TOP 3 BEST SELLER PRODUCT</h1>
              <hr />
            </div>
          </div>
          <div className="container row d-flex gap-md-5">
            <div id="product" className="col card">
              <div className="product-img">
                <img src={Product1} alt="" />
              </div>
              <div className="product-title text-start">
                <h5 className="fw-bold">KEYBOARD NOIR N1</h5>
              </div>
              <div className="product-description text-start">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nesciunt rem qui corrupti aliquam mollitia.
                </p>
                <div className="product-buy text-end mb-2 p-3">
                  <button className="btn btn-dark ">Buy</button>
                </div>
              </div>
            </div>
            <div id="product" className="col card">
              <div className="product-img">
                <img src={Product1} alt="" />
              </div>
              <div className="product-title text-start">
                <h5 className="fw-bold">KEYBOARD NOIR N1</h5>
              </div>
              <div className="product-description text-start">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nesciunt rem qui corrupti aliquam mollitia.
                </p>
                <div className="product-buy text-end mb-2 p-3">
                  <button className="btn btn-dark ">Buy</button>
                </div>
              </div>
            </div>
            <div id="product" className="col card">
              <div className="product-img">
                <img src={Product1} alt="" />
              </div>
              <div className="product-title text-start">
                <h5 className="fw-bold">KEYBOARD NOIR N1</h5>
              </div>
              <div className="product-description text-start">
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nesciunt rem qui corrupti aliquam mollitia.
                </p>
                <div className="product-buy text-end mb-2 p-3">
                  <button className="btn btn-dark ">Buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-content">
        <div className="coming-soon-banner">
          <img src={Banner} alt="banner.jpg" />
        </div>
      </div>
      <div className="footer-container bg-dark">
        <div className="row d-flex gap-md-5 p-5 mt-4">
          <div className="col-md-6">
            <h4 className="text-white text-start mb-3">About Company</h4>
            <p className="text-white text-start">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero
              velit et necessitatibus ducimus odio, vitae consectetur asperiores
              doloremque possimus non adipisci molestias mollitia quo omnis
              cupiditate ea facere ullam quisquam.
            </p>
            <ul
              id="mlmin-social-media"
              className="row d-flex justify-content-start text-start"
            >
              <li className="col">
                <a className="fs-5" href="#">Whatsapp</a>
              </li>
              <li className="col">
                <a className="fs-5" href="#">Instagram</a>
              </li>
              <li className="col">
                <a className="fs-5" href="#">Tiktok</a>
              </li>
              <li className="col">
                <a className="fs-5" href="#">Twitter</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4 className="text-white text-start mb-3">E-commerce Platform</h4>
            <ul id="mlmin-ecommerce" className="text-start">
              <li className="col">
                <a className="fs-5" href="#">
                  <img src="#" alt="Tiktok" /> @ztore_official
                </a>
              </li>
              <li className="col">
                <a className="fs-5" href="#">
                  <img src="#" alt="Shopee" /> @ztore_official
                </a>
              </li>
              <li className="col">
                <a className="fs-5" href="#">
                  <img src="#" alt="Tokopedia" /> @ztore_official
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-2">
            <h4 className="text-white text-start mb-3">Product & Layanan</h4>
            <ul id="mlmin-ecommerce" className="text-start">
              <li className="col">
                <a className="fs-5" href="#">Keyboard Mechanical</a>
              </li>
              <li className="col">
                <a className="fs-5" href="#">Switch & Keycaps</a>
              </li>
              <li className="col">
                <a className="fs-5" href="#">Keyboard Modding Services</a>
              </li>
            </ul>
          </div>
          <div className="col-md-12 mt-4">
            <h4 className="text-white text-start mb-3">Official Store</h4>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.817931756006!2d106.84907647475008!3d-6.155133993831971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5bd61d52c4d%3A0x9781500d4624c643!2sMediterania%20Boulevard%20Residences!5e0!3m2!1sid!2sid!4v1719580046140!5m2!1sid!2sid"
              width="1420"
              height="400"
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
