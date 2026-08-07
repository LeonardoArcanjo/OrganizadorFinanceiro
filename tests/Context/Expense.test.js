import { describe, it, expect } from "vitest";
import { expense } from "../../src/Context/Expense.js";

const validData = {
  name: "Groceries",
  value: 100,
  category: "Food",
  isFixed: false,
  date: new Date("2026-01-01"),
};

describe("Expense schema validation", () => {
  it("passes validation with all fields present and valid", () => {
    const doc = new expense(validData);
    expect(doc.validateSync()).toBeUndefined();
  });

  it("requires name", () => {
    const doc = new expense({ ...validData, name: undefined });
    const error = doc.validateSync();
    expect(error.errors.name.message).toBe("Name property value is required.");
  });

  it("requires value", () => {
    const doc = new expense({ ...validData, value: undefined });
    const error = doc.validateSync();
    expect(error.errors.value.message).toBe("Value property value is required");
  });

  it("rejects a negative value", () => {
    const doc = new expense({ ...validData, value: -1 });
    const error = doc.validateSync();
    expect(error.errors.value.message).toBe(
      "The min value for the value property must be greater or equal to 0"
    );
  });

  it("requires category", () => {
    const doc = new expense({ ...validData, category: undefined });
    const error = doc.validateSync();
    expect(error.errors.category.message).toBe(
      "Category property value is required"
    );
  });

  it("requires isFixed", () => {
    const doc = new expense({ ...validData, isFixed: undefined });
    const error = doc.validateSync();
    expect(error.errors.isFixed.message).toBe("isFixed value is required");
  });

  it("requires date", () => {
    const doc = new expense({ ...validData, date: undefined });
    const error = doc.validateSync();
    expect(error.errors.date.message).toBe("Date is required.");
  });
});
