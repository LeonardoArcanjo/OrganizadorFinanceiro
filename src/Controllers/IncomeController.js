import income from "../Context/Income.js";
import {
  CREATE_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../Models/Constants";

class IncomeController {
  static async getAllIncomes(req, res) {
    try {
      const incomeList = await income.find({});
      res.status(OK_STATUS).json(incomeList);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }

  static async getIncomeById(req, res) {
    try {
      const id = req.params.id;
      const incomeFound = await income.findById(id);

      res.status(OK_STATUS).json(incomeFound);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }

  static async getIncomeByCategory(req, res) {
    try {
      const category = req.params.category;
      const incomeByCategoryList = await income.find({
        category: `${category}`,
      });
      res.status(OK_STATUS).json(incomeByCategoryList);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }

  static async updateIncome(req, res) {
    try {
      const id = req.params.id;
      await income.findByIdAndUpdate(id, req.body);
      res.status(OK_STATUS).json({ message: "Income Updated!" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - update request error` });
    }
  }

  static async insertIncome(req, res) {
    try {
      const newIncome = await income.create(req.body);
      res
        .status(CREATE_STATUS)
        .json({ message: "Income created successfully", income: newIncome });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - fail to create income` });
    }
  }

  static async deleteIncome(req, res) {
    try {
      const id = req.params.id;
      await income.findByIdAndDelete(id);
      res.status(OK_STATUS).json({ message: "Income deleted!" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - delete request error` });
    }
  }
}

export default IncomeController;
