"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const SERIES_COLORS = {
  views: "#22d3ee",
  likes: "#34d399",
  comments: "#fbbf24",
};

export type AnalyticsPoint = {
  date: string;
  views: number;
  likes: number;
  comments: number;
};

type VideoAnalyticsChartProps = {
  data: AnalyticsPoint[];
  height?: number;
  showDots?: boolean;
};

export function VideoAnalyticsChart({
  data,
  height = 256,
  showDots = true,
}: VideoAnalyticsChartProps) {
  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="var(--border-soft)" vertical={false} />
          <XAxis dataKey="date" stroke="var(--muted)" fontSize={12} tickLine={false} />
          <YAxis stroke="var(--muted)" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "var(--panel-strong)",
              border: "1px solid var(--border-soft-hover)",
              borderRadius: 12,
              color: "var(--foreground)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "var(--muted)" }} />
          <Line
            type="monotone"
            dataKey="views"
            name="Visualizações"
            stroke={SERIES_COLORS.views}
            strokeWidth={2}
            dot={showDots}
          />
          <Line
            type="monotone"
            dataKey="likes"
            name="Curtidas"
            stroke={SERIES_COLORS.likes}
            strokeWidth={2}
            dot={showDots}
          />
          <Line
            type="monotone"
            dataKey="comments"
            name="Comentários"
            stroke={SERIES_COLORS.comments}
            strokeWidth={2}
            dot={showDots}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
