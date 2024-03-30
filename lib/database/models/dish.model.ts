import mongoose from "mongoose";
import { model, models } from "mongoose";

const DishSchema = new mongoose.Schema({
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

const Dish = models?.Dish || model("Dish", DishSchema);

export default Dish;
