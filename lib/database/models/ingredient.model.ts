import { Document, Model, Schema, model, models } from "mongoose";

export interface IIngredient {
  name: string;
  unit: "g" | "ml" | "pcs";
}

const IngredientSchema = new Schema<IIngredient>({
  name: { type: String, required: true },
  unit: { type: String, required: true },
});

const Ingredient: Model<IIngredient> =
  models.Ingredient || model<IIngredient>("Ingredient", IngredientSchema);

export default Ingredient;
