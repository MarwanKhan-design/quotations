import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAddProduct } from "../services/quotations";

const QuotationAddProduct = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ name: "", unit: "", quantity: 0 });

  const navigate = useNavigate();

  let { id } = useParams();

  const renderInput = (name, label, type = "text") => {
    return (
      <div className="col-md-3">
        <div className="form-floating mb-3">
          <input
            type={type}
            className="form-control"
            name={name}
            id={name}
            placeholder={label}
            value={formData[name]}
            onChange={(e) =>
              setFormData({ ...formData, [name]: e.target.value })
            }
          />
          <label htmlFor="floatingLabel">{label}</label>
        </div>
      </div>
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    setProducts([...products, formData]);
    setFormData({ name: "", unit: "", quantity: 0 });
  };

  const addProducts = async (e) => {
    e.preventDefault();
    console.log(id);
    const quotation = await fetchAddProduct(products, id);
    return navigate("/quotations");
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {renderInput("name", "Name")}
        {renderInput("unit", "Unit")}
        {renderInput("quantity", "Quantity", "number")}
        <div className="col-md-3">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={addProduct}
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="row">{ProductTable(products)}</div>
      <div className="row">
        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={addProducts}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuotationAddProduct;
function ProductTable(products) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Unit</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.name}>
            <td scope="row">{product.name}</td>
            <td>{product.unit}</td>
            <td>{product.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
