import NotFound from "../Errors/NotFound.js";
import { NOT_FOUND_STATUS } from "../Models/Constants.js";

function NotFoundHandler(req, res, next) {
  const notFound = new NotFound();
  next(notFound);
}

export default NotFoundHandler;
