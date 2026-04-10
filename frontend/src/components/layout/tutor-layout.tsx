import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  Database,
  Users,
  LineChart,
  CreditCard,
  Bell,
  Search,
  Menu,
  Server,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TutorLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: "Console Home", href: "/tutor/dashboard", icon: LayoutDashboard },
    { name: "Compute (Courses)", href: "/tutor/courses", icon: BookOpen },
    { name: "Storage (Media)", href: "/tutor/media", icon: Database },
    { name: "IAM (Students)", href: "/tutor/students", icon: Users },
    {
      name: "CloudWatch (Analytics)",
      href: "/tutor/analytics/performance",
      icon: LineChart,
    },
    { name: "Billing", href: "/tutor/billing/payouts", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col md:flex-row font-sans">
      {/* 1. SIDEBAR NAVIGATION */}
      <aside
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } flex-shrink-0 bg-[#232f3e] text-zinc-300 flex flex-col transition-all duration-300 fixed md:relative z-20 h-full hidden md:flex`}
      >
        <div className="h-16 flex items-center px-4 border-b border-zinc-700/50">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Server className="h-6 w-6 text-[#ff9900]" />
            {sidebarOpen && <span>Tutor Console</span>}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname.includes(item.href);
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#131a22] text-white border-l-4 border-[#ff9900]"
                    : "hover:bg-[#131a22] hover:text-white border-l-4 border-transparent"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-[#ff9900]" : "text-zinc-400"}`}
                />
                {sidebarOpen && <span>{item.name}</span>}
              </NavLink>
            );
          })}
        </nav>

        <div className="p-4 border-t border-zinc-700/50">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-zinc-800 flex items-center justify-center text-white font-bold text-xs">
              HB
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white leading-none">
                  Himanko B.
                </span>
                <span className="text-[10px] text-zinc-400 font-mono mt-1">
                  ID: root-user
                </span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* GLOBAL HEADER */}
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-4 lg:px-8 z-10 sticky top-0">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="max-w-md w-full hidden md:block relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <Input
                placeholder="Search resources, services, and docs..."
                className="pl-9 h-9 bg-zinc-50 dark:bg-zinc-950 border-zinc-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5 text-zinc-600 dark:text-zinc-400" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white dark:border-zinc-900"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-200 dark:border-indigo-800">
                    HB
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" /> Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="mr-2 h-4 w-4" /> Billing Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" /> Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* PAGE CONTENT INJECTION POINT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <Outlet />{" "}
          {/* <-- This is where ConsoleHome, CourseList, etc. render */}
        </main>
      </div>
    </div>
  );
}
