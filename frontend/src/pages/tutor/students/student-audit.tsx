import { useState } from "react";
import {
  Search,
  // ShieldCheck,
  Mail,
  MoreVertical,
  UserX,
  ExternalLink,
  Filter,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function StudentAudit() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      {/* 1. SERVICE HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-md">
            <Users className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Identity & Enrollment
            </h1>
            <p className="text-sm text-zinc-500">
              Manage student access, view progress, and monitor account health.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Mail className="mr-2 h-4 w-4" /> Message All Active
        </Button>
      </div>

      {/* 2. CONTROL BAR */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-zinc-950 p-4 border rounded-lg shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Search by name, email, or user ID..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Status: Active
          </Button>
        </div>
      </div>

      {/* 3. STUDENT TABLE */}
      <div className="rounded-md border bg-white dark:bg-zinc-950">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-900">
            <TableRow>
              <TableHead className="w-[30%]">Student Identity</TableHead>
              <TableHead>Enrollments</TableHead>
              <TableHead>Avg. Completion</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="text-right">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Row 1: Active Student */}
            <TableRow className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-600">
                    JD
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      John Doe
                    </span>
                    <span className="text-xs text-zinc-500">
                      john.doe@example.com
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">2 Courses</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3 w-32">
                  <Progress
                    value={78}
                    className="h-1.5 flex-1 [&>div]:bg-green-500"
                  />
                  <span className="text-xs font-mono text-zinc-500">78%</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="text-sm">Online Now</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>IAM Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" /> View Full
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Mail className="mr-2 h-4 w-4" /> Email Student
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <UserX className="mr-2 h-4 w-4" /> Revoke Access
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>

            {/* Row 2: Inactive Student */}
            <TableRow>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-600">
                    AS
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      Alice Smith
                    </span>
                    <span className="text-xs text-zinc-500">
                      alice.s@example.com
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">1 Course</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3 w-32">
                  <Progress value={12} className="h-1.5 flex-1" />
                  <span className="text-xs font-mono text-zinc-500">12%</span>
                </div>
              </TableCell>
              <TableCell className="text-sm text-zinc-500">
                14 days ago
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
