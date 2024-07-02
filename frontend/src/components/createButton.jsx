import { Link } from "react-router-dom";

const createButton = () => {
  return (

      <div className="d-flex flex-row-reverse">
        <Link to="/create" className="btn border-black mb-5 mt-4 fw-bold p-2">
        + Add Product
      </Link>
      </div>
  );
};

export default createButton;
