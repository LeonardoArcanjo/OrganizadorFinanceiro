import express from "express";
import ExpenseController from "../Controllers/ExpenseController";

const routes = express.Router();

routes.get("/expense", ExpenseController.getAllExpenses);
