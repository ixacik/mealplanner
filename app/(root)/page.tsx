"use client";

import PlanDisplay from "@/components/shared/PlanDisplay";
import PlanInput from "@/components/shared/PlanInput";
import { useState } from "react";

export default function Home() {
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);

  return (
    <div>
      <PlanInput setFetchTrigger={setFetchTrigger} />
      <PlanDisplay
        fetchTrigger={fetchTrigger}
        setFetchTrigger={setFetchTrigger}
      />
    </div>
  );
}
