import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Edit = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    product_name: "",
    product_image: null,
    product_description: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/a1/product/getproduct/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data.data.product_name);
        console.log(res.data.data.product_image);
        console.log(res.data.data.product_description);

        setFormData({
          product_name: res.data.data.product_name,
          product_image: res.data.data.product_image,
          product_description: res.data.data.product_description,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id, token]);

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setFormData({
      ...formData,
      [e.target.name]: file,
    });

    console.log(file);

    if (file) {
      let data = new FormData();
      data.append("product_image", file);
      // axios.post('/files', data)...
    }

    // Tampilkan gambar yang dipilih
    if (file) {
      let reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/a1/product/edit/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": ['application/json','multipart/form-data']
          "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("Edit Data successfully", res.data);
        toast.success("Data updated successfully!");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error:", error);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          Object.keys(error.response.data.errors).forEach((key) => {
            toast.error(
              `${key}: ${error.response.data.errors[key].join(", ")}`
            );
          });
        } else {
          toast.error("Error updating data. Please try again.");
        }
      });
  };

  const [previewImage, setPreviewImage] = useState(null);

  return (
    <>
      <ToastContainer />
      <div className="row container mt-2 container-custom">
        <form
          className="form-control border-dark py-4 px-3 rounded mt-5"
          onSubmit={handleSubmit}
          style={{ width: "50vw" }}
        >
          <div className="mb-3 fs-3 fw-bold">Edit Data Product</div>
          <div className="mb-3">
            <label
              htmlFor="product_name"
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
              htmlFor="product_image"
              className="form-label mt-4 text-left d-flex mx-1 fw-bold"
            >
              Product Image
            </label>
            {previewImage && (
              <img
                src={previewImage}
                alt="Product Preview"
                style={{ width: "400px", height: "auto", margin: "50px" }}
              />
            )}
            <input
              type="file"
              className="form-control"
              id="product_image"
              name="product_image"
              onChange={handleChangeImage}
            ></input>
          </div>

          <div className="mb-3">
            <label
              htmlFor="product_description"
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

export default Edit;
