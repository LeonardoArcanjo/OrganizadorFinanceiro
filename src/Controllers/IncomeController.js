import income from "../Context/Income.js";
import NotFound from "../Errors/NotFound.js";
import { CREATE_STATUS, NO_CONTENT, OK_STATUS } from "../Models/Constants.js";

class IncomeController {
  static async getAllIncomes(req, res, next) {
    try {
      const incomeList = income.find();
      req.response = incomeList;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async getIncomeById(req, res, next) {
    try {
      const id = req.params.id;
      const incomeFound = await income.findById(id);

      if (incomeFound !== null) {
        res.status(OK_STATUS).json(incomeFound);
      } else {
        next(new NotFound("Income not found!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async searchIncome(req, res, next) {
    try {
      let search = searchQueryHandler(req.query);

      if (search !== null) {
        const result = income.find(search);
        req.response = result;
        next();
      } else if (result.length === 0) {
        res.status(NO_CONTENT).json(result);
      }
    } catch (error) {
      next(error);
    }
  }

  static async updateIncome(req, res, next) {
    try {
      const id = req.params.id;
      const incomeFound = await income.findByIdAndUpdate(id, req.body);

      if (incomeFound !== null) {
        res.status(OK_STATUS).json({ message: "Income Updated!" });
      } else {
        next(new NotFound("Income not found!"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async insertIncome(req, res, next) {
    try {
      const newIncome = await income.create(req.body);
      res
        .status(CREATE_STATUS)
        .json({ message: "Income created successfully", income: newIncome });
    } catch (error) {
      next(error);
    }
  }

  static async deleteIncome(req, res, next) {
    try {
      const id = req.params.id;
      const incomeFound = await income.findByIdAndDelete(id);

      if (incomeFound !== null) {
        res.status(OK_STATUS).json({ message: "Income deleted!" });
      } else {
        next(new NotFound("Income not found!"));
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

export default IncomeController;
