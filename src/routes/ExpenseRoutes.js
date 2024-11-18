import express from "express";
import ExpenseController from "../Controllers/ExpenseController.js";
import paginator from "../Middleware/Pagination.js";

const router = express.Router();

router
  .get("/expense", ExpenseController.getAllExpenses, paginator)
  .get("/expense/search", ExpenseController.searchExpense, paginator)
  .get("/expense/:id", ExpenseController.getExpenseById)
  .post("/expense", ExpenseController.insertExpense)
  .put("/expense/:id", ExpenseController.updateExpense)
  .delete("/expense/:id", ExpenseController.deleteExpenseById);

export default router;
