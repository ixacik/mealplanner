"use client";

import { deletePlan, getAllPlansWithDishes } from "@/lib/actions/plan.actions";
import { days } from "@/lib/constants";
import PlanDishCard from "./PlanDishCard";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import DishAlert from "./DishAlert";
import { IPlansWithDishes } from "@/lib/database/models/plan.model";

type PlanDisplayProps = {
  fetchTrigger: boolean;
  setFetchTrigger: Dispatch<SetStateAction<boolean>>;
};

const PlanDisplay = ({ fetchTrigger, setFetchTrigger }: PlanDisplayProps) => {
  const [plans, setPlans] = useState<IPlansWithDishes[] | null>();
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [currentPlanIdToRemove, setCurrentPlanIdToRemove] =
    useState<string>("");

  useEffect(() => {
    const fetchDisplays = async () => {
      const fetchedPlans = await getAllPlansWithDishes();
      setPlans(fetchedPlans);
    };
    fetchDisplays();
  }, [fetchTrigger]);

  const deleteEntry = async (id: string) => {
    const result = await deletePlan(id);
    setFetchTrigger((prev) => !prev);
  };

  const checkLocalStorage = (planId: string) => {
    let exists = false;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith("checked")) {
        exists = true;
      }
    }
    if (exists) {
      setCurrentPlanIdToRemove(planId);
      setDialogOpen(true);
    } else {
      deleteEntry(planId);
    }
  };

  return (
    <div className="flex flex-col w-full mt-20 xl:mt-24">
      <DishAlert
        onOpenChange={setDialogOpen}
        open={dialogOpen}
        functionToCall={deleteEntry}
        paramForFunction={currentPlanIdToRemove}
      />
      {plans ? (
        days.map((day) => {
          const plansForDay = plans.filter((plan) => plan.day === day);
          const totalMacros = plansForDay.reduce(
            (acc, plan) => {
              const { calories, protein, carbs, fat } = plan.dish;
              acc.calories += calories;
              acc.protein += protein;
              acc.carbs += carbs;
              acc.fat += fat;
              return acc;
            },
            { calories: 0, protein: 0, carbs: 0, fat: 0 }
          );
          return (
            <>
              <div className="mt-10">
                <h1 className="mb-2">{day}</h1>
                {plansForDay.length === 0 ? (
                  <p className="text-muted-foreground">No plans for this day</p>
                ) : (
                  <div className="w-full flex flex-col gap-2">
                    {plansForDay.map((plan) => (
                      <PlanDishCard
                        planId={plan._id!}
                        checkLocalStorage={checkLocalStorage}
                        dish={plan.dish}
                      />
                    ))}
                    <div className="w-full flex justify-end gap-2">
                      <p>{totalMacros.calories}kcal</p>
                      <p className="text-muted-foreground">
                        {totalMacros.protein}P
                      </p>
                      <p className="text-muted-foreground">
                        {totalMacros.carbs}C
                      </p>
                      <p className="text-muted-foreground">
                        {totalMacros.fat}F
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </>
          );
        })
      ) : (
        <div className="w-full h-dvh flex items-center justify-center">
          <Loader2 size={24} className="animate-spin" />
        </div>
      )}
    </div>
  );
};
export default PlanDisplay;
