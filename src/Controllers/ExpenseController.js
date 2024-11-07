import { expense } from "../Context/Expense.js";
import ErrorValidation from "../Errors/ErrorValidation.js";
import NotFound from "../Errors/NotFound.js";
import { CREATE_STATUS, NO_CONTENT, OK_STATUS } from "../Models/Constants.js";

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

      if (expenseFound !== null) {
        res.status(OK_STATUS).json(expenseFound);
      } else {
        next(new NotFound("Expense not found!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async searchExpense(req, res, next) {
    try {
      let search = searchQueryHandler(req.query);
      const searchResult = await expense.find(search);

      if (searchResult.length === 0) {
        res.status(NO_CONTENT).json(searchResult);
      } else {
        res.status(OK_STATUS).json(searchResult);
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

  return search;
}

export default ExpenseController;
