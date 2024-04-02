import { getAllPlansWithDishes } from "@/lib/actions/plan.actions";
import { days } from "@/lib/constants";
import PlanDishCard from "./PlanDishCard";

const PlanDisplay = async () => {
  const plans = await getAllPlansWithDishes();

  return (
    <div className="flex flex-col w-full mt-20 xl:mt-24">
      {days.map((day) => {
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
                    <PlanDishCard planId={plan._id} dish={plan.dish} />
                  ))}
                  <div className="w-full flex justify-end gap-2">
                    <p>{totalMacros.calories}kcal</p>
                    <p className="text-muted-foreground">
                      {totalMacros.protein}P
                    </p>
                    <p className="text-muted-foreground">
                      {totalMacros.carbs}C
                    </p>
                    <p className="text-muted-foreground">{totalMacros.fat}F</p>
                  </div>
                </div>
              )}
            </div>
          </>
        );
      })}
    </div>
  );
};
export default PlanDisplay;
