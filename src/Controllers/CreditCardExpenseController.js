import { creditCardExpense } from "../Context/CreditCardExpense.js";
import { CREATE_STATUS, OK_STATUS } from "../Models/Constants.js";

class CreditCardExpenseController {
  static getAllCreditCardExpenses(req, res, next) {
    try {
      const ccExpenseList = creditCardExpense.find();
      req.response = ccExpenseList;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getCCExpenseById(req, res, next) {
    try {
      const ccExpenseId = req.params.id;
      const ccExpense = await creditCardExpense.findById(ccExpenseId);
      if (ccExpense !== null) {
        res.status(OK_STATUS).json(ccExpense);
      } else {
        next(new NotFound("Credit Card Expense not found!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateCCExpensesById(req, res, next) {
    try {
      const ccExpenseId = req.params.id;
      const ccExpense = await creditCardExpense.findByIdAndUpdate(
        ccExpenseId,
        req.body
      );

      if (ccExpense !== null) {
        res.status(OK_STATUS).json({ message: "Credit Card Expense Updated!" });
      } else {
        next(new NotFound("Credit Card Expense not found!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async insertCCExpense(req, res, next) {
    try {
      const newCCExpense = await creditCardExpense.create(req.body);

      res.status(CREATE_STATUS).json({
        message: "Credit Card Expense created!",
        creditCardExpense: newCCExpense,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCCExpense(req, res, next) {
    try {
      const id = req.params.id;
      const ccExpense = await creditCardExpense.findByIdAndDelete(id);
      if (ccExpense !== null) {
        res.status(OK_STATUS).json({ message: "Credit Card Expense deleted!" });
      } else {
        next(new NotFound("Credit Card Expense not found"));
      }
    } catch (error) {
      next(error);
    }
  }
}

function searchQueryHandler(params) {
  // const { bankName, name, category, minValue, maxValue } = params;
  const { bankName } = params;

  let search = {};

  if (bankName) search.bankName = { $regex: bankName, $options: "i" };

  // if (name) expense.name = { $regex: name, $options: "i" };

  // if (category) expense.category = category;

  // if (minValue || maxValue) expense.value = {};

  // if (minValue) expense.value.$gte = minValue;
  // if (maxValue) expense.value.$lte = maxValue;

  // console.log("expense: ", ex);
  // if (expenseTemp) search = { ...search, expense };

  // console.log("Search: ", search);
  return search;
}

export default CreditCardExpenseController;
