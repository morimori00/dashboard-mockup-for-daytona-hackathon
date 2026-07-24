import { WalletMinimal } from "lucide-react";

import { KpiDetailCard } from "./kpi-detail-card";

export function TotalRevenueCard2() {
  return (
    <KpiDetailCard
      title="Total Revenue"
      value="$435,578"
      change="+20.1%"
      changeDirection="up"
      icon={WalletMinimal}
      description="Measures recognized revenue across every business line."
      previousValue="$362,679"
      target="$500,000"
      targetProgress={87.1}
      breakdown={[
        { label: "Subscriptions", value: "$192,320", context: "44.2% of revenue" },
        { label: "Services", value: "$143,258", context: "32.9% of revenue" },
        { label: "Products", value: "$100,000", context: "23.0% of revenue" }
      ]}
    />
  );
}
