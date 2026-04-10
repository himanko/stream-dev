import {
  LineChart,
  Filter,
  AlertTriangle,
  PlayCircle,
  Lightbulb,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function WatchTimeChart() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. RESOURCE SELECTOR */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between bg-white dark:bg-zinc-950 p-4 border rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <LineChart className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex items-center gap-2">
            <select className="h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3 text-sm font-medium max-w-[200px] truncate">
              <option>Advanced Python for Data Science</option>
              <option>React Masterclass</option>
            </select>
            <span className="text-zinc-400">/</span>
            <select className="h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 text-sm font-medium font-mono">
              <option>Lesson 1.2: What is Python?</option>
              <option>Lesson 2.1: Data Types</option>
            </select>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Filter className="mr-2 h-4 w-4" /> Filter Cohort
        </Button>
      </div>

      {/* 2. RETENTION GRAPH AREA */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">
                Audience Retention Curve
              </CardTitle>
              <CardDescription>
                Percentage of viewers still watching at a specific timestamp.
              </CardDescription>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-blue-500"></span> All
                Users
              </div>
              <div className="flex items-center gap-2 text-zinc-500">
                <span className="h-3 w-3 rounded-full bg-zinc-300"></span>{" "}
                Skipped Sections
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* MOCK RETENTION CHART - Replace with Recharts AreaChart */}
          <div className="relative h-80 w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed p-4 flex flex-col justify-end">
            {/* Y-Axis Labels */}
            <div className="absolute left-4 top-4 bottom-8 flex flex-col justify-between text-xs text-zinc-400 font-mono">
              <span>100%</span>
              <span>75%</span>
              <span>50%</span>
              <span>25%</span>
            </div>

            {/* X-Axis Labels (Time) */}
            <div className="absolute left-12 right-4 bottom-2 flex justify-between text-xs text-zinc-400 font-mono">
              <span>0:00</span>
              <span>2:30</span>
              <span>5:00</span>
              <span>7:30</span>
              <span>10:00 (End)</span>
            </div>

            {/* Simulated Chart Curve */}
            <div className="ml-10 mb-6 h-full w-[calc(100%-2.5rem)] relative overflow-hidden">
              {/* CSS Simulation of a drop-off curve */}
              <div
                className="absolute inset-0 bg-blue-500/20"
                style={{
                  clipPath:
                    "polygon(0% 10%, 20% 15%, 45% 40%, 48% 60%, 55% 62%, 80% 65%, 100% 70%, 100% 100%, 0% 100%)",
                }}
              ></div>
              <div
                className="absolute inset-0 border-t-2 border-blue-500"
                style={{
                  clipPath:
                    "polygon(0% 10%, 20% 15%, 45% 40%, 48% 60%, 55% 62%, 80% 65%, 100% 70%, 100% 100%, 0% 100%)",
                }}
              ></div>

              {/* Danger Point Indicator */}
              <div className="absolute left-[45%] top-[40%] flex flex-col items-center">
                <div className="h-32 w-px bg-red-400 border-l border-dashed"></div>
                <Badge
                  variant="destructive"
                  className="absolute -top-6 whitespace-nowrap text-[10px]"
                >
                  High Drop-off (-20%)
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. AI / SYSTEM INSIGHTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-amber-200 bg-amber-50/50 dark:bg-amber-950/20 dark:border-amber-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold text-amber-800 dark:text-amber-500 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" /> Drop-off Anomaly Detected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-700 dark:text-amber-400">
              There is a sudden 20% drop in viewership at the{" "}
              <span className="font-mono font-bold">04:12</span> mark. Consider
              reviewing the video at this timestamp. Is the audio clear? Is the
              concept explained too quickly?
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 border-amber-300 text-amber-700 bg-white"
            >
              <PlayCircle className="mr-2 h-4 w-4" /> Play Video at 04:12
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold flex items-center gap-2 text-blue-600">
              <Lightbulb className="h-4 w-4" /> Engagement Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-sm border-b pb-2">
              <span className="text-zinc-500">Average View Duration</span>
              <span className="font-bold">6m 14s (62%)</span>
            </div>
            <div className="flex justify-between items-center text-sm border-b pb-2">
              <span className="text-zinc-500">Completion Rate</span>
              <span className="font-bold text-green-600">45%</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-zinc-500">
                Rewatch Rate (Specific Sections)
              </span>
              <span className="font-bold text-blue-600">High at 02:30</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
