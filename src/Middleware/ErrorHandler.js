import mongoose from "mongoose";
import { BAD_REQUEST_STATUS, INTERNAL_SERVER_ERROR_STATUS } from "../Models/Constants";

// eslint-disable-next-line no-unused-vars
function ErrorRequestHandler(error, req, res, next) {
    if (error instanceof mongoose.Error.CastError) {
        res.status(BAD_REQUEST_STATUS).send({ message: "Data request error" })
    }
    else {
        res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: "Internal server error" })
    }
}

export default ErrorRequestHandler;