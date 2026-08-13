"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  borderRadius: 8,
  border: "1px solid #e5e5e5",
  boxShadow: "none",
  fontSize: 12,
};

type Point = { label: string; scans: number; matches?: number };

export function DailyUsageChart({
  data,
  className,
  scanLabel = "Scan",
  matchLabel = "Match",
}: {
  data: readonly Point[];
  className?: string;
  scanLabel?: string;
  matchLabel?: string;
}) {
  return (
    <div className={cn("h-64 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={[...data]}>
          <defs>
            <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F4A7BC" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#F4A7BC" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e5e5" />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#737373", fontSize: 11 }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            width={28}
            tick={{ fill: "#737373", fontSize: 12 }}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="scans"
            stroke="#E879A9"
            strokeWidth={2}
            fill="url(#usageFill)"
            name={scanLabel}
          />
          <Area
            type="monotone"
            dataKey="matches"
            stroke="#1D1D1F"
            strokeWidth={1.5}
            fill="transparent"
            name={matchLabel}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WeeklyUsageChart({
  data,
  className,
  scanLabel = "Scan",
  matchLabel = "Match",
}: {
  data: readonly { label: string; used: number; matches: number }[];
  className?: string;
  scanLabel?: string;
  matchLabel?: string;
}) {
  return (
    <div className={cn("h-64 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={[...data]}>
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
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="used" fill="#1D1D1F" radius={[4, 4, 0, 0]} name={scanLabel} />
          <Bar dataKey="matches" fill="#F4A7BC" radius={[4, 4, 0, 0]} name={matchLabel} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const CHANNEL_COLORS = ["#1D1D1F", "#F4A7BC"];

export function ChannelDonut({
  data,
  className,
}: {
  data: readonly { label: string; value: number }[];
  className?: string;
}) {
  return (
    <div className={cn("h-56 w-full", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={[...data]}
            dataKey="value"
            nameKey="label"
            innerRadius={58}
            outerRadius={80}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.label}
                fill={CHANNEL_COLORS[index % CHANNEL_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
