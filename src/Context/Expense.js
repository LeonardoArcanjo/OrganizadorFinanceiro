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
      min: [
        0,
        "The min value for the value property must be greater or equal to 0",
      ],
      required: [true, "Value property value is required"],
    },
    category: {
      type: String,
      required: [true, "Category property value is required"],
    },
    isFixed: { type: Boolean, required: [true, "isFixed value is required"] },
  },
  { versionKey: false }
);

const expense = mongoose.model("Expense", ExpenseSchema);

export { expense, ExpenseSchema };
