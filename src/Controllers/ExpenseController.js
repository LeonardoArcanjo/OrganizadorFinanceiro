import expense from "../Context/FinanceContext";
import { OK_STATUS } from "../Models/Constants";

class ExpenseController {
  static async getAllExpenses(req, res) {
    const expenseList = await expense.find({});
    res.status(OK_STATUS).json(expenseList);
  }
}

export default ExpenseController;
