import mongoose, { Types } from "mongoose";
import { ExpenseSchema } from "./Expense.js";
const { Schema } = mongoose;

const CreditCardExpenseSchema = new Schema(
  {
    id: { type: Types.ObjectId },
    bankName: { type: String, required: true },
    installments: { type: Number, required: true },
    date: { type: Date, required: true },
    expense: ExpenseSchema,
  },
  { versionKey: false }
);

const CreditCardExpense = mongoose.model(
  "CreditCardExpense",
  CreditCardExpenseSchema
);

export { CreditCardExpense, CreditCardExpenseSchema };
