import mongoose, { Types } from "mongoose";
import { CreditCardExpenseSchema } from "./CreditCardExpense.js";
const { Schema } = mongoose;

const CreditCardBillSchema = new Schema(
  {
    id: { type: Types.ObjectId },
    month: {
      type: String,
      required: [true, "month property value is required."],
    },
    year: {
      type: String,
      required: [true, "year property value is required."],
    },
    closeDate: {
      type: Date,
      required: [true, "closeDate property value is required."],
    },
    openDate: {
      type: Date,
      required: [true, "openDate property value is required."],
    },
    value: {
      type: Number,
      min: [
        0,
        "the minimum value for value property must be equal or greater than 0",
      ],
      required: [true, "value property value is required."],
    },
    dueDate: {
      type: Date,
      required: [true, "dueDate property value is required."],
    },
    expenseList: [CreditCardExpenseSchema],
  },
  { versionKey: false }
);

const CreditCardBill = mongoose.model("CreditCardBill", CreditCardBillSchema);

export default CreditCardBill;
