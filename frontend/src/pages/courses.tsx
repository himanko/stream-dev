import {
  PlayCircle,
  Clock,
  Trophy,
  Terminal,
  Code2,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Courses() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
          My Learning
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Pick up exactly where you left off and track your path to mastery.
        </p>
      </div>

      {/* JUMP BACK IN (HERO COURSE) */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
          <PlayCircle className="h-5 w-5 text-brand" /> Continue Learning
        </h3>

        <Card className="border-brand/20 bg-brand/5 dark:bg-brand/10 overflow-hidden relative group">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 h-32 w-32 rounded-full bg-brand/20 blur-3xl group-hover:bg-brand/30 transition-all"></div>

          <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start sm:items-center relative z-10">
            <div className="h-20 w-20 shrink-0 rounded-2xl bg-zinc-900 dark:bg-zinc-950 flex items-center justify-center border border-zinc-800 shadow-xl">
              <Wallet className="h-10 w-10 text-brand" />
            </div>

            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-brand/20 px-2.5 py-0.5 text-xs font-semibold text-brand">
                  Project Module
                </span>
                <span className="text-xs text-zinc-500 font-medium">
                  Module 4 of 8
                </span>
              </div>
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white">
                Building a GPay-Style Banking API
              </h4>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
                Implement secure transactions, concurrency control, and robust
                database architecture using advanced Java and Spring Boot.
              </p>

              <div className="pt-2">
                <div className="flex justify-between text-xs font-medium text-zinc-900 dark:text-zinc-300 mb-1.5">
                  <span>45% Completed</span>
                  <span>Est. 3h 15m remaining</span>
                </div>
                <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-2">
                  <div
                    className="bg-brand h-2 rounded-full transition-all duration-1000"
                    style={{ width: "45%" }}
                  ></div>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full sm:w-auto shrink-0 bg-brand hover:bg-brand/90 text-white shadow-lg shadow-brand/25"
            >
              Resume Project
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* COURSE GRID */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mt-8">
          Your Enrolled Courses
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Completed Course */}
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-950/50 flex items-center justify-center text-green-600 dark:text-green-500 border border-green-200 dark:border-green-900">
                  <Code2 className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle2 className="h-3 w-3" /> Completed
                </span>
              </div>
              <CardTitle className="text-base leading-tight">
                Core Java Foundations
              </CardTitle>
              <CardDescription className="text-xs">
                Instructors: Himanko & Rituraj
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5">
                <div
                  className="bg-green-500 h-1.5 rounded-full"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 border-t border-zinc-100 dark:border-zinc-900/50 mt-auto flex justify-between">
              <Button variant="ghost" size="sm" className="text-zinc-500 -ml-2">
                Review Material
              </Button>
              <Button variant="link" size="sm" className="text-brand">
                View Certificate
              </Button>
            </CardFooter>
          </Card>

          {/* Not Started Course */}
          <Card className="border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-950/50 backdrop-blur-xl hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors flex flex-col opacity-80 hover:opacity-100">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start mb-2">
                <div className="h-10 w-10 rounded-lg bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800">
                  <Terminal className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                  Not Started
                </span>
              </div>
              <CardTitle className="text-base leading-tight">
                Advanced C++ Data Structures
              </CardTitle>
              <CardDescription className="text-xs">
                Master memory management and pointers.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4">
              <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> 12 Hours
                </span>
                <span className="flex items-center gap-1">
                  <Trophy className="h-3.5 w-3.5" /> Certificate included
                </span>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-zinc-100 dark:border-zinc-900/50 mt-auto">
              <Button variant="secondary" size="sm" className="w-full">
                Start Course
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
