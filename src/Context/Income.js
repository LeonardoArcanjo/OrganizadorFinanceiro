import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const IncomeSchema = new Schema(
  {
    id: { type: Types.ObjectId },
    name: {
      type: String,
      required: [true, "Name property value is required"],
    },
    value: {
      type: Number,
      min: [
        0,
        "The min value for the property is required and must be greater or equal to 0",
      ],
      required: [true, "Value property value is required"],
    },
    category: {
      type: String,
      required: [true, "The category property value is required"],
    },
  },
  { versionKey: false }
);

const income = mongoose.model("Income", IncomeSchema);

export default income;
