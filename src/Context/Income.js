import mongoose, { Types } from "mongoose";
const { Schema } = mongoose;

const IncomeSchema = new Schema(
  {
    id: { type: Types.ObjectId },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    from: { type: String, required: true },
  },
  { versionKey: false }
);

const income = mongoose.model("Income", IncomeSchema);

export default income;
