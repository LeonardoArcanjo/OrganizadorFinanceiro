import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../../src/Context/CreditCardExpense.js", () => ({
  creditCardExpense: {
    find: vi.fn(),
    findOne: vi.fn(),
    findById: vi.fn(),
    create: vi.fn(),
    findByIdAndUpdate: vi.fn(),
    findByIdAndDelete: vi.fn(),
  },
}));

import { creditCardExpense } from "../../src/Context/CreditCardExpense.js";
import CreditCardExpenseController from "../../src/Controllers/CreditCardExpenseController.js";
import NotFound from "../../src/Errors/NotFound.js";
import { createMockRes, createMockNext } from "../helpers/mockExpress.js";

beforeEach(() => {
  vi.resetAllMocks();
});

describe("CreditCardExpenseController.getAllCreditCardExpenses", () => {
  it("assigns the unresolved find() query to req.response and defers to next", () => {
    const sentinelQuery = { marker: "unresolved-query" };
    creditCardExpense.find.mockReturnValue(sentinelQuery);
    const req = {};
    const next = createMockNext();

    CreditCardExpenseController.getAllCreditCardExpenses(req, {}, next);

    expect(creditCardExpense.find).toHaveBeenCalledWith();
    expect(req.response).toBe(sentinelQuery);
    expect(next).toHaveBeenCalledTimes(1);
  });

  it("calls next with the error if find throws", () => {
    const error = new Error("boom");
    creditCardExpense.find.mockImplementation(() => {
      throw error;
    });
    const next = createMockNext();

    CreditCardExpenseController.getAllCreditCardExpenses({}, {}, next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("CreditCardExpenseController.getCCExpenseById", () => {
  it("responds with 200 and the credit card expense when found", async () => {
    const found = { _id: "1", bankName: "Nubank" };
    creditCardExpense.findById.mockResolvedValue(found);
    const res = createMockRes();

    await CreditCardExpenseController.getCCExpenseById({ params: { id: "1" } }, res, createMockNext());

    expect(creditCardExpense.findById).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(found);
  });

  it("calls next with NotFound when no credit card expense matches the id", async () => {
    creditCardExpense.findById.mockResolvedValue(null);
    const next = createMockNext();

    await CreditCardExpenseController.getCCExpenseById({ params: { id: "missing" } }, createMockRes(), next);

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when findById throws", async () => {
    const error = new Error("db error");
    creditCardExpense.findById.mockRejectedValue(error);
    const next = createMockNext();

    await CreditCardExpenseController.getCCExpenseById({ params: { id: "1" } }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("CreditCardExpenseController.searchCreditCardExpense", () => {
  it("builds a filter targeting the embedded expense fields and uses findOne, deferring to next via req.response", () => {
    const sentinelQuery = { marker: "search-query" };
    creditCardExpense.findOne.mockReturnValue(sentinelQuery);
    const req = {
      query: {
        bankName: "Nubank",
        name: "Laptop",
        category: "Electronics",
        minDate: "2026-01-01",
        maxDate: "2026-01-31",
      },
    };
    const next = createMockNext();

    CreditCardExpenseController.searchCreditCardExpense(req, {}, next);

    expect(creditCardExpense.findOne).toHaveBeenCalledWith({
      bankName: { $regex: "Nubank", $options: "i" },
      "expense.name": { $regex: "Laptop", $options: "i" },
      "expense.category": { $regex: "Electronics", $options: "i" },
      "expense.date": { $gte: "2026-01-01", $lte: "2026-01-31" },
    });
    expect(req.response).toBe(sentinelQuery);
    expect(next).toHaveBeenCalledTimes(1);
  });
});

describe("CreditCardExpenseController.updateCCExpensesById", () => {
  it("responds with 200 and a confirmation message when the credit card expense exists", async () => {
    creditCardExpense.findByIdAndUpdate.mockResolvedValue({ _id: "1" });
    const res = createMockRes();

    await CreditCardExpenseController.updateCCExpensesById(
      { params: { id: "1" }, body: { bankName: "Itau" } },
      res,
      createMockNext()
    );

    expect(creditCardExpense.findByIdAndUpdate).toHaveBeenCalledWith("1", { bankName: "Itau" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Credit Card Expense Updated!" });
  });

  it("calls next with NotFound when the credit card expense does not exist", async () => {
    creditCardExpense.findByIdAndUpdate.mockResolvedValue(null);
    const next = createMockNext();

    await CreditCardExpenseController.updateCCExpensesById(
      { params: { id: "missing" }, body: {} },
      createMockRes(),
      next
    );

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when the update throws", async () => {
    const error = new Error("validation failed");
    creditCardExpense.findByIdAndUpdate.mockRejectedValue(error);
    const next = createMockNext();

    await CreditCardExpenseController.updateCCExpensesById(
      { params: { id: "1" }, body: {} },
      createMockRes(),
      next
    );

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("CreditCardExpenseController.insertCCExpense", () => {
  it("responds with 201 and the created credit card expense", async () => {
    const created = { _id: "1", bankName: "Nubank" };
    creditCardExpense.create.mockResolvedValue(created);
    const res = createMockRes();

    await CreditCardExpenseController.insertCCExpense({ body: { bankName: "Nubank" } }, res, createMockNext());

    expect(creditCardExpense.create).toHaveBeenCalledWith({ bankName: "Nubank" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Credit Card Expense created!",
      creditCardExpense: created,
    });
  });

  it("calls next with the error when create throws", async () => {
    const error = new Error("validation failed");
    creditCardExpense.create.mockRejectedValue(error);
    const next = createMockNext();

    await CreditCardExpenseController.insertCCExpense({ body: {} }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});

describe("CreditCardExpenseController.deleteCCExpense", () => {
  it("responds with 200 and a confirmation message when the credit card expense exists", async () => {
    creditCardExpense.findByIdAndDelete.mockResolvedValue({ _id: "1" });
    const res = createMockRes();

    await CreditCardExpenseController.deleteCCExpense({ params: { id: "1" } }, res, createMockNext());

    expect(creditCardExpense.findByIdAndDelete).toHaveBeenCalledWith("1");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: "Credit Card Expense deleted!" });
  });

  it("calls next with NotFound when the credit card expense does not exist", async () => {
    creditCardExpense.findByIdAndDelete.mockResolvedValue(null);
    const next = createMockNext();

    await CreditCardExpenseController.deleteCCExpense({ params: { id: "missing" } }, createMockRes(), next);

    expect(next.mock.calls[0][0]).toBeInstanceOf(NotFound);
  });

  it("calls next with the error when the delete throws", async () => {
    const error = new Error("db error");
    creditCardExpense.findByIdAndDelete.mockRejectedValue(error);
    const next = createMockNext();

    await CreditCardExpenseController.deleteCCExpense({ params: { id: "1" } }, createMockRes(), next);

    expect(next).toHaveBeenCalledWith(error);
  });
});
