import { Schema, models, model, Model } from "mongoose";

export interface IPlan {
  dish: Schema.Types.ObjectId;
  day: string;
  createdAt: Date;
}

const PlanSchema = new Schema<IPlan>({
  dish: { type: Schema.Types.ObjectId, ref: "Dish" },
  day: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Plan: Model<IPlan> = models.Plan || model<IPlan>("Plan", PlanSchema);

export default Plan;
