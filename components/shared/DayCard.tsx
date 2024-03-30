"use client";

import { IDish } from "@/lib/database/models/dish.model";

const DayCard = ({ day, dishes }: { day: string; dishes: IDish[] }) => {
  return (
    <div className="daycard">
      <div>{day}</div>
      <div className="flex flex-col items-center leading-none">
        <div>
          {dishes.length} {dishes.length === 1 ? "meal" : "meals"}
        </div>
        <div className="text-font-secondary">planned</div>
      </div>
    </div>
  );
};
export default DayCard;
