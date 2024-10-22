import CreditCardBill from "../Context/CreditCardBill.js";
import {
  CREATE_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../Models/Constants";

class CreditCardBillController {
  // GET endpoints
  static async getAllCreditCardBill(req, res) {
    try {
      const ccBill = await CreditCardBill.find({});
      res.status(OK_STATUS).json(ccBill);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }

  static async getCCBillById(req, res) {
    try {
      const ccBillId = req.params.id;
      const ccBill = await CreditCardBill.findById(ccBillId);
      res.status(OK_STATUS).json(ccBill);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message}` });
    }
  }

  static async getCCBillByBank(req, res) {
    try {
      const bankName = req.params.bankName;
      const ccBillListByBank = await CreditCardBill.find({
        CreditCardExpense: {
          bankName: `${bankName}`,
        },
      });
      res.status(OK_STATUS).json(ccBillListByBank);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message}` });
    }
  }

  static async getCCBillByMonthAndYear(req, res) {
    try {
      const month = req.params.month;
      const year = req.params.year;
      const ccBillList = await CreditCardBill.find({
        month: `${month}`,
        year: `${year}`,
      });
      res.status(OK_STATUS).json(ccBillList);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message}` });
    }
  }

  // POST Endpoints
  static async insertCCBill(req, res) {
    try {
      const newCCBill = await CreditCardBill.create(req.body);
      res.status(CREATE_STATUS).json({
        message: "Credit Card Bill created successfully",
        creditCardBill: newCCBill,
      });
    } catch (error) {
      res.status(INTERNAL_SERVER_ERROR_STATUS).json({
        message: `${error.message} - fail to create Credit Card Bill`,
      });
    }
  }

  // Update Endpoints
  static async updateCCBillById(req, res) {
    try {
      const ccBillId = req.params.id;
      await CreditCardBill.findByIdAndUpdate(ccBillId, req.body);
      res.status(OK_STATUS).json({ message: "Credit Card Bill Updated!" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message}` });
    }
  }

  // DELETE Endpoints
  static async deleteCCBill(req, res) {
    try {
      const id = req.params.id;
      await CreditCardBill.findByIdAndDelete(id);
      res.status(OK_STATUS).json({ message: "Credit Card Bill deleted!" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - delete request error` });
    }
  }
}

export default CreditCardBillController;
