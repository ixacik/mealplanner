import { getAllPlans, getAllPlansWithDishes } from "@/lib/actions/plan.actions";
import { days } from "@/lib/constants";
import PlanDishCard from "./PlanDishCard";

const PlanDisplay = async () => {
  const plans = await getAllPlansWithDishes();

  return (
    <div className="flex flex-col w-full">
      {days.map((day) => {
        const plansForDay = plans.filter((plan) => plan.day === day);
        return (
          <div className="mt-12">
            <h1 className="mb-2">{day}</h1>
            {plansForDay.length === 0 ? (
              <p>No plans for this day</p>
            ) : (
              <div className="w-full flex flex-col gap-2">
                {plansForDay.map((plan) => (
                  <PlanDishCard planId={plan._id} dish={plan.dish} />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
export default PlanDisplay;
