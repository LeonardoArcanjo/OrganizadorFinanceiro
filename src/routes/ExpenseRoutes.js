import express from "express";
import ExpenseController from "../Controllers/ExpenseController.js";

const router = express.Router();

router
  .get("/expense", ExpenseController.getAllExpenses)
  .get("/expense/search", ExpenseController.searchExpense)
  .get("/expense/:id", ExpenseController.getExpenseById)
  .post("/expense", ExpenseController.insertExpense)
  .put("/expense/:id", ExpenseController.updateExpense)
  .delete("/expense/:id", ExpenseController.deleteExpenseById);

export default router;
