import investiment from "../Context/Investiment.js";
import {
  CREATE_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../Models/Constants";

class InvestimentController {
  static async getAllInvestments(req, res) {
    try {
      const investimentList = await investiment.find({});
      res.status(OK_STATUS).json(investimentList);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }

  static async getInvestmentByCategory(req, res) {
    try {
      const category = req.params.category;
      const investimentByCategoryList = await investiment.find({
        category: `${category}`,
      });
      res.status(OK_STATUS).json(investimentByCategoryList);
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - request error` });
    }
  }

  static async updateInvestiment(req, res) {
    try {
      const id = req.params.id;
      await investiment.findByIdAndUpdate(id, req.body);
      res.status(OK_STATUS).json({ message: "Investment Updated!" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - update request error` });
    }
  }

  static async insertIncome(req, res) {
    try {
      const newInvestiment = await investiment.create(req.body);
      res.status(CREATE_STATUS).json({
        message: "Income created successfully",
        income: newInvestiment,
      });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - fail to create investiment` });
    }
  }

  static async deleteIncome(req, res) {
    try {
      const id = req.params.id;
      await investiment.findByIdAndDelete(id);
      res.status(OK_STATUS).json({ message: "Investment deleted!" });
    } catch (error) {
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .json({ message: `${error.message} - delete request error` });
    }
  }
}

export default InvestimentController;
