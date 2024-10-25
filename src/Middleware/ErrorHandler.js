import mongoose from "mongoose";
import {
  BAD_REQUEST_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
} from "../Models/Constants.js";

// eslint-disable-next-line no-unused-vars
function ErrorRequestHandler(error, req, res, next) {
  if (error instanceof mongoose.Error.CastError) {
    res.status(BAD_REQUEST_STATUS).send({ message: "Data request error" });
  } else if (error instanceof mongoose.Error.ValidationError) {
    const errorMessage = Object.values(error.errors)
      .map((erro) => erro.message)
      .join("; ");
    res
      .status(BAD_REQUEST_STATUS)
      .send({ message: `Send request validation error - ${errorMessage}` });
  } else {
    res
      .status(INTERNAL_SERVER_ERROR_STATUS)
      .send({ message: "Internal server error" });
  }
}

export default ErrorRequestHandler;