import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    category: { type: String, required: true },
    isFixed: { type: Boolean },
  },
  { versionKey: false }
);

const expense = mongoose.model("Expense", ExpenseSchema);

export default FinanceContext;
