"use client";

import { Days } from "@/types";
import { Input } from "../ui/input";
import DayPicker from "./DayPicker";
import { useEffect, useRef, useState } from "react";
import { IDish } from "@/lib/database/models/dish.model";
import { searchDishes } from "@/lib/actions/dish.actions";
import Image from "next/image";
import { createPlan } from "@/lib/actions/plan.actions";
import { updateShoppingList } from "@/lib/actions/shoppingList.actions";

const PlanInput = () => {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [day, setDay] = useState<Days>("Monday");
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchDishes = async () => {
      const newDishes = await searchDishes(query);
      setDishes(newDishes);
    };
    fetchDishes();
  }, [query]);

  const addDishToPlan = async (dish: IDish) => {
    console.log(dish);
    const result = await createPlan(dish._id, day);
    if (result) {
      await updateShoppingList(dish.ingredients);
    }
  };

  return (
    <div className="relative">
      <div className="flex max-xl:flex-col-reverse gap-1 bg-bg-dark border-b shadow-lg border-white/5 fixed top-20 lg:top-0 left-0 lg:left-64 right-0 pt-6 lg:pt-12 py-6 px-4 md:px-8 lg:px-16 h-fit min-h-10">
        <div className="w-full relative">
          <Input
            className="flex-1"
            value={query}
            ref={input}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                input.current?.blur();
              }
            }}
          />
          {isFocused && (
            <div className="absolute top-full mt-2 left-0 w-full bg-bg-light rounded-lg p-2 shadow-lg border border-white/10">
              {dishes.map((dish) => (
                <div
                  key={dish._id}
                  className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                  onClick={() => addDishToPlan(dish)}
                >
                  <div className="flex gap-2 items-center">
                    <Image
                      src={dish.image || "/assets/images/placeholder.jpg"}
                      alt={dish.name}
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                    {dish.name}
                  </div>
                  <div className="flex gap-2 items-center">
                    <p>{dish.calories}kcal</p>
                    <p className="text-muted-foreground">{dish.protein}P</p>
                    <p className="text-muted-foreground">{dish.carbs}C</p>
                    <p className="text-muted-foreground">{dish.fat}F</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <DayPicker day={day} setDay={setDay} />
      </div>
      {/* Maybe make the dropdown relative to the input itself */}
    </div>
  );
};
export default PlanInput;
