import CreditCardExpense from "../Context/CreditCard.js";
import {
  CREATE_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../Models/Constants";

class CrediCardController {
  static async getAllCreditCardExpenses(req, res, next) {
    try {
      const ccExpenseList = await CreditCardExpense.find({});
      res.status(OK_STATUS).json(ccExpenseList);
    } catch (error) {
      next(error);
    }
  }

  static async getCCExpensesByBank(req, res, next) {
    try {
      const bankName = req.params.bankName;
      const ccExpenseListByBank = await CreditCardExpense.find({
        bankName: `${bankName}`,
      });
      res.status(OK_STATUS).json(ccExpenseListByBank);
    } catch (error) {
      next(error);
    }
  }

  static async getCCExpensesById(req, res, next) {
    try {
      const ccExpenseId = req.params.id;
      const ccExpense = await CreditCardExpense.findById(ccExpenseId);
      res.status(OK_STATUS).json(ccExpense);
    } catch (error) {
      next(error);
    }
  }

  static async updateCCExpensesById(req, res, next) {
    try {
      const ccExpenseId = req.params.id;
      await CreditCardExpense.findByIdAndUpdate(ccExpenseId, req.body);
      res.status(OK_STATUS).json({ message: "Credit Card Expense Updated!" });
    } catch (error) {
      next(error);
    }
  }

  static async insertCCExpense(req, res, next) {
    try {
      const newCCExpense = await CreditCardExpense.create(req.body);
      res.status(CREATE_STATUS).json({
        message: "Credit Card Expense created successfully",
        creditCardExpense: newCCExpense,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCCExpense(req, res, next) {
    try {
      const id = req.params.id;
      await CreditCardExpense.findByIdAndDelete(id);
      res.status(OK_STATUS).json({ message: "Credit Card Expense deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

export default CrediCardController;
