import { creditCardExpense } from "../Context/CreditCardExpense.js";
import NotFound from "../Errors/NotFound.js";
import { CREATE_STATUS, NO_CONTENT, OK_STATUS } from "../Models/Constants.js";

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

  static searchCreditCardExpense(req, res, next) {
    try {
      let search = searchQueryHandler(req.query);

      if (search !== null) {
        const searchResult = creditCardExpense.findOne(search);

        req.response = searchResult;
        next();
      } else if (searchResult.length === 0) {
        res.status(NO_CONTENT).json(searchResult);
      }
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
  const { bankName, name, category, minDate, maxDate } = params;

  let search = {};

  if (bankName) search.bankName = { $regex: bankName, $options: "i" };

  if (name) search["expense.name"] = { $regex: name, $options: "i" };

  if (category)
    search["expense.category"] = { $regex: category, $options: "i" };

  if (minDate || maxDate) {
    if (minDate && maxDate)
      search["expense.date"] = { $gte: minDate, $lte: maxDate };
    else if (maxDate) search["expense.date"] = { $lte: maxDate };
    else if (minDate) search["expense.date"] = { $gte: minDate };
  }

  return search;
}

export default CreditCardExpenseController;
