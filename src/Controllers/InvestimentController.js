import investiment from "../Context/Investiment.js";
import { CREATE_STATUS, OK_STATUS } from "../Models/Constants.js";

class InvestimentController {
  static async getAllInvestments(req, res, next) {
    try {
      const investimentList = await investiment.find({});
      res.status(OK_STATUS).json(investimentList);
    } catch (error) {
      next(error);
    }
  }

  static async getInvestmentById(req, res, next) {
    try {
      const id = req.params.id;
      const investimentByCategoryList = await investiment.findById(id);
      res.status(OK_STATUS).json(investimentByCategoryList);
    } catch (error) {
      next(error);
    }
  }

  static async getInvestmentByCategory(req, res, next) {
    try {
      const category = req.params.category;
      const investimentByCategoryList = await investiment.find({
        category: `${category}`,
      });
      res.status(OK_STATUS).json(investimentByCategoryList);
    } catch (error) {
      next(error)
    }
  }

  static async updateInvestiment(req, res, next) {
    try {
      const id = req.params.id;
      await investiment.findByIdAndUpdate(id, req.body);
      res.status(OK_STATUS).json({ message: "Investment Updated!" });
    } catch (error) {
      next(error);
    }
  }

  static async insertInvestment(req, res, next) {
    try {
      const newInvestiment = await investiment.create(req.body);
      res.status(CREATE_STATUS).json({
        message: "Income created successfully",
        income: newInvestiment,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteInvestment(req, res, next) {
    try {
      const id = req.params.id;
      await investiment.findByIdAndDelete(id);
      res.status(OK_STATUS).json({ message: "Investment deleted!" });
    } catch (error) {
      next(error);
    }
  }
}

export default InvestimentController;
