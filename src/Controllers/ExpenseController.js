import { expense } from "../Context/Expense.js";
import {
  CREATE_STATUS,
  OK_STATUS,
} from "../Models/Constants.js";

class ExpenseController {
  static async getAllExpenses(req, res, next) {
    try {
      const expenseList = await expense.find({});
      res.status(OK_STATUS).json(expenseList);
    } catch (error) {
      next(error);
    }
  }

  static async getExpenseById(req, res, next) {
    try {
      const id = req.params.id;
      const expenseFound = await expense.findById(id);
      res.status(OK_STATUS).json(expenseFound);
    } catch (error) {
      next(error);
    }
  }

  static async updateExpense(req, res, next) {
    try {
      const id = req.params.id;
      await expense.findByIdAndUpdate(id, req.body);
      res.status(OK_STATUS).json({ message: "Expense updated!" });
    } catch (error) {
      next(error);
    }
  }

  static async insertExpense(req, res, next) {
    try {
      const newExpense = await expense.create(req.body);
      res
        .status(CREATE_STATUS)
        .json({ message: "Inserted successfully", expense: newExpense });
    } catch (error) {
      next(error);
    }
  }

  static async deleteExpenseById(req, res, next) {
    try {
      const id = req.params.id;
      await expense.findByIdAndDelete(id);
      res.status(OK_STATUS).json({ message: "expense deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

export default ExpenseController;
