import express from "express";
import CreditCardController from "../Controllers/CreditCardController.js";

const router = express.Router();

router
  .get("/creditCard", CreditCardController.getAllCreditCardExpenses)
  .get("creditCard/:id", CreditCardController.getCCExpensesById)
  .get("/creditCard/:Bank", CreditCardController.getCCExpensesByBank)
  .post("/creditCard", CreditCardController.insertCCExpense)
  .put("/creditCard/:id", CreditCardController.updateCCExpensesById)
  .delete("/creditCard/:id", CreditCardController.deleteCCExpense);

export default router;
