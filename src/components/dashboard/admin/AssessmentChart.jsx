"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/** @type {import("@/components/ui/chart").ChartConfig} */
const chartConfig = {
  assessments: {
    label: "Asesmen",
    color: "hsl(var(--chart-1))",
  },
};

export function AssessmentChart({ data = [] }) {
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Linimasa Asesmen Selesai</CardTitle>
          <CardDescription>
            Jumlah asesmen yang diselesaikan setiap bulan.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {data.length === 0 ? (
            <p className="text-center text-gray-400 mt-10">
              Belum ada data asesmen.
            </p>
          ) : (
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <AreaChart
                accessibilityLayer
                data={data}
                margin={{ left: 12, right: 12 }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={30}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-assessments)"
                  fill="var(--color-assessments)"
                  fillOpacity={0.3}
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1200}
                />
              </AreaChart>
            </ChartContainer>
          )}
        </CardContent>

        <CardFooter>
          <div className="flex w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Total {total} asesmen telah diselesaikan
              </div>
              <div className="text-muted-foreground flex items-center gap-2 leading-none">
                Data diambil secara real-time.
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
