import mongoose from "mongoose";

const InvestmentSchema = new mongoose.Schema(
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
        "The min value for the property is required and must be greater or equal to 0.",
      ],
      required: [true, "Investment value property is required."],
    },
    category: { type: String, required: [true, "Category is required."] },
    goal: { type: String, required: [true, "Goal property is required."] },
  },
  { versionKey: false }
);

const investment = mongoose.model("Investment", InvestmentSchema);

export default investment;
