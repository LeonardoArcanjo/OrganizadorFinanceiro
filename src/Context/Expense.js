import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: {
      type: String,
      required: [true, "Name property value is required."],
    },
    value: {
      type: Number,
      required: [true, "Value property value is required"],
    },
    category: {
      type: String,
      required: [true, "Category property value is required"],
    },
    isFixed: { type: Boolean },
  },
  { versionKey: false }
);

const expense = mongoose.model("Expense", ExpenseSchema);

export { expense, ExpenseSchema };
