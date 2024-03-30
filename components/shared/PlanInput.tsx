"use client";

import { Days } from "@/types";
import { Input } from "../ui/input";
import DayPicker from "./DayPicker";
import { useEffect, useState } from "react";
import { IDish } from "@/lib/database/models/dish.model";
import { searchDishes } from "@/lib/actions/dish.actions";
import Image from "next/image";
import { createPlan } from "@/lib/actions/plan.actions";

const PlanInput = () => {
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [day, setDay] = useState<Days>("Monday");

  useEffect(() => {
    const fetchDishes = async () => {
      const newDishes = await searchDishes(query);
      setDishes(newDishes);
    };
    fetchDishes();
  }, [query]);

  const addDishToPlan = async (dish: IDish) => {
    const result = await createPlan(dish._id, day);
  };

  return (
    <div className="relative">
      <div className="flex relative">
        <Input
          className="flex-1 h-full mr-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
        />
        <DayPicker day={day} setDay={setDay} />
      </div>
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
  );
};
export default PlanInput;
