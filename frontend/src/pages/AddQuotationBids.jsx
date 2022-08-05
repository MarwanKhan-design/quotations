import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchAddBids, fetchGetQuotation } from "../services/quotations";

const AddQuotationBids = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();

  const [quotation, setQuotation] = useState({});
  const [formDataArray, setFormDataArray] = useState([]);

  const getQuotation = async () => {
    const quotation = await fetchGetQuotation(id);
    setQuotation(quotation);
  };
  useEffect(() => {
    getQuotation();
  }, []);

  const companySelectChange = (e) => {
    let d = [];
    quotation.products.forEach((product) => {
      d = [...d, { company: e.target.value, product: product.name, price: 0 }];
    });
    setFormDataArray(d);
  };

  const renderSelectForCompanies = (
    name,
    label,
    data = quotation.companies
  ) => {
    return (
      <div className="mb-3">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select
          className="form-control"
          name={name}
          id={name}
          onChange={companySelectChange}
        >
          <option value="">Select a {label}</option>
          {data &&
            data.map((d) => (
              <option value={d.company._id} key={d.company._id}>
                {d.company.name}
              </option>
            ))}
        </select>
      </div>
    );
  };

  const changePrice = (e, i) => {
    const d = formDataArray;
    d[i].price = e.target.value;
    setFormDataArray(d);
  };

  const addBids = async () => {
    const bids = await fetchAddBids(formDataArray, id);
    return navigate("/quotations");
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          {renderSelectForCompanies("company", "Company")}

          {formDataArray.length !== 0 && (
            <>
              <div className="card border-primary">
                <div className="card-body">
                  <h4 className="card-title">Prices</h4>

                  {formDataArray.map((formData, i) => (
                    <>
                      <div className="form-floating mb-3">
                        <input
                          type="number"
                          className="form-control"
                          name="name"
                          id={formData.product}
                          placeholder={formData.product}
                          onChange={(e) => changePrice(e, i)}
                        />
                        <label htmlFor={formData.product}>
                          {formData.product}
                        </label>
                      </div>
                    </>
                  ))}
                  <button
                    type="button"
                    class="btn btn-primary"
                    onClick={addBids}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddQuotationBids;
