import Company from "../models/companies.js";

export const getCompanies = async (req, res) => {
  const companies = await Company.find().sort([["_id", "desc"]]);
  res.json(companies);
};

export const createCompany = async (req, res) => {
  const { name, email, address, phone } = req.body;
  const company = new Company({ name, email, address, phone });
  company.save();
  res.json(company);
};
