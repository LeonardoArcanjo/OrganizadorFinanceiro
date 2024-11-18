import mongoose from "mongoose";
import ErrorBase from "../Errors/ErrorBase.js";
import ErrorRequest from "../Errors/ErrorRequest.js";
import ErrorValidation from "../Errors/ErrorValidation.js";

// eslint-disable-next-line no-unused-vars
function ErrorRequestHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    new ErrorRequest().sendResponse(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErrorValidation(error).sendResponse(res);
  } else if (error instanceof ErrorBase) {
    error.sendResponse(res);
  } else {
    new ErrorBase().sendResponse(res);
  }
}

export default ErrorRequestHandler;