import {
  TrendingUp,
  Users,
  Star,
  Clock,
  ArrowUpRight,
  BarChart3,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Performance() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* 1. SERVICE HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-600 rounded-md">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Analytics & Performance
            </h1>
            <p className="text-sm text-zinc-500">
              Monitor revenue, enrollment trends, and student satisfaction.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <select className="h-9 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-3 text-sm font-medium">
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>Year to Date</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      {/* 2. KPI TELEMETRY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Gross Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1,42,500</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +14.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Active Students
            </CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+840</div>
            <p className="text-xs text-emerald-600 flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +22 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Avg. Rating
            </CardTitle>
            <Star className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8 / 5.0</div>
            <p className="text-xs text-zinc-500 mt-1">Based on 142 reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500">
              Total Watch Time
            </CardTitle>
            <Clock className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,842 Hours</div>
            <p className="text-xs text-zinc-500 mt-1">Across all courses</p>
          </CardContent>
        </Card>
      </div>

      {/* 3. TRENDS & TOP RESOURCES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart Area */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Revenue vs. Enrollments</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Placeholder for Recharts/Chart.js */}
            <div className="h-72 w-full bg-zinc-50 dark:bg-zinc-900/50 rounded-lg border border-dashed flex flex-col items-center justify-center text-zinc-400">
              <BarChart3 className="h-8 w-8 mb-2 opacity-50" />
              <p className="text-sm">[ Insert AreaChart Component Here ]</p>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Courses */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Top Performing Assets</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Advanced Python
                </p>
                <p className="text-xs text-zinc-500">crs-8b29f10a</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">₹84,200</p>
                <Badge
                  variant="outline"
                  className="text-[10px] text-emerald-600 bg-emerald-50"
                >
                  #1 Top
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  React Masterclass
                </p>
                <p className="text-xs text-zinc-500">crs-9x2m41p</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">₹42,100</p>
                <Badge variant="outline" className="text-[10px] text-zinc-500">
                  #2
                </Badge>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  Java Spring Boot
                </p>
                <p className="text-xs text-zinc-500">crs-1j9k00z</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">₹16,200</p>
                <Badge variant="outline" className="text-[10px] text-zinc-500">
                  #3
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
