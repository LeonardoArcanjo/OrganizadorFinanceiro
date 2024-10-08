import mongoose from "mongoose";

const InvestimentSchema = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    category: { type: String, required: true },
    goal: { type: String, required: true },
  },
  { versionKey: false }
);

const investiment = mongoose.model("Investiment", InvestimentSchema);

export default investiment;
