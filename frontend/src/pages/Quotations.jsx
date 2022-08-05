import React, { useEffect, useState } from "react";
import QuotationsForm from "../components/QuotationsForm";
import QuotationsTable from "../components/QuotationsTable";
import { fetchGetCompanies } from "../services/company";
import { fetchGetQuotations } from "../services/quotations";

const Quotations = () => {
  const [quotations, setQuotations] = useState([]);
  const [companies, setCompanies] = useState();

  const getQuotations = async () => {
    const quotations = await fetchGetQuotations();
    setQuotations(quotations);
  };

  const getCompanies = async () => {
    const companies = await fetchGetCompanies();
    setCompanies(companies);
  };

  useEffect(() => {
    getQuotations();
    getCompanies();
  }, []);
  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <QuotationsTable quotations={quotations} />
        </div>
        <div className="col-md-6">
          <QuotationsForm
            setQuotations={setQuotations}
            quotations={quotations}
            companies={companies}
          />
        </div>
      </div>
    </div>
  );
};

export default Quotations;
