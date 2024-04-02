export type Days =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type Ingredient = {
  name: string;
  unit: "g" | "ml" | "pcs";
};

export type Dish = {
  name: string;
  ingredients: {
    ingredient: Ingredient;
    amount: number;
  }[];
};

export type PlanWithDishAndIngredients = {
  name: string;
  day: Days;
  dish: Dish;
};
