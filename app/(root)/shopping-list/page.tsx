import PageHeader from "@/components/shared/PageHeader";
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
  const plans =
    (await getAllPlansWithDishAndIngredients()) as unknown as Plan[];

  // Step 1: Aggregate ingredients
  const aggregatedIngredientsMap = aggregateIngredients(plans);

  // Step 2: Convert to an array
  const ingredientsArray = aggregatedIngredientsArray(aggregatedIngredientsMap);

  return (
    <div>
      <PageHeader text="Shopping List" />
      <div className="flex flex-col gap-2">
        {ingredientsArray.length > 0 ? (
          ingredientsArray.map(({ id, name, amount, unit }) => (
            <ShoppingListItem
              key={id}
              id={id}
              name={name}
              amount={amount}
              unit={unit}
            />
          ))
        ) : (
          <>
            <h3 className="font-medium">You haven't planned anything</h3>
            <p className="text-muted-foreground">
              Plan meals in the overview tab to display shopping list items.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
