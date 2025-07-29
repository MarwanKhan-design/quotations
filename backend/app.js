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

app.use("/api/companies", companyRoutes);
app.use("/api/quotations", quotationRoutes);

app.listen(port, () => console.log(`Listening on port ${port}`));
mongoose.connect(process.env.DB_URI, () => console.log("Connected to db"));
// import express from "express";
// import morgan from "morgan";
// import cors from "cors";
// import dotenv from "dotenv";
// import mongoose from "mongoose";
// import path from "path";
// import { fileURLToPath } from "url";

// import companyRoutes from "./routes/companies.js";
// import quotationRoutes from "./routes/quotations.js";

// // Setup __dirname for ES Modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cors());
// app.use(express.urlencoded({ extended: false }));

// // API Routes
// app.use("/api/companies", companyRoutes);
// app.use("/api/quotations", quotationRoutes);

// // ✅ Serve frontend
// app.use(express.static(path.join(__dirname, "frontend/dist")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend/dist", "index.html"));
// });

// // ✅ Connect Mongo + Start server
// mongoose
//   .connect(process.env.DB_URI)
//   .then(() => {
//     console.log("✅ Connected to DB");
//     app.listen(port, () => console.log(`✅ Server running on port ${port}`));
//   })
//   .catch((err) => {
//     console.error("❌ DB connection error:", err);
//   });
