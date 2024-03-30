import PlanDisplay from "@/components/shared/PlanDisplay";
import PlanInput from "@/components/shared/PlanInput";

export default async function Home() {
  return (
    <div>
      <PlanInput />
      <PlanDisplay />
    </div>
  );
}
