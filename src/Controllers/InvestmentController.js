import Investment from "../Context/Investment.js";
import NotFound from "../Errors/NotFound.js";
import { CREATE_STATUS, OK_STATUS, NO_CONTENT } from "../Models/Constants.js";

class InvestmentController {
  static async getAllInvestments(req, res, next) {
    try {
      const investments = Investment.find();
      req.response = investments;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getInvestmentById(req, res, next) {
    try {
      const id = req.params.id;
      const investment = await Investment.findById(id);

      if (investment !== null) {
        res.status(OK_STATUS).json(investment);
      } else {
        next(new NotFound("Investment not found!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async searchInvestment(req, res, next) {
    try {
      const search = searchQueryHandler(req.query);

      if (search !== null) {
        const result = Investment.find(search);
        req.response = result;
        next();
      } else if (result.length === 0) {
        res.status(NO_CONTENT).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateInvestment(req, res, next) {
    try {
      const id = req.params.id;
      const investment = await Investment.findByIdAndUpdate(id, req.body);

      if (investment !== null) {
        res.status(OK_STATUS).json({ message: "Investment updated!" });
      } else {
        next(new NotFound("Investment not found!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async insertInvestment(req, res, next) {
    try {
      const newInvestment = await Investment.create(req.body);
      res.status(CREATE_STATUS).json({
        message: "Investment created successfully",
        income: newInvestment,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteInvestment(req, res, next) {
    try {
      const id = req.params.id;
      const investment = await Investment.findByIdAndDelete(id);

      if (investment !== null) {
        res.status(OK_STATUS).json({ message: "Investment deleted!" });
      } else {
        next(new NotFound("Investment not found!"));
      }
    } catch (error) {
      next(error);
    }
  }
}

function searchQueryHandler(params) {
  const { name, category, minValue, maxValue } = params;

  let search = {};

  if (name) search.name = { $regex: name, $options: "i" };
  if (category) search.category = category;

  if (minValue || maxValue) search.value = {};

  if (minValue) search.value.$gte = minValue;
  if (maxValue) search.value.$lte = maxValue;

  return search;
}

export default InvestmentController;
