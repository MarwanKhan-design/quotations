import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: String,
    unit: String,
    quantity: Number,
  },
  { versionKey: false, _id: false }
);

const bidSchema = new mongoose.Schema(
  {
    product: { type: String },
    price: Number,
  },
  { versionKey: false, _id: false }
);

const companySchema = new mongoose.Schema(
  {
    company: { type: String, ref: "Company" },
    bids: [bidSchema],
  },
  { versionKey: false, _id: false }
);

const Quotations = mongoose.model(
  "Quotation",
  new mongoose.Schema(
    {
      name: String,
      products: [productSchema],
      companies: [companySchema],
      lastDate: String,
      qType: String,
      refNo: String,
      from: String,
      demandDate: String,
      demandNumber: String,
    },
    { versionKey: false }
  )
);

export default Quotations;
