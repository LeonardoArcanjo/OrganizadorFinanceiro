import NotFound from "../Errors/NotFound.js";

function NotFoundHandler(req, res, next) {
  const notFound = new NotFound();
  next(notFound);
}

export default NotFoundHandler;
