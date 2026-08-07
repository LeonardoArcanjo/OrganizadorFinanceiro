import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/Context/Income.js", () => ({
  default: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

import income from "../../src/Context/Income.js";
import IncomeController from "../../src/Controllers/IncomeController.js";
import NotFound from "../../src/Errors/NotFound.js";
import { createMockRes, createMockNext } from "../helpers/mockExpress.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("IncomeController.getAllIncomes", () => {
  it("assigns the unresolved find() query to req.response and defers to next", async () => {
    const sentinelQuery = { marker: "unresolved-query" };
    income.find.mockReturnValue(sentinelQuery);
    const req = {};
    const next = createMockNext();

    await IncomeController.getAllIncomes(req, {}, next);

    expect(income.find).toHaveBeenCalledWith();
    expect(req.response).toBe(sentinelQuery);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("calls next with the error if find throws", async () => {
    const error = new Error("boom");
    income.find.mockImplementation(() => {
      throw error;
    });
    const next = createMockNext();

    await IncomeController.getAllIncomes({}, {}, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("IncomeController.getIncomeById", () => {
  it("responds with 200 and the income when found", async () => {
    const foundIncome = { _id: "1", name: "Salary" };
    income.findById.mockResolvedValue(foundIncome);
    const res = createMockRes();

    await IncomeController.getIncomeById({ params: { id: "1" } }, res, createMockNext());

    expect(income.findById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(foundIncome);
  });

  it("calls next with NotFound when no income matches the id", async () => {
    income.findById.mockResolvedValue(null);
    const next = createMockNext();

    await IncomeController.getIncomeById({ params: { id: "missing" } }, createMockRes(), next);

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when findById throws", async () => {
    const error = new Error("db error");
    income.findById.mockRejectedValue(error);
    const next = createMockNext();

    await IncomeController.getIncomeById({ params: { id: "1" } }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("IncomeController.searchIncome", () => {
  it("builds a regex/range filter from query params and defers to next via req.response", async () => {
    const sentinelQuery = { marker: "search-query" };
    income.find.mockReturnValue(sentinelQuery);
    const req = {
      query: { name: "sal", category: "Job", minValue: "100", maxValue: "200" },
    };
    const next = createMockNext();

    await IncomeController.searchIncome(req, {}, next);

    expect(income.find).toHaveBeenCalledWith({
      name: { $regex: "sal", $options: "i" },
      category: "Job",
      value: { $gte: "100", $lte: "200" },
    });
    expect(req.response).toBe(sentinelQuery);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("IncomeController.updateIncome", () => {
  it("responds with 200 and a confirmation message when the income exists", async () => {
    income.findByIdAndUpdate.mockResolvedValue({ _id: "1" });
    const res = createMockRes();

    await IncomeController.updateIncome(
      { params: { id: "1" }, body: { name: "New name" } },
      res,
      createMockNext()
    );

    expect(income.findByIdAndUpdate).toHaveBeenCalledWith("1", { name: "New name" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Income Updated!" });
  });

  it("calls next with NotFound when the income does not exist", async () => {
    income.findByIdAndUpdate.mockResolvedValue(null);
    const next = createMockNext();

    await IncomeController.updateIncome({ params: { id: "missing" }, body: {} }, createMockRes(), next);

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when the update throws", async () => {
    const error = new Error("validation failed");
    income.findByIdAndUpdate.mockRejectedValue(error);
    const next = createMockNext();

    await IncomeController.updateIncome({ params: { id: "1" }, body: {} }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("IncomeController.insertIncome", () => {
  it("responds with 201 and the created income", async () => {
    const created = { _id: "1", name: "Salary" };
    income.create.mockResolvedValue(created);
    const res = createMockRes();

    await IncomeController.insertIncome({ body: { name: "Salary" } }, res, createMockNext());

    expect(income.create).toHaveBeenCalledWith({ name: "Salary" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Income created successfully",
      income: created,
    });
  });

  it("calls next with the error when create throws", async () => {
    const error = new Error("validation failed");
    income.create.mockRejectedValue(error);
    const next = createMockNext();

    await IncomeController.insertIncome({ body: {} }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("IncomeController.deleteIncome", () => {
  it("responds with 200 and a confirmation message when the income exists", async () => {
    income.findByIdAndDelete.mockResolvedValue({ _id: "1" });
    const res = createMockRes();

    await IncomeController.deleteIncome({ params: { id: "1" } }, res, createMockNext());

    expect(income.findByIdAndDelete).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Income deleted!" });
  });

  it("calls next with NotFound when the income does not exist", async () => {
    income.findByIdAndDelete.mockResolvedValue(null);
    const next = createMockNext();

    await IncomeController.deleteIncome({ params: { id: "missing" } }, createMockRes(), next);

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when the delete throws", async () => {
    const error = new Error("db error");
    income.findByIdAndDelete.mockRejectedValue(error);
    const next = createMockNext();

    await IncomeController.deleteIncome({ params: { id: "1" } }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
