import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import {Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import Product from "./pages/product";
import Dashboard from "./pages/dashboard";


const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/home" && location.pathname !== "/product" && location.pathname !== "/dashboard";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Tambahkan rute lainnya sesuai kebutuhan */}
      </Routes>
    </>
  );
};

export default App;
