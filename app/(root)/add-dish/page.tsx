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
  amount: number;
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
      kcal: "0",
      protein: "0",
      carbs: "0",
      fat: "0",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newDish = {
      name: capitalizeWords(values.name.trim().toLowerCase()),
      calories: Number(values.kcal),
      protein: Number(values.protein),
      carbs: Number(values.carbs),
      fat: Number(values.fat),
      ingredients: selectedIngredients.map((ingredient) => ({
        ingredientId: ingredient.ingredient._id,
        amount: ingredient.amount,
      })),
    };

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

    form.reset();
  }

  // dynamic ingredient fields
  const ingredientInputs = selectedIngredients.map((ingredient) => (
    <div
      key={ingredient.ingredient.name}
      className="bg-bg-light flex justify-between items-center p-4 rounded-lg"
    >
      <span className="w-full">{ingredient.ingredient.name}</span>
      <Input
        type="number"
        className="max-w-32 bg-white/5" // Apply your input styling
        placeholder="Amount"
      />
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
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 max-w-2xl"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of Dish</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between gap-8">
            <FormField
              control={form.control}
              name="kcal"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Kcal</FormLabel>
                  <FormControl>
                    <Input type="number" className="shad-input" {...field} />
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
                    <Input type="number" className="shad-input" {...field} />
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
                    <Input type="number" className="shad-input" {...field} />
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
                    <Input type="number" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {ingredientInputs}

          <IngredientSearch setSelectedIngredients={setSelectedIngredients} />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
