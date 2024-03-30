import { Document, Schema, model, models } from "mongoose";

export interface IIngredient extends Document {
  name: string;
  unit: "g" | "ml" | "pcs";
}

const IngredientSchema = new Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
});

const Ingredient = models?.Ingredient || model("Ingredient", IngredientSchema);

export default Ingredient;
