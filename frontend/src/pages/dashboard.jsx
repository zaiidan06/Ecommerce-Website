import { useState, useEffect } from "react";
import axios from "axios";
import CreateButton from "../components/createButton";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setData(res.data.data);
        console.log(res.data.data.product_image);
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
      setTimeout(() => toast.success("Delete Successfully"), 300);
    } catch (error) {
      console.error("Error:", error);
      setTimeout(() => toast.error("Delete Failed"), 300);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="container mt-6">
      <h1 className="mt-5 mb-4 text-start">Dashboard</h1>
      <hr />
        <CreateButton />
        <div className="table-responsive">
          {data.length > 0 ? (
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
                    <td className="text-center align-middle">{item.id}</td>
                    <td className="text-center align-middle">
                      {item.product_name}
                    </td>
                    <td className="text-center align-middle">
                      <img
                        alt={item.product_image}
                        // type ="multipart/form-data"
                        src={`http://localhost:8000${item.product_image}`}
                        // src={item.product_image}
                        style={{
                          width: "200px",
                        }}
                      >

                      </img>
                    </td>
                    <td className="text-center align-middle">
                      {item.product_description}
                    </td>
                    <td className="text-center align-middle">
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
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
