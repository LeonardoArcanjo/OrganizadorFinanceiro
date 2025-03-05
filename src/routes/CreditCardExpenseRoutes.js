import express from "express";
import CreditCardExpenseController from "../Controllers/CreditCardExpenseController.js";
import paginator from "../Middleware/Pagination.js";

const router = express.Router();

router
  .get(
    "/creditCardExpense",
    CreditCardExpenseController.getAllCreditCardExpenses,
    paginator
  )
  .get(
    "/creditCardExpense/search",
    CreditCardExpenseController.searchCCExpenses,
    paginator
  )
  .get("/creditCardExpense/:id", CreditCardExpenseController.getCCExpenseById)
  .post("/creditCardExpense", CreditCardExpenseController.insertCCExpense)
  .put(
    "/creditCardExpense/:id",
    CreditCardExpenseController.updateCCExpensesById
  )
  .delete(
    "/creditCardExpense/:id",
    CreditCardExpenseController.deleteCCExpense
  );

export default router;
