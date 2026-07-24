import { BriefcaseBusiness } from "lucide-react";

import { KpiDetailCard } from "./kpi-detail-card";

export function TotalDeals() {
  return (
    <KpiDetailCard
      title="Total Deals"
      value="102,890"
      change="-0.8%"
      changeDirection="down"
      icon={BriefcaseBusiness}
      description="Shows all deals recorded across the sales pipeline."
      previousValue="103,719"
      target="110,000"
      targetProgress={93.5}
      breakdown={[
        { label: "Won", value: "48,140", context: "46.8% of total" },
        { label: "In progress", value: "39,760", context: "Active pipeline" },
        { label: "Lost", value: "14,990", context: "14.6% of total" }
      ]}
    />
  );
}
