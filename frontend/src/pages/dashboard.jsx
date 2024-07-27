import { useState, useEffect } from "react";
import axios from "axios";
import CreateButton from "../components/createButton";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import reactLogo from "../assets/react.svg";
import Login from "../pages/login";
import Edit from "../pages/edit";
import Create from "../pages/create";
import Home from "../pages/home";
import Product from "./product";
import LightMode from "../assets/light-mode.png";
import NightMode from "../assets/night-mode.png";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    axios
      .get("http://localhost:8000/api/a1/product/allproduct", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [navigate, token]);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/a1/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(data.filter((item) => item.id !== id));
      toast.success("Data berhasil dihapus");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal menghapus data");
    }
  };

  const back = () => {
    window.alert("Silahkan Login terlebih dahulu 🙏");
    navigate("/");
  };

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
      <div className="nav-container-custom">
        <nav className="mt-2">
          <a href="https://github.com/zaiidan06">
            <img
              src={reactLogo}
              className="logo react"
              alt="React logo"
              style={{ marginLeft: "25px", height: "6em" }}
            ></img>
          </a>
          <div className="menu mt-3" style={{ marginLeft: "150px" }}>
            <h2>Dashboard</h2>
            <p>Manage dashboard faster and efisienly</p>
          </div>
          <ul>
            <li>
              <img
                className="light-mode"
                id="img-theme"
                src={LightMode}
                alt="Mode"
                style={{ width: "45px", margin: "-20px 120px 0 0" }}
                onClick={Mode}
              />
            </li>
          </ul>
        </nav>
        <div className="sidebar">
          <ul>
            {/* {{-- ALL OF THIS ICON IS FROM GOOGLE FONTS --}} */}
            <li className="nav-item">
              <span className="material-symbols-outlined">Dashboard</span>
              {token ? (
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

            {/* {{-- ALL OF THIS ICON IS FROM GOOGLE FONTS --}} */}
            <li className="nav-item shadow-none">
              <span className="material-symbols-outlined">home</span>
              {token ? (
                <Link
                  to={"/home"}
                  className="nav-link shadow-none secondary-color"
                >
                  Landing Page
                </Link>
              ) : (
                <button
                  onClick={back}
                  className="nav-link shadow-none secondary-color"
                >
                  Landing Page
                </button>
              )}
            </li>

            {/* {{-- ALL OF THIS ICON IS FROM GOOGLE FONTS --}} */}
            <li className="nav-item shadow-none">
            <span className="material-symbols-outlined">keyboard</span>
              {token ? (
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
            {/* {{-- ALL OF THIS ICON IS FROM GOOGLE FONTS --}} */}
            <li className="nav-item shadow-none">
            <span className="material-symbols-outlined">logout</span>
              {token ? (
               <a
               onClick={handleLogout}
               className="nav-link shadow-none secondary-color"
               style={{ cursor: "pointer"}}
             >
               Logout
             </a>
              ) : (
                <Link to={"/"} className="nav-link shadow-none secondary-color">
                  Login
                </Link>
              )}
            </li>
           
            {/* {{-- ALL OF THIS ICON IS FROM GOOGLE FONTS --}} */}
            <li>
              <span className="material-symbols-outlined">settings</span>
              <a href="#">Settings</a>
            </li>

          </ul>
        </div>
        <div className="container">
          <div className="content-1">
            <div className="card-group">
              <div className="card-custom">
                <span id="iconDash-1" className="material-symbols-outlined">
                  <a href="">keyboard</a>
                </span>
                <h5 className="fw-bold">All Products</h5>
              </div>
              <div className="card-custom">
                <span id="iconDash-2" className="material-symbols-outlined">
                  <a href="">person</a>
                </span>
                <h5 className="fw-bold">Customer Login</h5>
              </div>
              <div className="card-custom">
                <span id="iconDash-3" className="material-symbols-outlined">
                  <a href="">chat</a>
                </span>
                <h5 className="fw-bold">Customer Order</h5>
              </div>
              <div className="card-custom">
                <span id="iconDash-4" className="material-symbols-outlined">
                  <a href="">shopping_cart</a>
                </span>
                <h5 className="fw-bold">Customer Buy</h5>
              </div>
            </div>
          </div>

          <CreateButton />
          <div className="content-2">
            <div className="table-responsive col-xl-11 rounded">
              {/* {data.length > 0 ? ( */}
              <table className="table table-bordered table-hover text-center">
                <thead className="table-primary">
                  <tr>
                    <th className="text-center align-middle px-5">ID</th>
                    <th className="text-center align-middle px-5">
                      Product Name
                    </th>
                    <th className="text-center align-middle px-5">
                      Product Image
                    </th>
                    <th className="text-center align-middle px-5">
                      Product Description
                    </th>
                    <th className="text-center align-middle px-5">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td className="text-center align-middle fw-normal">
                        {item.id}
                      </td>
                      <td className="text-center align-middle fw-normal">
                        {item.product_name}
                      </td>
                      <td className="text-center align-middle fw-normal">
                        <img
                          alt={item.product_image}
                          src={`http://localhost:8000/${item.product_image}`}
                          style={{ width: "200px" }}
                        />
                      </td>
                      <td className="text-center align-middle fw-normal">
                        {item.product_description}
                      </td>
                      <td className="text-center align-middle fw-normal">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="col-md-5 btn btn-warning mx-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            if (
                              window.confirm("Anda yakin ingin menghapus ini?")
                            ) {
                              handleDelete(item.id);
                            }
                          }}
                          className="col-md-6 btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* ) : (
            <p>Loading...</p>
          )} */}
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/home/*" element={<Home />} />
        <Route path="/product/*" element={<Product />} />
      </Routes>
    </>
  );
};

export default Dashboard;
