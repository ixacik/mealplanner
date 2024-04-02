"use server";

import { ObjectId } from "mongodb";
import { connectToDatabase } from "../database/mongoose";
import { Plan } from "../database/models";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";
import { IDish } from "../database/models/dish.model";
import { IIngredient } from "../database/models/ingredient.model";

export async function createPlan(dishId: string, day: string) {
  try {
    await connectToDatabase();

    const newPlan = await Plan.create({
      dish: new ObjectId(dishId),
      day: day,
    });
    revalidatePath("/");

    return newPlan;
  } catch (error) {
    handleError(error);
  }
}

// delete a plan by id
export async function deletePlan(id: string) {
  try {
    await connectToDatabase();

    const deletedPlan = await Plan.findByIdAndDelete(id)
      .populate<{ dish: IDish }>("dish")
      .lean();
    revalidatePath("/");

    return deletedPlan;
  } catch (error) {
    handleError(error);
  }
}

// get all plans
export async function getAllPlans() {
  try {
    await connectToDatabase();

    const plans = await Plan.find().lean();
    return JSON.parse(JSON.stringify(plans));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllPlansWithDishes() {
  try {
    await connectToDatabase();

    const plans = await Plan.find().populate("dish").lean();
    return JSON.parse(JSON.stringify(plans));
  } catch (error) {
    handleError(error);
  }
}

// get all plans with populated dish and populated ingredients
export async function getAllPlansWithDishAndIngredients() {
  try {
    await connectToDatabase();

    const plans = await Plan.find()
      .populate<{ dish: IDish }>({
        path: "dish",
        populate: {
          path: "ingredients.ingredient",
          model: "Ingredient",
        },
      })
      .lean();

    return plans;
  } catch (error) {
    handleError(error);
  }
}
