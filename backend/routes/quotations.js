import express from "express";
import {
  addCompanyBid,
  createQuotation,
  getQuotation,
  getQuotations,
  updateQuotation,
  updateQuotationProducts,
} from "../controllers/quotations.js";

const router = express.Router();

router.get("/", getQuotations);
router.get("/:id", getQuotation);
router.post("/", createQuotation);
router.put("/:id", updateQuotation);
router.put("/add/product/:id", updateQuotationProducts);
router.put("/add/company/bid/:id", addCompanyBid);

export default router;
