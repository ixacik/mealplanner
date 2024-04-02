"use server";

import { revalidatePath } from "next/cache";
import { IIngredient } from "../database/models/ingredient.model";
import ShoppingList from "../database/models/shoppingList.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// get shopping list
export async function getShoppingListWithIngredients() {
  try {
    await connectToDatabase();

    const shoppingList = await ShoppingList.findOne().populate<{
      ingredient: IIngredient;
    }>("ingredients.ingredient");

    return JSON.parse(JSON.stringify(shoppingList));
  } catch (error) {
    handleError(error);
  }
}

// update shopping list
export async function updateShoppingList(
  newIngredients: { ingredient: string; amount: number }[]
) {
  console.log("updateShoppingList");
  try {
    await connectToDatabase();

    let shoppingList = await ShoppingList.findOne(); // a user is never gonna have more than one shopping list

    if (!shoppingList) {
      // If the shopping list does not exist, create it with the provided ID and ingredients
      const createdShoppingList = await ShoppingList.create({
        ingredients: newIngredients,
      });
      return createdShoppingList;
    }

    // Update the shopping list with the new ingredients
    newIngredients.forEach((newIngredient) => {
      const index = shoppingList.ingredients.findIndex(
        (i) => i.ingredient.toString() === newIngredient.ingredient
      );

      if (index !== -1) {
        // If the ingredient exists, update its amount
        shoppingList.ingredients[index].amount += newIngredient.amount;
      } else {
        // If the ingredient does not exist, add it to the array
        shoppingList.ingredients.push(newIngredient);
      }
    });

    // Save the updates made to the shopping list
    revalidatePath("/shopping-list");
    await shoppingList.save();
  } catch (error) {
    handleError(error);
  }
}
