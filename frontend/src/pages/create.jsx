import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const CreateData = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    product_name: "",
    product_image: null,
    product_description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "product_image") {
      setFormData({
        ...formData,
        product_image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/');
      return;
    }

    const data = new FormData();
    data.append("product_name", formData.product_name);
    data.append("product_image", formData.product_image);
    data.append("product_description", formData.product_description);

    axios.post("http://localhost:8000/api/a1/product/addproduct", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Create Data Success:", res.data);
        toast.success("Data created successfully!");
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error creating data. Please try again.");
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="row container mt-2 container-custom">
        <form
          className="form-control border-dark py-4 px-3 rounded mt-5"
          onSubmit={handleSubmit}
          style={{ width: "50vw" }}
        >
          <div className="mb-3 fs-3 fw-bold">Create New Product</div>
          <div className="mb-3">
            <label
              htmlFor="No_KTP"
              className="form-label mt-4 text-left d-flex mx-1 fw-bold"
            >
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="product_name"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="Name"
              className="form-label mt-4 text-left d-flex mx-1 fw-bold"
            >
              Product Image
            </label>
            <input
              type="file"
              className="form-control"
              id="product_image"
              name="product_image"
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="Date_of_birth"
              className="form-label mt-4 text-left d-flex mx-1 fw-bold"
            >
              Product Description
            </label>
            <input
              type="text"
              className="form-control"
              id="product_description"
              name="product_description"
              value={formData.product_description}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn border-black col-md-8 mt-4 fw-bold p-2"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateData;
