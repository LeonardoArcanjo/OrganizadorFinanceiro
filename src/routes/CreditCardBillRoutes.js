import express from "express";
import CreditCardBillController from "../Controllers/CreditCardBillController.js";

const router = express.Router();

router
  .get("/creditCardBill", CreditCardBillController.getAllCreditCardBill)
  .get("/creditCardBill/:id", CreditCardBillController.getCCBillById)
  .get("/creditCardBill/:Bank", CreditCardBillController.getCCBillByBank)
  .get(
    "/creditCardBill/:month&:year",
    CreditCardBillController.getCCBillByMonthAndYear
  )
  .post("/creditCardBill", CreditCardBillController.insertCCBill)
  .put("/creditCardBill/:id", CreditCardBillController.updateCCBillById)
  .delete("creditCardBill/:id", CreditCardBillController.deleteCCBill);

export default router;
