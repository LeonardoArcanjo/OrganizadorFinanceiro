import { describe, it, expect } from "vitest";
import investment from "../../src/Context/Investment.js";

const validData = {
  name: "Index Fund",
  value: 1000,
  category: "Stocks",
  goal: "Retirement",
};

describe("Investment schema validation", () => {
  it("passes validation with all fields present and valid", () => {
    const doc = new investment(validData);
    expect(doc.validateSync()).toBeUndefined();
  });

  it("requires name", () => {
    const doc = new investment({ ...validData, name: undefined });
    const error = doc.validateSync();
    expect(error.errors.name.message).toBe("Name property value is required.");
  });

  it("requires value", () => {
    const doc = new investment({ ...validData, value: undefined });
    const error = doc.validateSync();
    expect(error.errors.value.message).toBe(
      "Investment value property is required."
    );
  });

  it("rejects a negative value", () => {
    const doc = new investment({ ...validData, value: -1 });
    const error = doc.validateSync();
    expect(error.errors.value.message).toBe(
      "The min value for the property is required and must be greater or equal to 0."
    );
  });

  it("requires category", () => {
    const doc = new investment({ ...validData, category: undefined });
    const error = doc.validateSync();
    expect(error.errors.category.message).toBe("Category is required.");
  });

  it("requires goal", () => {
    const doc = new investment({ ...validData, goal: undefined });
    const error = doc.validateSync();
    expect(error.errors.goal.message).toBe("Goal property is required.");
  });
});
