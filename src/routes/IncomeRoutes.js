import IncomeController from "../Controllers/IncomeController";
import express from "express";

const routes = express.Router();

routes.get("/income", IncomeController.getAllIncomes);
routes.get("/income/:id", IncomeController.getIncomeById);
routes.get("/income/:category", IncomeController.getIncomeByCategory);

routes.post('/income', IncomeController.insertIncome);

routes.put('/income/:id', IncomeController.updateIncome);

routes.delete("/income/:id", IncomeController.deleteIncome);