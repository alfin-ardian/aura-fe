"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TrendPoint } from "@/types";
import { cn } from "@/lib/utils";

interface SimpleBarChartProps {
  data: TrendPoint[];
  className?: string;
}

export function SimpleBarChart({ data, className }: SimpleBarChartProps) {
  return (
    <div className={cn("h-64 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#737373", fontSize: 12 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={32}
            tick={{ fill: "#737373", fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "1px solid #e5e5e5",
              boxShadow: "none",
            }}
          />
          <Bar dataKey="scans" fill="#0a0a0a" radius={[4, 4, 0, 0]} />
          <Bar dataKey="matches" fill="#a3a3a3" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
