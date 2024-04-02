"use client";

import { deletePlan } from "@/lib/actions/plan.actions";
import { X } from "lucide-react";
import Image from "next/image";

export type PlanDishCardProps = {
  planId: string;
  dish: {
    _id: string;
    name: string;
    image?: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  checkLocalStorage: (planId: string) => void;
};

const PlanDishCard = ({
  planId,
  dish,
  checkLocalStorage,
}: PlanDishCardProps) => {
  // check if we have any stored state inside shopping list
  return (
    <div className="bg-bg-light p-4 rounded-lg flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          src={dish.image || "/assets/images/placeholder.jpg"}
          alt={dish.name}
          width={64}
          height={64}
          className="rounded-lg"
        />
        <p>{dish.name}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="hidden sm:block">{dish.calories}kcal</p>
        <p className="text-muted-foreground hidden sm:block">{dish.protein}P</p>
        <p className="text-muted-foreground hidden sm:block">{dish.carbs}C</p>
        <p className="text-muted-foreground hidden sm:block">{dish.fat}F</p>
        <X
          size={24}
          className="text-red-500 cursor-pointer"
          onClick={() => checkLocalStorage(planId)}
        />
      </div>
    </div>
  );
};
export default PlanDishCard;
