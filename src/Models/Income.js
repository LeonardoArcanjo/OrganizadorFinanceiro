import { FinanceObject } from "./FinanceObject";

export class Income extends FinanceObject {
  constructor(name, value, source) {
    super(name, value);
    this.source = source;
  }
}
