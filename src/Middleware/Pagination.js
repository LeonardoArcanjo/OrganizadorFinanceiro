import ErrorRequest from "../Errors/ErrorRequest.js";
import { OK_STATUS } from "../Models/Constants.js";

async function paginator(req, res, next) {
  try {
    let { range = 5, page = 1, sorting = "_id:-1" } = req.query;
    let [sortField, sort] = sorting.split(":");

    range = parseInt(range);
    page = parseInt(page);
    sort = parseInt(sort);

    const response = req.response;

    if (range > 0 && page > 0) {
      const sortResponse = await response
        .find()
        .sort({ [sortField]: sort })
        .skip((page - 1) * range)
        .limit(range)
        .exec();
      res.status(OK_STATUS).json(sortResponse);
    } else {
      next(new ErrorRequest());
    }
  } catch (error) {
    next(error);
  }
}

export default paginator;
