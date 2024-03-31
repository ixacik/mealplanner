import { getAllPlansWithDishAndIngredients } from "@/lib/actions/plan.actions";

// TODO: Make this type safe
const aggregateIngredients = (plans) => {
  const allIngredients = plans.flatMap((plan) =>
    plan.dish.ingredients.map((ingredient) => ({
      id: ingredient.ingredient._id,
      name: ingredient.ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.ingredient.unit,
    }))
  );

  return allIngredients.reduce((acc, { id, name, amount, unit }) => {
    if (acc[id]) {
      acc[id].amount += amount;
    } else {
      acc[id] = { name, amount, unit };
    }
    return acc;
  }, {});
};

const aggregatedIngredientsArray = (aggregatedIngredientsMap) => {
  return Object.entries(aggregatedIngredientsMap).map(
    ([id, { name, amount, unit }]) => ({
      id,
      name,
      amount,
      unit,
    })
  );
};

export default async function ShoppingList() {
  const plans = await getAllPlansWithDishAndIngredients();

  // Step 1: Aggregate ingredients
  const aggregatedIngredientsMap = aggregateIngredients(plans);

  // Step 2: Convert to an array
  const ingredientsArray = aggregatedIngredientsArray(aggregatedIngredientsMap);

  return (
    <div>
      <h1 className="text-xl mb-6">Shopping List</h1>
      <ul>
        {ingredientsArray.map(({ id, name, amount, unit }) => (
          <li key={id}>
            {name} - {amount}
            {unit}
          </li>
        ))}
        s
      </ul>
    </div>
  );
}
