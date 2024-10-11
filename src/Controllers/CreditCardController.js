import CreditCardExpense from "../Context/CreditCard.js";
import {
  CREATE_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../Models/Constants";

class CrediCardController {
  static async getAllCreditCardExpenses(req, res) {
    try {
      const ccExpenseList = await CreditCardExpense.find({});
      res.status(OK_STATUS).json(ccExpenseList);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }

  static async getCCExpensesByBank(req, res) {
    try {
      const bankName = req.params.bankName;
      const ccExpenseListByBank = await CreditCardExpense.find({
        bankName: `${bankName}`,
      });
      res.status(OK_STATUS).json(ccExpenseListByBank);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message}` });
    }
  }

  static async getCCExpensesById(req, res) {
    try {
      const ccExpenseId = req.params.id;
      const ccExpense = await CreditCardExpense.findById(ccExpenseId);
      res.status(OK_STATUS).json(ccExpense);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message}` });
    }
  }

  static async updateCCExpensesById(req, res) {
    try {
      const ccExpenseId = req.params.id;
      await CreditCardExpense.findByIdAndUpdate(ccExpenseId, req.body);
      res.status(OK_STATUS).json({ message: "Credit Card Expense Updated!" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message}` });
    }
  }

  static async insertCCExpense(req, res) {
    try {
      const newCCExpense = await CreditCardExpense.create(req.body);
      res.status(CREATE_STATUS).json({
        message: "Credit Card Expense created successfully",
        creditCardExpense: newCCExpense,
      });
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR_STATUS).json({
        message: `${error.message} - fail to create Credit Card Expense`,
      });
    }
  }

  static async deleteCCExpense(req, res) {
    try {
      const id = req.params.id;
      await CreditCardExpense.findByIdAndDelete(id);
      res.status(OK_STATUS).json({ message: "Credit Card Expense deleted!" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - delete request error` });
    }
  }
}

export default CrediCardController;
