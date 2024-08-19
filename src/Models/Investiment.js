import { FinanceObject } from "./FinanceObject";

export class Investiment extends FinanceObject {
  constructor(name, value, goal) {
    super(name, value);
    this.goal = goal;
  }
}
