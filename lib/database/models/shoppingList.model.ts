import { Model, Schema, model, models } from "mongoose";

export interface IShoppingList {
  ingredients: {
    ingredient: string;
    amount: number;
    checked?: boolean;
  }[];
}

const ShoppingListSchema = new Schema<IShoppingList>({
  ingredients: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: "Ingredient",
      },
      amount: Number,
      checked: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const ShoppingList: Model<IShoppingList> =
  models.ShoppingList ||
  model<IShoppingList>("ShoppingList", ShoppingListSchema);

export default ShoppingList;
