import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Routes, Route, Link } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import reactLogo from "../assets/react.svg";
import Login from "../pages/login";
import Edit from "../pages/edit";
import Create from "../pages/create";
import Home from "../pages/home";
import Product from "./product";
import LightMode from "../assets/light-mode.png";
import NightMode from "../assets/night-mode.png";
import Dashboard from "./dashboard";

const CustomerBuy = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/a1/product/transaction", {
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

  const handleUpdate = async (id) => {
    try {
      await axios.put(
        `http://localhost:8000/api/a1/product/uptstatus/${id}`,
        { status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setData(
        data.map((item) =>
          item.id === id ? { ...item, status: "completed" } : item
        )
      );
      toast.success("Completed");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Rejected");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/a1/product/deletestatus/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setData(data.filter((item) => item.id !== id));
      toast.success("Data Transaction berhasil dihapus");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Gagal menghapus data");
    }
  };

  const handleChangeStatus = async () => {
    if (selectedTransaction) {
      try {
        await axios.post(
          `http://localhost:8000/api/a1/product/changestatus/${selectedTransaction.id}`,
          { status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        setData(
          data.map((item) =>
            item.id === selectedTransaction.id
              ? { ...item, status }
              : item
          )
        );
        toast.success("Status berhasil diubah");
        setShowModal(false);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Gagal mengubah status");
      }
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

  const handleInfoClick = (transaction) => {
    setSelectedTransaction(transaction);
    setStatus(transaction.status); // Set status based on the selected transaction
    setShowModal(true);
  };

  return (
    <>
      <ToastContainer />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Transaction Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleChangeStatus}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

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
            <li className="nav-item shadow-none">
              <span className="material-symbols-outlined">logout</span>
              {token ? (
                <a
                  onClick={handleLogout}
                  className="nav-link shadow-none secondary-color"
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </a>
              ) : (
                <Link to={"/"} className="nav-link shadow-none secondary-color">
                  Login
                </Link>
              )}
            </li>
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

          <h3 className="fw-bold mt-5" style={{ marginRight: "-200px" }}>
            Data Transaction ✨
          </h3>
          <div className="content-2 mt-5">
            <div className="table-responsive col-xl-11 rounded">
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
                    <th className="text-center align-middle px-5">Person</th>
                    <th className="text-center align-middle px-5">Status</th>
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
                        {item.user_name}
                      </td>
                      <td className="text-center align-middle fw-normal">
                        {item.status}
                      </td>
                      <td className="text-center align-middle fw-normal">
                        {item.status !== "completed" ? (
                          <>
                            <button
                              onClick={() => handleUpdate(item.id)}
                              className="col-md-7 btn btn-success mx-1"
                            >
                              Completed
                            </button>
                            <button
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Anda yakin ingin menghapus ini?"
                                  )
                                ) {
                                  handleDelete(item.id);
                                }
                              }}
                              className="col-md-4 btn btn-danger"
                            >
                              Delete
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleInfoClick(item)}
                            className="col-md-7 btn btn-info mx-1"
                          >
                            Info
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/customerbuy/*" element={<CustomerBuy />} />
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

export default CustomerBuy;
