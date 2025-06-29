import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import companyRoutes from "./routes/companies.js";
import quotationRoutes from "./routes/quotations.js";

const app = express();
dotenv.config();

const port = process.env.PORT;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.use("/api/companies", companyRoutes);
app.use("/api/quotations", quotationRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
mongoose.connect(process.env.DB_URI).then(() => console.log("Connected to db"));
