"use server";

import { ObjectId } from "mongodb";
import { connectToDatabase } from "../database/mongoose";
import { Plan } from "../database/models";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export async function createPlan(dishId: string, day: string) {
  try {
    await connectToDatabase();

    const newPlan = await Plan.create({
      dish: new ObjectId(dishId),
      day: day,
    });
    revalidatePath("/");
    return JSON.parse(JSON.stringify(newPlan));
  } catch (error) {
    handleError(error);
  }
}

// delete a plan by id
export async function deletePlan(id: string) {
  try {
    await connectToDatabase();

    const deletedPlan = await Plan.findByIdAndDelete(id);
    revalidatePath("/");
    return JSON.parse(JSON.stringify(deletedPlan));
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
      .populate({
        path: "dish",
        populate: {
          path: "ingredients.ingredient",
        },
      })
      .lean();

    return plans;
  } catch (error) {
    handleError(error);
  }
}
