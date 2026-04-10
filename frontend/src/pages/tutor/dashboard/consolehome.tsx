import {
  CheckCircle2,
  AlertTriangle,
  Activity,
  Cpu,
  HardDrive,
  ArrowRight,
  PlayCircle,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ConsoleHome() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* 1. WELCOME BANNER */}
      <div className="bg-[#232f3e] rounded-xl p-6 md:p-8 text-white shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back to the Console
          </h1>
          <p className="text-zinc-400 text-sm max-w-xl">
            Your platform infrastructure is running normally. You have 2 pending
            payouts and 14 new student enrollments since your last login.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button className="bg-[#ff9900] hover:bg-[#ec8b00] text-white font-bold border-none">
            <Plus className="mr-2 h-4 w-4" /> Launch New Course
          </Button>
          <Button
            variant="outline"
            className="text-zinc-900 bg-white hover:bg-zinc-100 border-none font-bold"
          >
            View Analytics
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 2. SERVICE HEALTH (Left Column - 2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Activity className="h-5 w-5 text-zinc-500" /> Service Health
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Compute Health */}
            <Card className="border-green-200 dark:border-green-900/50">
              <CardContent className="p-4 flex items-start gap-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Course Delivery API</h3>
                  <p className="text-xs text-zinc-500 mt-1 mb-2">
                    Endpoints are responding in &lt;45ms
                  </p>
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-green-50 text-green-600 border-green-200"
                  >
                    Operational
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Storage Health */}
            <Card className="border-amber-200 dark:border-amber-900/50">
              <CardContent className="p-4 flex items-start gap-4">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    Media Transcoding Queue
                  </h3>
                  <p className="text-xs text-zinc-500 mt-1 mb-2">
                    High load: Video processing delayed by 2m
                  </p>
                  <Badge
                    variant="outline"
                    className="text-[10px] bg-amber-50 text-amber-600 border-amber-200"
                  >
                    Degraded Performance
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Resource Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">
                Resource Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="space-y-1">
                  <span className="text-2xl font-bold">12</span>
                  <p className="text-xs text-zinc-500 flex items-center gap-1">
                    <Cpu className="h-3 w-3" /> Active Courses
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-bold">84</span>
                  <p className="text-xs text-zinc-500 flex items-center gap-1">
                    <HardDrive className="h-3 w-3" /> S3 Objects
                  </p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-bold">1.2k</span>
                  <p className="text-xs text-zinc-500">IAM Identities</p>
                </div>
                <div className="space-y-1">
                  <span className="text-2xl font-bold">4.8</span>
                  <p className="text-xs text-zinc-500">Avg Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 3. CLOUDTRAIL / RECENT ACTIVITY (Right Column - 1/3 width) */}
        <div className="space-y-6">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <PlayCircle className="h-5 w-5 text-zinc-500" /> Recent Activity
            Logs
          </h2>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y border-t-0">
                {/* Event 1 */}
                <div className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <Badge variant="secondary" className="text-[9px] font-mono">
                      ENROLLMENT
                    </Badge>
                    <span className="text-[10px] text-zinc-400">10m ago</span>
                  </div>
                  <p className="text-sm font-medium">
                    New student enrolled in Python Masterclass
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    usr_992x1a • +₹4,500
                  </p>
                </div>

                {/* Event 2 */}
                <div className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <Badge
                      variant="outline"
                      className="text-[9px] font-mono text-blue-600 bg-blue-50 border-blue-200"
                    >
                      TRANSCODING
                    </Badge>
                    <span className="text-[10px] text-zinc-400">2h ago</span>
                  </div>
                  <p className="text-sm font-medium">
                    Video object processing completed
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    obj_72x1 • 1080p Ready
                  </p>
                </div>

                {/* Event 3 */}
                <div className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors cursor-pointer group">
                  <div className="flex items-center justify-between mb-1">
                    <Badge
                      variant="outline"
                      className="text-[9px] font-mono text-zinc-500"
                    >
                      SYSTEM
                    </Badge>
                    <span className="text-[10px] text-zinc-400">Yesterday</span>
                  </div>
                  <p className="text-sm font-medium">
                    Course draft saved automatically
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-mono">
                    crs-8b29f10a
                  </p>
                </div>
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-900/30 border-t text-center rounded-b-xl">
                <Button
                  variant="link"
                  size="sm"
                  className="text-blue-600 text-xs"
                >
                  View full CloudTrail logs{" "}
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
