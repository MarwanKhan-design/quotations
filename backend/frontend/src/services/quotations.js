import axios from "axios";
import { backendUri } from "../utilities/backend";

const quotationsApi = `${backendUri}/quotations`;

export const fetchGetQuotations = async () => {
  const { data } = await axios.get(`${quotationsApi}`);
  return data;
};
export const fetchGetQuotation = async (id) => {
  const { data } = await axios.get(`${quotationsApi}/${id}`);
  return data;
};

export const fetchCreateQuotations = async (formData) => {
  const { data } = await axios.post(quotationsApi, formData);
  return data;
};

export const fetchAddProduct = async (formData, id) => {
  const { data } = await axios.put(`${quotationsApi}/add/product/${id}`, {
    products: formData,
  });
  return data;
};

export const fetchAddBids = async (formData, id) => {
  const { data } = await axios.put(`${quotationsApi}/add/company/bid/${id}`, {
    data: formData,
  });
  return data;
};
