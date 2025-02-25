import express from "express";
import InvestmentController from "../Controllers/InvestmentController.js";
import paginator from "../Middleware/Pagination.js";

const router = express.Router();

router
  .get("/investment", InvestmentController.getAllInvestments, paginator)
  .get("/investment/search", InvestmentController.searchInvestment, paginator)
  .get("/investment/:id", InvestmentController.getInvestmentById)
  .post("/investment", InvestmentController.insertInvestment)
  .put("/investment/:id", InvestmentController.updateInvestment)
  .delete("/investment/:id", InvestmentController.deleteInvestment);

export default router;