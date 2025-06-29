import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

import companyRoutes from "./routes/companies.js";
import quotationRoutes from "./routes/quotations.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.use("/api/companies", companyRoutes);
app.use("/api/quotations", quotationRoutes);

// Connect to DB and then start server
mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to db");
    app.listen(port, () => console.log(`Listening on port ${port}`));
  })
  .catch((err) => {
    console.error("Failed to connect to DB", err);
  });
