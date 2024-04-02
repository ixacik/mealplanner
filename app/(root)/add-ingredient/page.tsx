"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useToast } from "@/components/ui/use-toast";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { createIngredient } from "@/lib/actions/ingredient.actions";
import { capitalizeWords } from "@/lib/utils";
import Ingredient from "@/lib/database/models/ingredient.model";
import PageHeader from "@/components/shared/PageHeader";

const formSchema = z.object({
  name: z.string().min(3),
  unit: z.enum(["g", "ml", "pcs"]),
});

export default function AddIngredient() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      unit: "g",
    },
  });

  // TODO: add a return value from the server action to check for status and also if the ingredient already exists
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newIngredient = {
      name: capitalizeWords(values.name.trim().toLowerCase()),
      unit: values.unit,
    };

    // TODO: doesnt seem to work properly, always displays successful toast
    const response = await createIngredient(newIngredient);
    if (!response)
      toast({
        title: "Error adding ingredient",
        description:
          "There was an error while adding the ingredient. Please try again later.",
      });

    toast({
      title: "Ingredient added",
      description: `${newIngredient.name} was added successfully.`,
    });

    form.reset();
  }

  return (
    <div className="w-full">
      <PageHeader text="Add an Ingredient" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Name of Ingredient</FormLabel>
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
          <div className="flex justify-between gap-8 items-end">
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Unit of measure</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full bg-bg-light">
                        <SelectValue placeholder="Select one" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="g">Grams (g)</SelectItem>
                        <SelectItem value="ml">Milliliters (ml)</SelectItem>
                        <SelectItem value="pcs">Pieces (pcs)</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit">Create Ingredient</Button>
        </form>
      </Form>
    </div>
  );
}
