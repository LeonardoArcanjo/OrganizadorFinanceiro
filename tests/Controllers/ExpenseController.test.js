import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/Context/Expense.js", () => ({
  expense: {
    find: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

import { expense } from "../../src/Context/Expense.js";
import ExpenseController from "../../src/Controllers/ExpenseController.js";
import NotFound from "../../src/Errors/NotFound.js";
import { createMockRes, createMockNext } from "../helpers/mockExpress.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("ExpenseController.getAllExpenses", () => {
  it("assigns the unresolved find() query to req.response and defers to next", () => {
    const sentinelQuery = { marker: "unresolved-query" };
    expense.find.mockReturnValue(sentinelQuery);
    const req = {};
    const next = createMockNext();

    ExpenseController.getAllExpenses(req, {}, next);

    expect(expense.find).toHaveBeenCalledWith();
    expect(req.response).toBe(sentinelQuery);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("calls next with the error if find throws", () => {
    const error = new Error("boom");
    expense.find.mockImplementation(() => {
      throw error;
    });
    const next = createMockNext();

    ExpenseController.getAllExpenses({}, {}, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("ExpenseController.getExpenseById", () => {
  it("responds with 200 and the expense when found", async () => {
    const foundExpense = { _id: "1", name: "Groceries" };
    expense.findById.mockResolvedValue(foundExpense);
    const res = createMockRes();
    const next = createMockNext();

    await ExpenseController.getExpenseById({ params: { id: "1" } }, res, next);

    expect(expense.findById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(foundExpense);
    expect(next).not.toHaveBeenCalled();
  });

  it("calls next with NotFound when no expense matches the id", async () => {
    expense.findById.mockResolvedValue(null);
    const next = createMockNext();

    await ExpenseController.getExpenseById({ params: { id: "missing" } }, createMockRes(), next);

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when findById throws", async () => {
    const error = new Error("db error");
    expense.findById.mockRejectedValue(error);
    const next = createMockNext();

    await ExpenseController.getExpenseById({ params: { id: "1" } }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("ExpenseController.searchExpense", () => {
  it("builds a regex/range filter from query params and defers to next via req.response", () => {
    const sentinelQuery = { marker: "search-query" };
    expense.find.mockReturnValue(sentinelQuery);
    const req = {
      query: { name: "abc", category: "Food", minValue: "10", maxValue: "20" },
    };
    const next = createMockNext();

    ExpenseController.searchExpense(req, {}, next);

    expect(expense.find).toHaveBeenCalledWith({
      name: { $regex: "abc", $options: "i" },
      category: "Food",
      value: { $gte: "10", $lte: "20" },
    });
    expect(req.response).toBe(sentinelQuery);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("ExpenseController.updateExpense", () => {
  it("responds with 200 and a confirmation message when the expense exists", async () => {
    expense.findByIdAndUpdate.mockResolvedValue({ _id: "1" });
    const res = createMockRes();

    await ExpenseController.updateExpense(
      { params: { id: "1" }, body: { name: "New name" } },
      res,
      createMockNext()
    );

    expect(expense.findByIdAndUpdate).toHaveBeenCalledWith("1", { name: "New name" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Expense updated!" });
  });

  it("calls next with NotFound when the expense does not exist", async () => {
    expense.findByIdAndUpdate.mockResolvedValue(null);
    const next = createMockNext();

    await ExpenseController.updateExpense(
      { params: { id: "missing" }, body: {} },
      createMockRes(),
      next
    );

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when the update throws", async () => {
    const error = new Error("validation failed");
    expense.findByIdAndUpdate.mockRejectedValue(error);
    const next = createMockNext();

    await ExpenseController.updateExpense(
      { params: { id: "1" }, body: {} },
      createMockRes(),
      next
    );

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("ExpenseController.insertExpense", () => {
  it("responds with 201 and the created expense", async () => {
    const created = { _id: "1", name: "Groceries" };
    expense.create.mockResolvedValue(created);
    const res = createMockRes();

    await ExpenseController.insertExpense({ body: { name: "Groceries" } }, res, createMockNext());

    expect(expense.create).toHaveBeenCalledWith({ name: "Groceries" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Inserted successfully",
      expense: created,
    });
  });

  it("calls next with the error when create throws", async () => {
    const error = new Error("validation failed");
    expense.create.mockRejectedValue(error);
    const next = createMockNext();

    await ExpenseController.insertExpense({ body: {} }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("ExpenseController.deleteExpenseById", () => {
  it("responds with 200 and a confirmation message when the expense exists", async () => {
    expense.findByIdAndDelete.mockResolvedValue({ _id: "1" });
    const res = createMockRes();

    await ExpenseController.deleteExpenseById({ params: { id: "1" } }, res, createMockNext());

    expect(expense.findByIdAndDelete).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "expense deleted!" });
  });

  it("calls next with NotFound when the expense does not exist", async () => {
    expense.findByIdAndDelete.mockResolvedValue(null);
    const next = createMockNext();

    await ExpenseController.deleteExpenseById({ params: { id: "missing" } }, createMockRes(), next);

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when the delete throws", async () => {
    const error = new Error("db error");
    expense.findByIdAndDelete.mockRejectedValue(error);
    const next = createMockNext();

    await ExpenseController.deleteExpenseById({ params: { id: "1" } }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
