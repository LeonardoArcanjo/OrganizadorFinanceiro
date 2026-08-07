import { describe, it, expect } from "vitest";
import NotFoundHandler from "../../src/Middleware/NotFoundHandler.js";
import NotFound from "../../src/Errors/NotFound.js";
import { createMockNext } from "../helpers/mockExpress.js";

describe("NotFoundHandler", () => {
  it("calls next with a NotFound error", () => {
    const next = createMockNext();

    NotFoundHandler({}, {}, next);

    expect(next).toHaveBeenCalledTimes(1);
    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
    expect(next.mock.calls[0][0].status).toBe(404);
  });
});
