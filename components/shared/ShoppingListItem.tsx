"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";

type ShoppingListItemProps = {
  id: string;
  name: string;
  amount: number;
  unit: string;
};

const ShoppingListItem = ({
  id,
  name,
  amount,
  unit,
}: ShoppingListItemProps) => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    let storedChecked = localStorage.getItem(`checked_${id}`);
    if (storedChecked) {
      setChecked(JSON.parse(storedChecked));
    }
  }, []);

  const handleCheckboxChange = () => {
    localStorage.setItem(`checked_${id}`, JSON.stringify(!checked));
    setChecked((prev) => !prev);
  };

  return (
    <div
      className={`w-full p-4 rounded-lg ${
        checked ? "bg-bg-light/30" : "bg-bg-light"
      } flex justify-between items-center relative`}
    >
      {/* {checked && <div className="absolute bg-white h-[1px] left-12 right-4" />} */}
      <div className="flex items-center gap-4">
        <Checkbox checked={checked} onClick={handleCheckboxChange} />
        <p
          className={`${checked ? "text-white/50 line-through" : "text-white"}`}
        >
          {name}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <p
          className={`${checked ? "text-white/50 line-through" : "text-white"}`}
        >
          {amount} {unit}
        </p>
      </div>
    </div>
  );
};
export default ShoppingListItem;
