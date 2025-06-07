import express from "express";
import CreditCardBillController from "../Controllers/CreditCardBillController.js";
import paginator from "../Middleware/Pagination.js";

const router = express.Router();

router
  .get(
    "/creditCardBill",
    CreditCardBillController.getAllCreditCardBill,
    paginator
  )
  .get("/creditCardBill/:id", CreditCardBillController.getCCBillById)
  .get("/creditCardBill/:Bank", CreditCardBillController.getCCBillByBank)
  .get(
    "/creditCardBill/:expenseId",
    CreditCardBillController.getCCBillExpenseById
  )
  .get(
    "/creditCardBill/:month&:year",
    CreditCardBillController.getCCBillByMonthAndYear
  )
  .post("/creditCardBill", CreditCardBillController.insertCCBill)
  .put("/creditCardBill/:id", CreditCardBillController.updateCCBillById)
  .delete("creditCardBill/:id", CreditCardBillController.deleteCCBill);

export default router;
