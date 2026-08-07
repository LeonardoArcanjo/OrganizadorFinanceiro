import { describe, it, expect } from "vitest";
import NotFound from "../../src/Errors/NotFound.js";
import ErrorBase from "../../src/Errors/ErrorBase.js";

describe("NotFound", () => {
  it("defaults to a 404 with a generic message", () => {
    const error = new NotFound();
    expect(error.message).toBe("Page not found");
    expect(error.status).toBe(404);
  });

  it("accepts a custom message but keeps status 404", () => {
    const error = new NotFound("Expense not found!");
    expect(error.message).toBe("Expense not found!");
    expect(error.status).toBe(404);
  });

  it("is an instance of ErrorBase", () => {
    expect(new NotFound()).toBeInstanceOf(ErrorBase);
  });
});
