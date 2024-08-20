import express from "express";
import expense from "./ExpenseRoutes.js";
import { OK_STATUS } from "../Models/Constants.js";

const routes = (app) => {
  app
    .route("/")
    .get((req, res) => res.status(OK_STATUS).send("API working..."));
  app.use(express.json(), expense);
};

export default routes;
