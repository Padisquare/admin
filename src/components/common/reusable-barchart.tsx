"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface ReusableBarChartProps {
  title: string;
  data: { month: string; [key: string]: number | string }[];
  dataKey: string;
  barColor?: string;
}

export function ReusableBarChart({
  title,
  data,
  dataKey,
  barColor = "#2563EB",
}: ReusableBarChartProps) {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm flex flex-col">
      {/* Chart title */}
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Chart container that fills remaining height */}
      <div className="">
        <ChartContainer
          config={{ [dataKey]: { label: title, color: barColor } }}
          className="min-h-[500px] w-full"
        >
          <BarChart
            data={data}
            width={100} // width ignored; parent flex controls width
            height={100} // initial height, we will scale via parent flex
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid vertical={false} stroke="#F1F5F9" />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />

            <YAxis tickLine={false} axisLine={false} tickMargin={8} />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <Bar
              dataKey={dataKey}
              fill={barColor}
              radius={[6, 6, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
}
