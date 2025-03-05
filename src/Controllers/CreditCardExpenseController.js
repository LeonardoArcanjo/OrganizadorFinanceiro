import { CreditCardExpense } from "../Context/CreditCardExpense.js";
import { CREATE_STATUS, OK_STATUS } from "../Models/Constants.js";

class CreditCardExpenseController {
  static getAllCreditCardExpenses(req, res, next) {
    try {
      const ccExpenseList = CreditCardExpense.find();
      req.response = ccExpenseList;
      next();
    } catch (error) {
      next(error);
    }
  }

  static searchCCExpenses(req, res, next) {
    try {
      let search = searchQueryHandler(req.query);
      if (search !== null) {
        const searchResult = CreditCardExpense.find(search);
        res.response = searchResult;
        next();
      } else if (searchResult.length === 0) {
        res.status(NO_CONTENT).json(searchResult);
      }
    } catch (error) {
      next(error);
    }
  }

  static async getCCExpensesById(req, res, next) {
    try {
      const ccExpenseId = req.params.id;
      const ccExpense = await CreditCardExpense.findById(ccExpenseId);
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
      const ccExpense = await CreditCardExpense.findByIdAndUpdate(
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
      const newCCExpense = await CreditCardExpense.create(req.body);

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
      const ccExpense = await CreditCardExpense.findByIdAndDelete(id);
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
  const { bankName, installments, name, category, minValue, maxValue, date } =
    params;

  let search = {};
}

export default CreditCardExpenseController;
