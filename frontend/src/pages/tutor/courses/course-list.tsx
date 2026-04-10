import { useState } from "react";
import {
  Plus,
  Search,
  MoreHorizontal,
  //   Play,
  Pause,
  ExternalLink,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Badge } from "@/components/ui/badge";

export default function CourseList() {
  const [searchQuery, setSearchQuery] = useState("");

  // AWS-style status colors
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "published":
        return (
          <Badge className="bg-green-500/10 text-green-600 border-green-200 hover:bg-green-500/20">
            Running
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="text-zinc-500">
            Stopped
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-200">
            Pending
          </Badge>
        );
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. SERVICE HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses</h1>
          <p className="text-sm text-zinc-500">
            Manage your course instances and their associated video resources.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="hidden md:flex">
            Documentation
          </Button>
          <Button className="bg-[#ff9900] hover:bg-[#ec8b00] text-white font-bold">
            <Plus className="mr-2 h-4 w-4" /> Create Course
          </Button>
        </div>
      </div>

      {/* 2. CONTROL BAR (Filters & Search) */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between bg-white dark:bg-zinc-950 p-4 border rounded-lg shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
          <Input
            placeholder="Find courses by ID or name..."
            className="pl-9 bg-zinc-50 dark:bg-zinc-900 border-zinc-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <span className="text-sm text-zinc-500 border-l pl-4 ml-2">
            Showing 12 resources
          </span>
        </div>
      </div>

      {/* 3. RESOURCE TABLE */}
      <div className="rounded-md border bg-white dark:bg-zinc-950">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-900">
            <TableRow>
              <TableHead className="w-[40%]">Course Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enrollment</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Example Row - You will map your backend data here */}
            <TableRow className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline font-bold">
                    Advanced Python for Data Science
                  </span>
                  <span className="text-xs text-zinc-500">crs-8b29f10a</span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge("published")}</TableCell>
              <TableCell className="text-sm">1,240 students</TableCell>
              <TableCell className="text-sm font-mono">₹45,200.00</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="text-blue-600">
                      <ExternalLink className="mr-2 h-4 w-4" /> View Public Page
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Pause className="mr-2 h-4 w-4" /> Stop Course
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Terminate Resource
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
