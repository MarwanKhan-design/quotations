import React, { useEffect, useState } from "react";
import { fetchCreateQuotations } from "../services/quotations";
import { months } from "../utilities/months";
import lodash from "lodash";

const QuotationsForm = ({ setQuotations, quotations, companies }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    companies: [],
  });

  const renderInput = (name, label, type = "text") => {
    return Input(type, name, label, formData, setFormData);
  };

  const onCheck = (value, name) => {
    let data = formData;

    const hasValue = data[name].find((d) => d.company === value);

    if (hasValue === undefined) {
      data[name] = [...data[name], { company: value, bids: [] }];
    } else {
      data[name].filter((d) => console.log(d.company));
    }
    setFormData(data);
  };

  const renderCheckbox = (name, label, data) => {
    return (
      <>
        {data &&
          data.map((d) => (
            <div className="form-check" key={d._id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={d._id}
                checked={formData[name].find((d) => d.company === d._id)}
                onClick={(e) => onCheck(d._id, name)}
              />
              <label className="form-check-label" htmlFor={d._id}>
                {d.name}
              </label>
            </div>
          ))}
      </>
    );
  };

  const renderSelectDate = (name, label) => {
    return (
      <SelectDate
        name={name}
        label={label}
        formData={formData}
        setFormData={setFormData}
      />
    );
  };

  const createQuotation = async () => {
    const quotation = await fetchCreateQuotations(formData);
    setQuotations([...quotations, quotation]);
  };
  return (
    <>
      <div className="row">
        {renderInput("name", "Name")}
        {renderInput("qType", "Quotation Type")}
        {renderInput("refNo", "Ref Number")}
        {renderInput("from", "From")}
        {renderInput("demandNumber", "Demand Number")}
      </div>
      <div className="row">
        <div className="col-md-4">
          {renderCheckbox("companies", "Companies", companies)}
        </div>
      </div>
      {renderSelectDate("lastDate", "Last Date")}
      {renderSelectDate("demandDate", "Demand Date")}
      <div className="row mt-3">
        <div className="col-md-12">
          <button
            type="button"
            className="btn btn-primary"
            onClick={createQuotation}
          >
            Create Quotation
          </button>
        </div>
      </div>
    </>
  );
};

export default QuotationsForm;

const SelectDate = ({ name, label, formData, setFormData }) => {
  const [date, setDate] = useState({
    day: 1,
    month: { ...months[0] },
    year: new Date().getFullYear(),
  });

  const editDate = (e) => {
    const month = months.findIndex((m) => m.name === e.target.value);
    setDate({ ...date, month: { ...months[month] } });
    console.log(month, months[month]);
  };

  const renderSelect = (name, label, data) => {
    return (
      <div className="col-md-4">
        <label htmlFor={name} className="form-label">
          {label}
        </label>
        <select
          className="form-control"
          name={name}
          id={name}
          value={name === "date" ? date[name] : date[name].name}
          onChange={(e) =>
            name === "month"
              ? editDate(e)
              : setDate({ ...date, [name]: e.target.value })
          }
        >
          {data.map((d) => (
            <option
              value={d.name}
              key={name === "day" || name === "year" ? d : d.name}
            >
              {name === "day" || name === "year" ? d : d.name}
            </option>
          ))}
        </select>
      </div>
    );
  };

  useEffect(() => {
    setFormData({
      ...formData,
      [name]: `${date.month.name} ${date.day} ${date.year}`,
    });
  }, [date]);
  return (
    <div className="row">
      <center className="fs-5 mt-3 mb-3">{label}</center>
      {renderSelect("month", "Month", months)}
      {date.month.datesTill &&
        renderSelect("day", "Date", lodash.range(date.month.datesTill))}
      {renderSelect("year", "Year", [
        new Date().getFullYear(),
        new Date().getFullYear() + 1,
      ])}
    </div>
  );
};

function Input(type, name, label, formData, setFormData) {
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
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        />
        <label htmlFor="floatingLabel">{label}</label>
      </div>
    </div>
  );
}
