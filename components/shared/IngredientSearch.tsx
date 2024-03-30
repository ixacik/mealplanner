"use client";

import { Input } from "../ui/input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { searchIngredients } from "@/lib/actions/ingredient.actions";
import { IIngredient } from "@/lib/database/models/ingredient.model";
import { IngredientWithAmount } from "@/app/(root)/add-dish/page";

const IngredientSearch = ({
  setSelectedIngredients,
}: {
  setSelectedIngredients: Dispatch<SetStateAction<IngredientWithAmount[]>>;
}) => {
  const [results, setResults] = useState<IIngredient[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    const search = async () => {
      // TODO: add a debounce here
      const ingredients = await searchIngredients(query);
      setResults(ingredients);
    };
    search();
  }, [query]);

  return (
    <div className="bg-bg-light flex flex-col rounded-lg h-fit">
      <Input
        value={query}
        className={"rounded-none rounded-t-lg"}
        placeholder="Search for more ingredients"
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="h-[13.5em] p-2 flex flex-col">
        {results.map((ingredient) => (
          <div
            key={ingredient._id}
            onClick={() =>
              setSelectedIngredients((prev) => [
                ...prev,
                { ingredient, amount: 0 },
              ])
            }
            className="p-2 cursor-pointer hover:bg-white/5 rounded-lg"
          >
            {ingredient.name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default IngredientSearch;
