import { describe, it, expect } from "vitest";
import income from "../../src/Context/Income.js";

const validData = {
  name: "Salary",
  value: 5000,
  category: "Job",
};

describe("Income schema validation", () => {
  it("passes validation with all fields present and valid", () => {
    const doc = new income(validData);
    expect(doc.validateSync()).toBeUndefined();
  });

  it("requires name", () => {
    const doc = new income({ ...validData, name: undefined });
    const error = doc.validateSync();
    expect(error.errors.name.message).toBe("Name property value is required");
  });

  it("requires value", () => {
    const doc = new income({ ...validData, value: undefined });
    const error = doc.validateSync();
    expect(error.errors.value.message).toBe("Value property value is required");
  });

  it("rejects a negative value", () => {
    const doc = new income({ ...validData, value: -1 });
    const error = doc.validateSync();
    expect(error.errors.value.message).toBe(
      "The min value for the property is required and must be greater or equal to 0"
    );
  });

  it("requires category", () => {
    const doc = new income({ ...validData, category: undefined });
    const error = doc.validateSync();
    expect(error.errors.category.message).toBe(
      "The category property value is required"
    );
  });
});
