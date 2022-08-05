import mongoose from "mongoose";

const Companies = mongoose.model(
  "Company",
  new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: Number,
  })
);

export default Companies;
