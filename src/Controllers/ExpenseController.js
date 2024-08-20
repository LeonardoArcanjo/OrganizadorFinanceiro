import expense from "../Context/FinanceContext.js";
import {
  CREATE_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../Models/Constants.js";

class ExpenseController {
  static async getAllExpenses(req, res) {
    const expenseList = await expense.find({});
    res.status(OK_STATUS).json(expenseList);
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
}

export default ExpenseController;
