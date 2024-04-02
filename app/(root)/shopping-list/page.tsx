import ShoppingListItem from "@/components/shared/ShoppingListItem";
import { getAllPlansWithDishAndIngredients } from "@/lib/actions/plan.actions";

// ! clunky way to make this type safe
interface IngredientDetail {
  _id: string;
  name: string;
  unit: string;
}

interface Ingredient {
  ingredient: IngredientDetail;
  amount: number;
}

interface Dish {
  ingredients: Ingredient[];
}

interface Plan {
  dish: Dish;
}

interface IngredientAggregated {
  name: string;
  amount: number;
  unit: string;
}

interface IngredientAggregateMap {
  [key: string]: IngredientAggregated;
}

const aggregateIngredients = (plans: Plan[]): IngredientAggregateMap => {
  const allIngredients = plans.flatMap((plan) =>
    plan.dish.ingredients.map((ingredient) => ({
      id: ingredient.ingredient._id,
      name: ingredient.ingredient.name,
      amount: ingredient.amount,
      unit: ingredient.ingredient.unit,
    }))
  );

  return allIngredients.reduce<IngredientAggregateMap>(
    (acc, { id, name, amount, unit }) => {
      if (acc[id]) {
        acc[id].amount += amount;
      } else {
        acc[id] = { name, amount, unit };
      }
      return acc;
    },
    {}
  );
};

const aggregatedIngredientsArray = (
  aggregatedIngredientsMap: IngredientAggregateMap
) => {
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
      <div className="flex flex-col gap-2">
        {ingredientsArray.map(({ id, name, amount, unit }) => (
          <ShoppingListItem
            key={id}
            id={id}
            name={name}
            amount={amount}
            unit={unit}
          />
        ))}
      </div>
    </div>
  );
}
