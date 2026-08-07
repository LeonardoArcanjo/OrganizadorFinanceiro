import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/Context/Investment.js", () => ({
  default: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

import Investment from "../../src/Context/Investment.js";
import InvestmentController from "../../src/Controllers/InvestmentController.js";
import NotFound from "../../src/Errors/NotFound.js";
import { createMockRes, createMockNext } from "../helpers/mockExpress.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("InvestmentController.getAllInvestments", () => {
  it("assigns the unresolved find() query to req.response and defers to next", async () => {
    const sentinelQuery = { marker: "unresolved-query" };
    Investment.find.mockReturnValue(sentinelQuery);
    const req = {};
    const next = createMockNext();

    await InvestmentController.getAllInvestments(req, {}, next);

    expect(Investment.find).toHaveBeenCalledWith();
    expect(req.response).toBe(sentinelQuery);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("calls next with the error if find throws", async () => {
    const error = new Error("boom");
    Investment.find.mockImplementation(() => {
      throw error;
    });
    const next = createMockNext();

    await InvestmentController.getAllInvestments({}, {}, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("InvestmentController.getInvestmentById", () => {
  it("responds with 200 and the investment when found", async () => {
    const found = { _id: "1", name: "Index Fund" };
    Investment.findById.mockResolvedValue(found);
    const res = createMockRes();

    await InvestmentController.getInvestmentById({ params: { id: "1" } }, res, createMockNext());

    expect(Investment.findById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(found);
  });

  it("calls next with NotFound when no investment matches the id", async () => {
    Investment.findById.mockResolvedValue(null);
    const next = createMockNext();

    await InvestmentController.getInvestmentById({ params: { id: "missing" } }, createMockRes(), next);

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when findById throws", async () => {
    const error = new Error("db error");
    Investment.findById.mockRejectedValue(error);
    const next = createMockNext();

    await InvestmentController.getInvestmentById({ params: { id: "1" } }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("InvestmentController.searchInvestment", () => {
  it("builds a regex/range filter from query params and defers to next via req.response", async () => {
    const sentinelQuery = { marker: "search-query" };
    Investment.find.mockReturnValue(sentinelQuery);
    const req = {
      query: { name: "fund", category: "Stocks", minValue: "1000", maxValue: "5000" },
    };
    const next = createMockNext();

    await InvestmentController.searchInvestment(req, {}, next);

    expect(Investment.find).toHaveBeenCalledWith({
      name: { $regex: "fund", $options: "i" },
      category: "Stocks",
      value: { $gte: "1000", $lte: "5000" },
    });
    expect(req.response).toBe(sentinelQuery);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("InvestmentController.updateInvestment", () => {
  it("responds with 200 and a confirmation message when the investment exists", async () => {
    Investment.findByIdAndUpdate.mockResolvedValue({ _id: "1" });
    const res = createMockRes();

    await InvestmentController.updateInvestment(
      { params: { id: "1" }, body: { name: "New name" } },
      res,
      createMockNext()
    );

    expect(Investment.findByIdAndUpdate).toHaveBeenCalledWith("1", { name: "New name" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Investment updated!" });
  });

  it("calls next with NotFound when the investment does not exist", async () => {
    Investment.findByIdAndUpdate.mockResolvedValue(null);
    const next = createMockNext();

    await InvestmentController.updateInvestment(
      { params: { id: "missing" }, body: {} },
      createMockRes(),
      next
    );

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when the update throws", async () => {
    const error = new Error("validation failed");
    Investment.findByIdAndUpdate.mockRejectedValue(error);
    const next = createMockNext();

    await InvestmentController.updateInvestment({ params: { id: "1" }, body: {} }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("InvestmentController.insertInvestment", () => {
  it("responds with 201 and the created investment", async () => {
    const created = { _id: "1", name: "Index Fund" };
    Investment.create.mockResolvedValue(created);
    const res = createMockRes();

    await InvestmentController.insertInvestment({ body: { name: "Index Fund" } }, res, createMockNext());

    expect(Investment.create).toHaveBeenCalledWith({ name: "Index Fund" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Investment created successfully",
      income: created,
    });
  });

  it("calls next with the error when create throws", async () => {
    const error = new Error("validation failed");
    Investment.create.mockRejectedValue(error);
    const next = createMockNext();

    await InvestmentController.insertInvestment({ body: {} }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("InvestmentController.deleteInvestment", () => {
  it("responds with 200 and a confirmation message when the investment exists", async () => {
    Investment.findByIdAndDelete.mockResolvedValue({ _id: "1" });
    const res = createMockRes();

    await InvestmentController.deleteInvestment({ params: { id: "1" } }, res, createMockNext());

    expect(Investment.findByIdAndDelete).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Investment deleted!" });
  });

  it("calls next with NotFound when the investment does not exist", async () => {
    Investment.findByIdAndDelete.mockResolvedValue(null);
    const next = createMockNext();

    await InvestmentController.deleteInvestment({ params: { id: "missing" } }, createMockRes(), next);

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when the delete throws", async () => {
    const error = new Error("db error");
    Investment.findByIdAndDelete.mockRejectedValue(error);
    const next = createMockNext();

    await InvestmentController.deleteInvestment({ params: { id: "1" } }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
