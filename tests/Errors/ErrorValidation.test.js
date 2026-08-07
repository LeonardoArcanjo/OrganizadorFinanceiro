import { describe, it, expect } from "vitest";
import ErrorValidation from "../../src/Errors/ErrorValidation.js";
import ErrorRequest from "../../src/Errors/ErrorRequest.js";

describe("ErrorValidation", () => {
  it("joins all field error messages into a single message", () => {
    const fakeMongooseValidationError = {
      errors: {
        name: { message: "Name property value is required." },
        value: { message: "Value property value is required" },
      },
    };

    const error = new ErrorValidation(fakeMongooseValidationError);

    expect(error.message).toBe(
      "Send request validation error - Name property value is required.; Value property value is required"
    );
    expect(error.status).toBe(400);
  });

  it("works with a single field error", () => {
    const fakeMongooseValidationError = {
      errors: {
        category: { message: "Category property value is required" },
      },
    };

    const error = new ErrorValidation(fakeMongooseValidationError);

    expect(error.message).toBe(
      "Send request validation error - Category property value is required"
    );
  });

  it("is an instance of ErrorRequest", () => {
    const error = new ErrorValidation({ errors: {} });
    expect(error).toBeInstanceOf(ErrorRequest);
  });
});
