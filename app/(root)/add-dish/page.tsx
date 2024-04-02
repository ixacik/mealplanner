"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createDish } from "@/lib/actions/dish.actions";
import IngredientSearch from "@/components/shared/IngredientSearch";
import { useState } from "react";
import { IIngredient } from "@/lib/database/models/ingredient.model";
import { capitalizeWords } from "@/lib/utils";
import { X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3),
  kcal: z.string(),
  protein: z.string(),
  carbs: z.string(),
  fat: z.string(),
});

export type IngredientWithAmount = {
  ingredient: IIngredient;
  amount: string; // using string here to avoid janky inputs, converting to number when submitting
};

export default function Plan() {
  const [selectedIngredients, setSelectedIngredients] = useState<
    IngredientWithAmount[]
  >([]);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      kcal: "",
      protein: "",
      carbs: "",
      fat: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newDish = {
      image: "", // TODO: Add image upload source here
      name: capitalizeWords(values.name.trim().toLowerCase()),
      calories: Number(values.kcal),
      protein: Number(values.protein),
      carbs: Number(values.carbs),
      fat: Number(values.fat),
      ingredients: selectedIngredients.map((ingredient) => ({
        ingredientId: ingredient.ingredient._id,
        amount: Number(ingredient.amount),
      })),
    };

    // TODO: doesnt seem to work properly, always displays successful toast
    const response = await createDish(newDish);
    if (!response)
      toast({
        title: "Error adding dish",
        description:
          "There was an error while adding the dish. Please try again later.",
      });

    toast({
      title: "Dish added",
      description: `${newDish.name} was added successfully.`,
    });

    setSelectedIngredients([]);
    form.reset();
  }

  // dynamic ingredient fields
  const ingredientInputs = selectedIngredients.map((ingredient) => (
    <div
      key={ingredient.ingredient.name}
      className="bg-bg-light flex justify-between items-center px-4 py-2 rounded-lg"
    >
      <span className="w-full line-clamp-1">{ingredient.ingredient.name}</span>
      <Input
        type="number"
        className="max-w-32 bg-white/5" // Apply your input styling
        value={selectedIngredients.find((item) => item === ingredient)!.amount}
        onChange={(e) =>
          setSelectedIngredients((prev) =>
            prev.map((item) =>
              item === ingredient ? { ...item, amount: e.target.value } : item
            )
          )
        }
        placeholder="Amount"
      />
      <p className="ml-2 w-[2em]">{ingredient.ingredient.unit}</p>
      <X
        className="cursor-pointer text-red-500 ml-4"
        onClick={() =>
          setSelectedIngredients((prev) =>
            [...prev].filter((item) => item !== ingredient)
          )
        }
      />
    </div>
  ));

  return (
    <div className="w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-[-1rem]">
                <FormLabel>Name of Dish</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="shad-input"
                    placeholder="Lorem Ipsum"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-8">
            <FormField
              control={form.control}
              name="kcal"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Kcal</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="shad-input"
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="protein"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Protein (g)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="shad-input"
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="carbs"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Carbohydrates (g)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="shad-input"
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fat"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Fat (g)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      className="shad-input"
                      placeholder="0"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <IngredientSearch
            selectedIngredients={selectedIngredients}
            setSelectedIngredients={setSelectedIngredients}
          />

          <div className="flex flex-col gap-2">
            {selectedIngredients.length > 0 && <p>Selected ingredients:</p>}
            {ingredientInputs}
          </div>

          <Button type="submit">Create Dish</Button>
        </form>
      </Form>
    </div>
  );
}
