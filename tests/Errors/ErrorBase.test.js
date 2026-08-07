import { describe, it, expect } from "vitest";
import ErrorBase from "../../src/Errors/ErrorBase.js";
import { createMockRes } from "../helpers/mockExpress.js";

describe("ErrorBase", () => {
  it("defaults to a 500 internal server error", () => {
    const error = new ErrorBase();
    expect(error.message).toBe("Internal Server Error");
    expect(error.status).toBe(500);
  });

  it("accepts a custom message and status", () => {
    const error = new ErrorBase("Custom message", 418);
    expect(error.message).toBe("Custom message");
    expect(error.status).toBe(418);
  });

  it("sendResponse sends the status and a body with message/status", () => {
    const error = new ErrorBase("Something broke", 500);
    const res = createMockRes();

    error.sendResponse(res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      message: "Something broke",
      status: 500,
    });
  });
});
