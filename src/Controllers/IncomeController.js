import income from "../Context/Income.js";
import { CREATE_STATUS, OK_STATUS } from "../Models/Constants.js";

class IncomeController {
  static async getAllIncomes(req, res, next) {
    try {
      const incomeList = await income.find({});
      res.status(OK_STATUS).json(incomeList);
    } catch (error) {
      next(error)
    }
  }

  static async getIncomeById(req, res, next) {
    try {
      const id = req.params.id;
      const incomeFound = await income.findById(id);

      res.status(OK_STATUS).json(incomeFound);
    } catch (error) {
      next(error)
    }
  }

  static async getIncomeByCategory(req, res, next) {
    try {
      const category = req.params.category;
      const incomeByCategoryList = await income.find({
        category: `${category}`,
      });
      res.status(OK_STATUS).json(incomeByCategoryList);
    } catch (error) {
      next(error);
    }
  }

  static async updateIncome(req, res, next) {
    try {
      const id = req.params.id;
      await income.findByIdAndUpdate(id, req.body);
      res.status(OK_STATUS).json({ message: "Income Updated!" });
    } catch (error) {
      next(error)
    }
  }

  static async insertIncome(req, res, next) {
    try {
      const newIncome = await income.create(req.body);
      res
        .status(CREATE_STATUS)
        .json({ message: "Income created successfully", income: newIncome });
    } catch (error) {
      next(error);
    }
  }

  static async deleteIncome(req, res, next) {
    try {
      const id = req.params.id;
      await income.findByIdAndDelete(id);
      res.status(OK_STATUS).json({ message: "Income deleted!" });
    } catch (error) {
      next(error)
    }
  }
}

export default IncomeController;
