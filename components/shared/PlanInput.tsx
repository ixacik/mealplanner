"use client";

import { Days } from "@/types";
import { Input } from "../ui/input";
import DayPicker from "./DayPicker";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { IDish } from "@/lib/database/models/dish.model";
import { searchDishes } from "@/lib/actions/dish.actions";
import Image from "next/image";
import { createPlan } from "@/lib/actions/plan.actions";
import { Loader2 } from "lucide-react";
import DishAlert from "./DishAlert";
import { set } from "mongoose";

type PlanInputProps = {
  setFetchTrigger: Dispatch<SetStateAction<boolean>>;
};

const PlanInput = ({ setFetchTrigger }: PlanInputProps) => {
  const [dishes, setDishes] = useState<IDish[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [day, setDay] = useState<Days>("Monday");
  const input = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [currentDishForConfirmation, setCurrentDishForConfirmation] =
    useState<IDish>({
      name: "",
      image: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      ingredients: [],
    });

  console.log(dishes);

  useEffect(() => {
    const fetchDishes = async () => {
      startTransition(async () => {
        const newDishes = await searchDishes(query);
        if (newDishes) setDishes(newDishes);
      });
    };
    fetchDishes();
  }, [query]);

  const addDishToPlan = async (dish: IDish) => {
    const result = await createPlan(dish._id!, day);

    setFetchTrigger((prev) => !prev);
  };

  const checkLocalStorage = (dish: IDish) => {
    let found = false;
    dish.ingredients.forEach((ingredient) => {
      const existsInStorage = localStorage.getItem(
        `checked_${ingredient.ingredient}`
      );
      if (existsInStorage) {
        setCurrentDishForConfirmation(dish);
        setDialogOpen(true);
        found = true;
      }
    });
    if (!found) addDishToPlan(dish);
  };

  return (
    <div className="relative">
      <DishAlert
        paramForFunction={currentDishForConfirmation!}
        functionToCall={addDishToPlan}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
      <div className="flex max-xl:flex-col-reverse gap-1 bg-bg-dark border-b shadow-lg border-white/5 fixed top-20 lg:top-0 left-0 lg:left-64 right-0 pt-6 lg:pt-12 py-6 px-4 md:px-8 lg:px-16 h-fit min-h-10">
        <div className="w-full relative">
          <Input
            className="flex-1 text-[16px]"
            value={query}
            ref={input}
            placeholder="Search for more dishes..."
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
              {isPending || dishes === null ? (
                <div className="w-full h-full flex items-center justify-center">
                  <Loader2 size={24} className="animate-spin" />
                </div>
              ) : (
                dishes.map((dish) => (
                  <div
                    key={dish._id}
                    className="flex items-center justify-between p-2 hover:bg-white/5 rounded-lg cursor-pointer"
                    onClick={() => checkLocalStorage(dish)}
                  >
                    <div className="flex gap-2 items-center">
                      <Image
                        src={dish.image || "/assets/images/placeholder.jpg"}
                        alt={dish.name}
                        width={33}
                        height={25}
                        className="rounded-lg"
                      />
                      <p className="line-clamp-1">{dish.name}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <p>{dish.calories}kcal</p>
                      <p className="text-muted-foreground">{dish.protein}P</p>
                      <p className="text-muted-foreground">{dish.carbs}C</p>
                      <p className="text-muted-foreground">{dish.fat}F</p>
                    </div>
                  </div>
                ))
              )}
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
