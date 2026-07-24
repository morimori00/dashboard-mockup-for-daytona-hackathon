"use client";

import { ArrowUpRight, TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardAction, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type BreakdownItem = {
  label: string;
  value: string;
  context: string;
};

type KpiDetailCardProps = {
  title: string;
  value: string;
  change: string;
  changeDirection: "up" | "down";
  icon: LucideIcon;
  description: string;
  previousValue: string;
  target: string;
  targetProgress: number;
  breakdown: BreakdownItem[];
};

export function KpiDetailCard({
  title,
  value,
  change,
  changeDirection,
  icon: Icon,
  description,
  previousValue,
  target,
  targetProgress,
  breakdown
}: KpiDetailCardProps) {
  const isPositive = changeDirection === "up";
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="group focus-visible:ring-ring/50 w-full rounded-xl text-left outline-none focus-visible:ring-[3px]"
          aria-label={`View detailed metrics for ${title}`}
        >
          <Card className="group-hover:border-primary/40 group-focus-visible:border-ring h-full cursor-pointer transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
            <CardHeader>
              <CardDescription>{title}</CardDescription>
              <div className="flex flex-col gap-2">
                <h4 className="font-display text-2xl lg:text-3xl">{value}</h4>
                <div className="text-muted-foreground text-sm">
                  <span className={isPositive ? "text-green-600" : "text-red-600"}>{change}</span>{" "}
                  from last month
                </div>
              </div>
              <CardAction>
                <div className="bg-muted group-hover:border-primary/30 group-hover:bg-primary/10 flex size-12 items-center justify-center rounded-full border transition-colors">
                  <Icon className="size-5" />
                </div>
              </CardAction>
              <div className="text-muted-foreground group-hover:text-foreground col-span-full flex items-center gap-1 text-xs font-medium transition-colors">
                View details
                <ArrowUpRight className="size-3.5" aria-hidden="true" />
              </div>
            </CardHeader>
          </Card>
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto sm:max-w-xl">
        <DialogHeader className="pr-8">
          <div className="mb-1 flex items-center gap-2">
            <div className="bg-muted flex size-9 items-center justify-center rounded-lg border">
              <Icon className="size-4" aria-hidden="true" />
            </div>
            <Badge variant="outline">KPI details</Badge>
          </div>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="bg-muted/40 rounded-lg border p-4">
          <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            Current month
          </p>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <p className="font-display text-3xl">{value}</p>
            <Badge
              variant="outline"
              className={cn(
                "mb-0.5",
                isPositive
                  ? "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300"
                  : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
              )}
            >
              <TrendIcon className="size-3" aria-hidden="true" />
              {change}
            </Badge>
          </div>
          <p className="text-muted-foreground mt-1 text-sm">Compared with the previous month</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Previous month</p>
            <p className="mt-1 font-semibold">{previousValue}</p>
          </div>
          <div className="rounded-lg border p-4">
            <p className="text-muted-foreground text-sm">Monthly target</p>
            <p className="mt-1 font-semibold">{target}</p>
          </div>
        </div>

        <section className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-medium">Progress to target</h3>
            <span className="text-muted-foreground text-sm">{targetProgress}%</span>
          </div>
          <Progress value={targetProgress} aria-label={`${targetProgress}% of target reached`} />
        </section>

        <Separator />

        <section className="space-y-3">
          <h3 className="text-sm font-medium">Performance breakdown</h3>
          <div className="divide-y rounded-lg border">
            {breakdown.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-4 px-4 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-muted-foreground text-xs">{item.context}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
}
