import express from "express";
import ExpenseController from "../Controllers/ExpenseController.js";

const routes = express.Router();

routes.get("/expense", ExpenseController.getAllExpenses);

export default routes;
