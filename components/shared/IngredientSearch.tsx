"use client";

import { Input } from "../ui/input";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { searchIngredients } from "@/lib/actions/ingredient.actions";
import { IIngredient } from "@/lib/database/models/ingredient.model";
import { IngredientWithAmount } from "@/app/(root)/add-dish/page";
import { Loader, Loader2 } from "lucide-react";

const IngredientSearch = ({
  selectedIngredients,
  setSelectedIngredients,
}: {
  selectedIngredients: IngredientWithAmount[];
  setSelectedIngredients: Dispatch<SetStateAction<IngredientWithAmount[]>>;
}) => {
  const [results, setResults] = useState<IIngredient[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  useEffect(() => {
    const search = async () => {
      startTransition(async () => {
        const ingredients = await searchIngredients(query);
        setResults(ingredients);
      });
    };
    search();
  }, [query]);

  return (
    <>
      <div className="bg-bg-light flex flex-col rounded-lg h-fit">
        <Input
          value={query}
          className={"rounded-none rounded-t-lg"}
          placeholder="Search for more ingredients..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="h-[13.5em] p-2 flex flex-col">
          {isPending || results === null ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 size={24} className="animate-spin" />
            </div>
          ) : results.length > 0 ? (
            results.map((ingredient) => (
              <div
                key={ingredient._id}
                onClick={() => {
                  setError("");
                  if (
                    selectedIngredients.find(
                      (item) => item.ingredient._id === ingredient._id
                    )
                  ) {
                    setError("Ingredient already selected");
                    return; // ingredient already selected
                  }
                  setSelectedIngredients((prev) => [
                    ...prev,
                    { ingredient, amount: "" },
                  ]);
                }}
                className="p-2 cursor-pointer hover:bg-white/5 rounded-lg line-clamp-1"
              >
                {ingredient.name}
              </div>
            ))
          ) : (
            <div className="p-2 text-muted-foreground">No results found</div>
          )}
        </div>
      </div>
      {error && <p className="text-red-500 p-2">{error}</p>}
    </>
  );
};
export default IngredientSearch;
