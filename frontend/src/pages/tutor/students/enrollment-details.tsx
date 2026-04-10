import {
  ArrowLeft,
  Mail,
  Clock,
  Award,
  PlayCircle,
  Activity,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function EnrollmentDetails() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* 1. NAVIGATION & IDENTITY HEADER */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-2 cursor-pointer hover:text-zinc-900 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Identity Directory
      </div>

      <div className="flex flex-col md:flex-row md:items-start md:justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6 gap-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-xl font-bold text-indigo-600 dark:text-indigo-400">
            JD
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl font-bold tracking-tight">John Doe</h1>
              <Badge className="bg-green-500/10 text-green-600 border-green-200">
                Account Active
              </Badge>
            </div>
            <p className="text-sm text-zinc-500 flex items-center gap-2">
              <Mail className="h-3.5 w-3.5" /> john.doe@example.com
              <span className="mx-1">•</span>
              <span className="font-mono text-xs">ID: usr_992x1a</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <ShieldAlert className="mr-2 h-4 w-4" /> Suspend
          </Button>
        </div>
      </div>

      {/* 2. TELEMETRY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">
                Total Watch Time
              </p>
              <h3 className="text-2xl font-bold">14h 22m</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-600">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">
                Certificates Earned
              </p>
              <h3 className="text-2xl font-bold">1</h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg text-amber-600">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm text-zinc-500 font-medium">Last Login</p>
              <h3 className="text-lg font-bold">Today, 10:42 AM</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. LICENSES / ENROLLED COURSES */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-zinc-400" /> Active Enrollments
        </h3>

        <div className="grid gap-4">
          {/* Course Card 1 */}
          <div className="border rounded-xl p-5 bg-white dark:bg-zinc-950 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg">
                  Advanced Python for Data Science
                </h4>
                <Badge variant="outline" className="font-mono text-[10px]">
                  crs-8b29f10a
                </Badge>
              </div>
              <p className="text-sm text-zinc-500">
                Purchased on Feb 12, 2026 • ₹4,500
              </p>
            </div>

            <div className="w-full md:w-64 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-green-600">
                  78% Completed
                </span>
                <span className="text-zinc-500">24/31 Lessons</span>
              </div>
              <Progress value={78} className="h-2 [&>div]:bg-green-500" />
            </div>

            <div className="w-full md:w-auto flex justify-end">
              <Button variant="secondary" size="sm">
                View Quiz Scores
              </Button>
            </div>
          </div>

          {/* Course Card 2 */}
          <div className="border rounded-xl p-5 bg-white dark:bg-zinc-950 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg">
                  React Frontend Masterclass
                </h4>
                <Badge variant="outline" className="font-mono text-[10px]">
                  crs-9x2m41p
                </Badge>
              </div>
              <p className="text-sm text-zinc-500">
                Purchased on Mar 01, 2026 • ₹3,200
              </p>
            </div>

            <div className="w-full md:w-64 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">12% Completed</span>
                <span className="text-zinc-500">4/35 Lessons</span>
              </div>
              <Progress value={12} className="h-2" />
            </div>

            <div className="w-full md:w-auto flex justify-end">
              <Button variant="secondary" size="sm">
                View Quiz Scores
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
