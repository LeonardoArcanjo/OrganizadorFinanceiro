import { describe, it, expect } from "vitest";
import { creditCardExpense } from "../../src/Context/CreditCardExpense.js";

const validData = {
  bankName: "Nubank",
  installments: 3,
  expense: {
    name: "Laptop",
    value: 3000,
    category: "Electronics",
    isFixed: false,
    date: new Date("2026-01-01"),
  },
};

describe("CreditCardExpense schema validation", () => {
  it("passes validation with all fields present and valid", () => {
    const doc = new creditCardExpense(validData);
    expect(doc.validateSync()).toBeUndefined();
  });

  it("requires bankName", () => {
    const doc = new creditCardExpense({ ...validData, bankName: undefined });
    const error = doc.validateSync();
    expect(error.errors.bankName.message).toBe("Bank Name value is required.");
  });

  it("requires installments", () => {
    const doc = new creditCardExpense({ ...validData, installments: undefined });
    const error = doc.validateSync();
    expect(error.errors.installments.message).toBe(
      "Number of Installments are required."
    );
  });

  it("propagates validation errors from the embedded expense subdocument", () => {
    const doc = new creditCardExpense({
      ...validData,
      expense: { ...validData.expense, name: undefined },
    });
    const error = doc.validateSync();
    expect(error.errors["expense.name"].message).toBe(
      "Name property value is required."
    );
  });

  it("rejects a negative embedded expense value", () => {
    const doc = new creditCardExpense({
      ...validData,
      expense: { ...validData.expense, value: -1 },
    });
    const error = doc.validateSync();
    expect(error.errors["expense.value"].message).toBe(
      "The min value for the value property must be greater or equal to 0"
    );
  });
});
