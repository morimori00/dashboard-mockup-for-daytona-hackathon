"use client";

import { generateMeta } from "@/lib/utils";

import CustomDateRangePicker from "@/components/custom-date-range-picker";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ChatWidget,
  ExerciseMinutes,
  LatestPayments,
  PaymentMethodCard,
  SubscriptionsCard,
  TeamMembersCard,
  TotalRevenueCard
} from "@/app/dashboard/(auth)/default/components";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { TotalCustomersCard } from "./components/total-customers";
import { TotalDeals } from "./components/total-deals";
import { TotalRevenueCard2 } from "./components/total-revenue-2";
import { TableOrderStatus } from "./components/table-order-status";
import { useState } from "react";

export default function Page() {
  // ダッシュボードデータ
  const dashboardData = {
    "wigets": [
      {
        "title": "総利益",
        "subtitle": "",
        "width": 2,
        "components": [
          {
            "type": "chart",
            "data": {
              "type": "line",
              "data": {
                "labels": [
                  "Jan",
                  "Feb",
                  "Mar",
                  "Apr",
                  "May",
                  "Jun",
                  "Jul"
                ],
                "datasets": [
                  {
                    "label": "Revenue",
                    "data": [
                      30,
                      45,
                      40,
                      55,
                      62,
                      58,
                      70
                    ],
                    "borderColor": "#10b981",
                    "backgroundColor": "rgba(16,185,129,0.2)",
                    "tension": 0.35,
                    "fill": true,
                    "pointRadius": 3
                  }
                ]
              },
              "options": {
                "responsive": true,
                "maintainAspectRatio": false,
                "plugins": {
                  "legend": {
                    "position": "top"
                  },
                  "title": {
                    "display": true,
                    "text": "Line Chart"
                  }
                },
                "scales": {
                  "y": {
                    "beginAtZero": true
                  }
                }
              }
            },
            "label": ""
          }
        ]
      },
      {
        "title": "部門別パフォーマンス",
        "subtitle": "",
        "width": 4,
        "components": [
          {
            "type": "grid",
            "components": [
              {
                "type": "metricCard",
                "label": "部門格差指数",
                "value": "31.2%",
                "trend": {
                  "value": "5%",
                  "direction": "up",
                  "color": "success"
                },
                "icon": ""
              },
              {
                "type": "metricCard",
                "label": "パフォーマンス平均",
                "value": "78%",
                "trend": {
                  "value": "5%",
                  "direction": "down",
                  "color": "danger"
                },
                "icon": "activity"
              }
            ]
          },
          {
            "type": "table",
            "label": "部門別目標達成度ランキング(上位3位)",
            "data": [
              { "部門名": "マーケティング部", "達成度": "150%" },
              { "部門名": "事業部", "達成度": "97%" },
              { "部門名": "製造部", "達成度": "87%" }
            ]
          }
        ]
      }
    ]
  };

  return (
      <Tabs defaultValue="dashboard" className="w-full">
    <div className="space-y-4">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight lg:text-2xl">Dashboard</h1>
        <div className="flex items-center space-x-2">
          {/* tabs */}
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="json">JSON</TabsTrigger>
        </TabsList>

        </div>
      </div>

      
        
        <TabsContent value="dashboard" className="mt-4">
          <div className="gap-4 space-y-4 lg:grid lg:grid-cols-3 lg:space-y-0">
            <TotalCustomersCard />
            <TotalDeals />
            <TotalRevenueCard2 />
            <SubscriptionsCard />
            <div className="lg:col-span-2">
              <ExerciseMinutes />
            </div>
            <TotalRevenueCard />
            <div className="lg:col-span-2">
              <TableOrderStatus />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="json" className="mt-4">
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Dashboard JSON Data</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(dashboardData, null, 2));
                  toast.success("JSONをクリップボードにコピーしました");
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                Copy JSON
              </Button>
            </div>
            <pre className="bg-muted rounded-md p-4">
              <code className="text-sm">
                {JSON.stringify(dashboardData, null, 2)}
              </code>
            </pre>
          </div>
        </TabsContent>
    </div>
      </Tabs>
  );
}
