"use client";

import Image from "next/image";

export type MealCardProps = {
  image: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
};

const MealCard = ({
  image,
  name,
  calories,
  protein,
  carbs,
  fat,
}: MealCardProps) => {
  return (
    <div className="meal-card">
      <Image
        src={image ? image : "/assets/images/placeholder.jpg"}
        alt="teriyaki chicken"
        width={200}
        height={200}
        className="size-full"
        draggable={false}
      />
      <div className="p-4 space-y-4">
        <h6>{name}</h6>
        <div className="flex justify-between items-center">
          <p>{calories}kcal</p>
          <p className="text-muted-foreground">{protein}P</p>
          <p className="text-muted-foreground">{carbs}C</p>
          <p className="text-muted-foreground">{fat}F</p>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
