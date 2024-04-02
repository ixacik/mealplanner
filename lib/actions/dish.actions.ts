"use server";

import { Dish } from "../database/models";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";
import { ObjectId } from "mongodb";

export type CreateDishParams = {
  image?: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: {
    ingredientId: string;
    amount: number;
  }[];
};

export async function createDish(dish: CreateDishParams) {
  try {
    await connectToDatabase();
    const newDish = Dish.create({
      ...dish,
      image: dish.image || "",
      ingredients: dish.ingredients.map((ingredient) => ({
        ingredient: new ObjectId(ingredient.ingredientId),
        amount: ingredient.amount,
      })),
    });
    return JSON.parse(JSON.stringify(newDish));
  } catch (error) {
    handleError(error);
  }
}

// get all dishes
export async function getDishes() {
  try {
    await connectToDatabase();
    const dishes = await Dish.find().limit(5).sort({ name: 1 }).lean();
    return dishes;
  } catch (error) {
    handleError(error);
  }
}

// search dishes
export async function searchDishes(query: string) {
  try {
    await connectToDatabase();

    const dishes = await Dish.find({
      name: { $regex: new RegExp(query, "i") },
    })
      .limit(5)
      .sort({ name: 1 })
      .lean();
    return dishes;
  } catch (error) {
    handleError(error);
  }
}

//get dishes with ingredients populated
export async function getDishesWithIngredients() {
  try {
    await connectToDatabase();
    const dishes = await Dish.find().populate("ingredients").lean();
    return dishes;
  } catch (error) {
    handleError(error);
  }
}

// get dish by id
export async function getDishById(id: string) {
  try {
    await connectToDatabase();
    const dish = await Dish.findById(id).lean();
    return dish;
  } catch (error) {
    handleError(error);
  }
}
