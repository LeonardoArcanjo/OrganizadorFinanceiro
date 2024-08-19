import { Expense } from "./Expense";

export class CreditCard extends Expense {
  constructor(
    name,
    value,
    category,
    isFixed,
    numberOfInstallments,
    BankingName
  ) {
    super(name, value, category, isFixed);
    this.numberOfInstallments = numberOfInstallments;
    this.BankingName = BankingName;
  }
}
