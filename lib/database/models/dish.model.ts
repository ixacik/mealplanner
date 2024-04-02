import mongoose, { Model } from "mongoose";
import { model, models } from "mongoose";

export interface IDish {
  image: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: {
    ingredient: mongoose.Schema.Types.ObjectId;
    amount: number;
  }[];
}

const DishSchema = new mongoose.Schema<IDish>({
  image: String,
  name: String,
  calories: Number,
  protein: Number,
  carbs: Number,
  fat: Number,
  ingredients: [
    {
      _id: false,
      ingredient: { type: mongoose.Schema.Types.ObjectId, ref: "Ingredient" },
      amount: Number,
    },
  ],
});

const Dish: Model<IDish> = models.Dish || model<IDish>("Dish", DishSchema);

export default Dish;
