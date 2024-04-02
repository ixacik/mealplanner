import { Schema, models, model, Model } from "mongoose";

export interface IPlan {
  _id?: string;
  dish: Schema.Types.ObjectId;
  day: string;
  createdAt: Date;
}

export interface IPlansWithDishes {
  _id?: string;
  dish: {
    _id: string;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    ingredients: {
      ingredient: {
        _id: string;
        name: string;
        unit: string;
      };
      amount: number;
    }[];
  };
  day: string;
}

const PlanSchema = new Schema<IPlan>({
  dish: { type: Schema.Types.ObjectId, ref: "Dish" },
  day: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Plan: Model<IPlan> = models.Plan || model<IPlan>("Plan", PlanSchema);

export default Plan;
