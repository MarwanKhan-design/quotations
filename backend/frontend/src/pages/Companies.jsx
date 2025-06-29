import React, { useEffect, useState } from "react";
import CompanyForm from "../components/CompanyForm";
import CompanyTable from "../components/CompanyTable";
import { fetchGetCompanies } from "../services/company";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const getCompanies = async () => {
    const companies = await fetchGetCompanies();
    setCompanies(companies);
  };
  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-6">
          <CompanyTable companies={companies} />
        </div>
        <div className="col-md-6">
          <CompanyForm setCompanies={setCompanies} companies={companies} />
        </div>
      </div>
    </div>
  );
};

export default Companies;
