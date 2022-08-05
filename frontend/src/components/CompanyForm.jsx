import React, { useState } from "react";
import { fetchCreateCompany } from "../services/company";

const CompanyForm = ({ setCompanies, companies }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const renderInput = (name, label, type = "text") => {
    return (
      <div className="col-md-6">
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

  const createCompany = async () => {
    const company = await fetchCreateCompany(formData);
    setCompanies([company, ...companies]);
    setFormData({
      name: "",
      email: "",
      address: "",
      phone: "",
    });
  };

  return (
    <div className="row">
      {renderInput("name", "Name")}
      {renderInput("email", "Email")}
      {renderInput("address", "Address")}
      {renderInput("phone", "Phone", "number")}
      <button type="button" className="btn btn-primary" onClick={createCompany}>
        Create Company
      </button>
    </div>
  );
};

export default CompanyForm;
