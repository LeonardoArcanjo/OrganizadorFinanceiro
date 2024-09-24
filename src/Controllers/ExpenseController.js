import expense from "../Context/FinanceContext.js";
import {
  CREATE_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../Models/Constants.js";

class ExpenseController {
  static async getAllExpenses(req, res) {
    try {
      const expenseList = await expense.find({});
      res.status(OK_STATUS).json(expenseList);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }

  static async getExpenseById(req, res) {
    try {
      const id = req.params.id;
      const expenseFound = await expense.findById(id);
      res.status(OK_STATUS).json(expenseFound);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }

  static async updateExpense(req, res) {
    try {
      const id = req.params.id;
      await expense.findByIdAndUpdate(id, req.body);
      res.status(OK_STATUS).json({ message: "Expense updated!" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - update request error` });
    }
  }

  static async insertExpense(req, res) {
    try {
      const newExpense = await expense.create(req.body);
      res
        .status(CREATE_STATUS)
        .json({ message: "Inserted successfully", expense: newExpense });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${erro.message} - fail to insert expense` });
    }
  }

  static async deleteExpenseById(req, res) {
    try {
      const id = req.params.id;
      await expense.findByIdAndDelete(id);
      res.status(OK_STATUS).json({ message: "expense deleted!" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - delete request error` });
    }
  }
}

export default ExpenseController;
