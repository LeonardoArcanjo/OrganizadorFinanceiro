import { expense } from "../Context/Expense.js";
import NotFound from "../Errors/NotFound.js";
import { CREATE_STATUS, NO_CONTENT, OK_STATUS } from "../Models/Constants.js";

class ExpenseController {
  static getAllExpenses(req, res, next) {
    try {
      const expenses = expense.find();
      req.response = expenses;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getExpenseById(req, res, next) {
    try {
      const id = req.params.id;
      const expenseFound = await expense.findById(id);

      if (expenseFound !== null) {
        res.status(OK_STATUS).json(expenseFound);
      } else {
        next(new NotFound("Expense not found!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static searchExpense(req, res, next) {
    try {
      let search = searchQueryHandler(req.query);

      if (search !== null) {
        const searchResult = expense.find(search);
        req.response = searchResult;
        next();
      } else if (searchResult.length === 0) {
        res.status(NO_CONTENT).json(searchResult);
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateExpense(req, res, next) {
    try {
      const id = req.params.id;
      const expenseFound = await expense.findByIdAndUpdate(id, req.body);

      if (expenseFound !== null) {
        res.status(OK_STATUS).json({ message: "Expense updated!" });
      } else {
        next(new NotFound("Expense not found!"));
      }
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
      const expenseFound = await expense.findByIdAndDelete(id);

      if (expenseFound !== null) {
        res.status(OK_STATUS).json({ message: "expense deleted!" });
      } else {
        next(new NotFound("Expense not found!"));
      }
    } catch (error) {
      next(error);
    }
  }
}

function searchQueryHandler(params) {
  const { name, category, minValue, maxValue } = params;

  let search = {};

  if (name) search.name = { $regex: name, $options: "i" };
  if (category) search.category = category;

  if (minValue || maxValue) search.value = {};

  if (minValue) search.value.$gte = minValue;
  if (maxValue) search.value.$lte = maxValue;

  console.log("expense: ", search);
  return search;
}

export default ExpenseController;
