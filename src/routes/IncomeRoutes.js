import IncomeController from "../Controllers/IncomeController.js";
import express from "express";
import paginator from "../Middleware/Pagination.js";

const router = express.Router();

router
  .get("/income", IncomeController.getAllIncomes, paginator)
  .get("/income/search", IncomeController.searchIncome, paginator)
  .get("/income/:id", IncomeController.getIncomeById)
  .post("/income", IncomeController.insertIncome)
  .put("/income/:id", IncomeController.updateIncome)
  .delete("/income/:id", IncomeController.deleteIncome);

export default router;
 