"use server";

import Ingredient from "../database/models/ingredient.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

// create ingredient
export async function createIngredient({ name, unit }: Ingredient) {
  try {
    await connectToDatabase();

    const newIngredient = await Ingredient.create({
      name,
      unit,
    });

    return JSON.parse(JSON.stringify(newIngredient));
  } catch (error) {
    handleError(error);
  }
}

// search ingredients
export async function searchIngredients(name: string) {
  try {
    await connectToDatabase();

    const ingredients = await Ingredient.find({
      name: { $regex: new RegExp(`.*${name}.*`, "i") },
    })
      .limit(5)
      .sort({ name: 1 })
      .lean();

    return JSON.parse(JSON.stringify(ingredients));
  } catch (error) {
    handleError(error);
  }
}

// get all ingredients
export async function getIngredients() {
  try {
    await connectToDatabase();

    const ingredients = await Ingredient.find();

    return JSON.parse(JSON.stringify(ingredients));
  } catch (error) {
    handleError(error);
  }
}
