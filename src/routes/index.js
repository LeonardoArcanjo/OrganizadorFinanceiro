import express from "express";
import expense from "./ExpenseRoutes.js";
import investment from "./InvestimentRoutes.js";
import income from "./IncomeRoutes.js";
import { OK_STATUS } from "../Models/Constants.js";
import creditCardBill from "./CreditCardBillRoutes.js";
import creditCardExpense from "./CreditCardExpenseRoutes.js";
import NotFoundHandler from "../Middleware/NotFoundHandler.js";

const routes = (app) => {
  app
    .route("/")
    .get((req, res) => res.status(OK_STATUS).send("API working..."));

  app.use(
    express.json(),
    expense,
    investment,
    income,
    creditCardBill,
    creditCardExpense
  );

  app.use(NotFoundHandler);
};

export default routes;
