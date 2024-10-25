import express from "express";
import InvestimentController from "../Controllers/InvestimentController.js";

const router = express.Router();

router
  .get("/investment", InvestimentController.getAllInvestments)
  .get("/investment/:Category", InvestimentController.getInvestmentByCategory)
  .get("/investment/:id", InvestimentController.getInvestmentById)
  .put("/investment/:id", InvestimentController.updateInvestiment)
  .post("/investment/:id", InvestimentController.insertInvestment)
  .delete("/investment/:id", InvestimentController.deleteInvestment);

export default router;