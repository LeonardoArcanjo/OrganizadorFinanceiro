import express from "express";
import ExpenseController from "../Controllers/ExpenseController.js";

const routes = express.Router();

routes.get("/expense", ExpenseController.getAllExpenses);
routes.get("/expense/:id", ExpenseController.getExpenseById);

routes.post("/expense", ExpenseController.insertExpense);

routes.put("/expense/:id", ExpenseController.updateExpense);

routes.delete("/expense/:id", ExpenseController.deleteExpenseById);

export default routes;
