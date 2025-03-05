import express from "express";
import CreditCardExpenseController from "../Controllers/CreditCardExpenseController.js";

const router = express.Router();

router
  .get("/creditCard", CreditCardExpenseController.getAllCreditCardExpenses)
  .get("creditCard/:id", CreditCardExpenseController.getCCExpensesById)
  .get("/creditCard/:Bank", CreditCardExpenseController.getCCExpensesByBank)
  .post("/creditCard", CreditCardExpenseController.insertCCExpense)
  .put("/creditCard/:id", CreditCardExpenseController.updateCCExpensesById)
  .delete("/creditCard/:id", CreditCardExpenseController.deleteCCExpense);

export default router;
