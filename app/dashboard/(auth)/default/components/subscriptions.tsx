"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
import { Bar } from "react-chartjs-2"

// Chart.jsのコンポーネントを登録
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Visitors",
      data: [120, 190, 300, 250, 200, 130, 170],
      backgroundColor: ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6", "#f97316", "#22c55e"],
      borderRadius: 6,
    },
  ],
}

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Weekly Subscriptions",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
}

export function SubscriptionsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscriptions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="font-display text-3xl leading-6">+4850</div>
        <p className="text-muted-foreground mt-1.5 text-xs">
          <span className="text-green-500">+180.1%</span> from last month
        </p>
        <div className="mt-6 h-[200px] w-full">
          <Bar data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  )
}
