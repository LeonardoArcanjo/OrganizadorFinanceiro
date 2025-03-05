import mongoose, { Types } from "mongoose";
import { ExpenseSchema } from "./Expense.js";
const { Schema } = mongoose;

const CreditCardExpenseSchema = new Schema(
  {
    id: { type: Types.ObjectId },
    bankName: {
      type: String,
      required: [true, "Bank Name value is required."],
    },
    installments: {
      type: Number,
      required: [true, "Number of Installments are required."],
    },
    expense: ExpenseSchema,
  },
  { versionKey: false }
);

const creditCardExpense = mongoose.model(
  "CreditCardExpense",
  CreditCardExpenseSchema
);

export { creditCardExpense, CreditCardExpenseSchema };
