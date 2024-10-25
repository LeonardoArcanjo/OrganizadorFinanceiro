import CreditCardBill from "../Context/CreditCardBill.js";
import { CREATE_STATUS, OK_STATUS } from "../Models/Constants.js";

class CreditCardBillController {
  // GET endpoints
  static async getAllCreditCardBill(req, res, next) {
    try {
      const ccBill = await CreditCardBill.find({});
      res.status(OK_STATUS).json(ccBill);
    } catch (error) {
      next(error);
    }
  }

  static async getCCBillById(req, res, next) {
    try {
      const ccBillId = req.params.id;
      const ccBill = await CreditCardBill.findById(ccBillId);
      res.status(OK_STATUS).json(ccBill);
    } catch (error) {
      next(error);
    }
  }

  static async getCCBillByBank(req, res, next) {
    try {
      const bankName = req.params.bankName;
      const ccBillListByBank = await CreditCardBill.find({
        CreditCardExpense: {
          bankName: `${bankName}`,
        },
      });
      res.status(OK_STATUS).json(ccBillListByBank);
    } catch (error) {
      next(error);
    }
  }

  static async getCCBillByMonthAndYear(req, res, next) {
    try {
      const month = req.params.month;
      const year = req.params.year;
      const ccBillList = await CreditCardBill.find({
        month: `${month}`,
        year: `${year}`,
      });
      res.status(OK_STATUS).json(ccBillList);
    } catch (error) {
      next(error);
    }
  }

  // POST Endpoints
  static async insertCCBill(req, res, next) {
    try {
      const newCCBill = await CreditCardBill.create(req.body);
      res.status(CREATE_STATUS).json({
        message: "Credit Card Bill created successfully",
        creditCardBill: newCCBill,
      });
    } catch (error) {
      next(error);
    }
  }

  // Update Endpoints
  static async updateCCBillById(req, res, error) {
    try {
      const ccBillId = req.params.id;
      await CreditCardBill.findByIdAndUpdate(ccBillId, req.body);
      res.status(OK_STATUS).json({ message: "Credit Card Bill Updated!" });
    } catch (error) {
      next(error);
    }
  }

  // DELETE Endpoints
  static async deleteCCBill(req, res, next) {
    try {
      const id = req.params.id;
      await CreditCardBill.findByIdAndDelete(id);
      res.status(OK_STATUS).json({ message: "Credit Card Bill deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

export default CreditCardBillController;
