import { Users2Icon } from "lucide-react";

import { KpiDetailCard } from "./kpi-detail-card";

export function TotalCustomersCard() {
  return (
    <KpiDetailCard
      title="Total Customers"
      value="1,890"
      change="+10.4%"
      changeDirection="up"
      icon={Users2Icon}
      description="Tracks the active customer base across all accounts."
      previousValue="1,712"
      target="2,000"
      targetProgress={94.5}
      breakdown={[
        { label: "New customers", value: "176", context: "Added this month" },
        { label: "Returning customers", value: "1,128", context: "59.7% of total" },
        { label: "At-risk customers", value: "86", context: "Needs follow-up" }
      ]}
    />
  );
}
