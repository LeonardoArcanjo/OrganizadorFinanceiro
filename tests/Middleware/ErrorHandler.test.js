import { describe, it, expect } from "vitest";
import mongoose from "mongoose";
import ErrorRequestHandler from "../../src/Middleware/ErrorHandler.js";
import NotFound from "../../src/Errors/NotFound.js";
import { createMockRes, createMockNext } from "../helpers/mockExpress.js";

describe("ErrorRequestHandler", () => {
  it("maps a mongoose CastError to a generic 400 ErrorRequest response", () => {
    const castError = new mongoose.Error.CastError("ObjectId", "not-an-id", "_id");
    const res = createMockRes();

    ErrorRequestHandler(castError, {}, res, createMockNext());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "One or more fields are incorrect",
      status: 400,
    });
  });

  it("maps a mongoose ValidationError to a 400 ErrorValidation response with joined messages", () => {
    const validationError = new mongoose.Error.ValidationError();
    validationError.addError(
      "name",
      new mongoose.Error.ValidatorError({
        message: "Name property value is required.",
        path: "name",
      })
    );
    const res = createMockRes();

    ErrorRequestHandler(validationError, {}, res, createMockNext());

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      message: "Send request validation error - Name property value is required.",
      status: 400,
    });
  });

  it("sends an ErrorBase-derived error's own status/message unchanged", () => {
    const notFound = new NotFound("Expense not found!");
    const res = createMockRes();

    ErrorRequestHandler(notFound, {}, res, createMockNext());

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.send).toHaveBeenCalledWith({
      message: "Expense not found!",
      status: 404,
    });
  });

  it("maps any other error to a generic 500 response", () => {
    const genericError = new Error("boom");
    const res = createMockRes();

    ErrorRequestHandler(genericError, {}, res, createMockNext());

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Internal Server Error",
      status: 500,
    });
  });
});
