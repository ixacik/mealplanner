import { Schema, models, model } from "mongoose";

const PlanSchema = new Schema({
  dish: { type: Schema.Types.ObjectId, ref: "Dish" },
  day: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Plan = models.Plan || model("Plan", PlanSchema);

export default Plan;
