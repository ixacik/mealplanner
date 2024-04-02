"use client";

import { Days } from "@/types";
import { Dispatch, SetStateAction } from "react";

const daysOfWeek: Days[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DayPicker = ({
  day,
  setDay,
}: {
  day: Days;
  setDay: Dispatch<SetStateAction<Days>>;
}) => {
  return (
    <div className="flex gap-1">
      {daysOfWeek.map((currentDay) => (
        <button
          key={currentDay}
          onClick={() => setDay(currentDay)}
          className={`bg-bg-light rounded-lg w-full xl:w-12 h-8 xl:h-full ${
            day === currentDay ? " bg-lime-500" : ""
          }`}
        >
          {currentDay.slice(0, 3)}
        </button>
      ))}
    </div>
  );
};
export default DayPicker;
