import { describe, it, expect } from "vitest";
import ErrorRequest from "../../src/Errors/ErrorRequest.js";
import ErrorBase from "../../src/Errors/ErrorBase.js";

describe("ErrorRequest", () => {
  it("defaults to a 400 bad request with a generic message", () => {
    const error = new ErrorRequest();
    expect(error.message).toBe("One or more fields are incorrect");
    expect(error.status).toBe(400);
  });

  it("accepts a custom message but keeps status 400", () => {
    const error = new ErrorRequest("Custom bad request message");
    expect(error.message).toBe("Custom bad request message");
    expect(error.status).toBe(400);
  });

  it("is an instance of ErrorBase", () => {
    expect(new ErrorRequest()).toBeInstanceOf(ErrorBase);
  });
});
