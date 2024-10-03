import mongoose, { Types } from "mongoose";
import { ExpenseSchema } from "./Expense.js";
const { Schema } = mongoose;

const CreditCardSchema = new Schema(
  {
    id: { type: Types.ObjectId },
    bankName: { type: String, required: true },
    installments: { type: Number, required },
    expense: ExpenseSchema,
  },
  { versionKey: false }
);

const creditCard = mongoose.model("CreditCard", CreditCardSchema);

export default creditCard;
