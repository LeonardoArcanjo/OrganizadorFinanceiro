import mongoose, { Types } from "mongoose";
import { CreditCardExpenseSchema } from "./CreditCard.js";
const { Schema } = mongoose;

const CreditCardBillSchema = new Schema(
  {
    id: { type: Types.ObjectId },
    month: { type: String, required: true },
    year: { type: String, required: true },
    closeDate: { type: Date, required: true },
    openDate: { type: Date, required: true },
    value: { type: Number, required: true },
    dueDate: { type: Date, required: true },
    expenseList: [CreditCardExpenseSchema],
  },
  { versionKey: false }
);

const CreditCardBill = mongoose.model("CreditCardBill", CreditCardBillSchema);

export default CreditCardBill;
