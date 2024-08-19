import FinanceObject from "./FinanceObject.js";

export class Expense extends FinanceObject {
  constructor(name, value, category, isFixed) {
    super(name, value);
    this.category = category;
    this.isFixed = isFixed;
  }
}
