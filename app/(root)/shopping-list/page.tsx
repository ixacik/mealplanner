import { getAllPlansWithDishAndIngredients } from "@/lib/actions/plan.actions";

export default async function ShoppingList() {
  const plans = await getAllPlansWithDishAndIngredients();

  return <div></div>;
}
