import income from "../Context/Income.js";
import {
  CREATE_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../Models/Constants";

class IncomeController {
  static async getAllIncomes(req, res) {
    try {
      const incomeList = await income.find({});
      res.status(OK_STATUS).json(incomeList);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }

  static async getIncomeById(req, res) {
    try {
      const id = req.params.id;
      const incomeFound = await income.findById(id);

      res.status(OK_STATUS).json(incomeFound);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }
}

export default IncomeController;
