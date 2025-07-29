import axios from "axios";
import { backendUri } from "../utilities/backend";

const companyBackend = `${backendUri}/companies`;

export const fetchGetCompanies = async () => {
  const { data: companies } = await axios.get(companyBackend);
  return companies;
};

export const fetchCreateCompany = async (data) => {
  const { data: company } = await axios.post(companyBackend, data);
  return company;
};
