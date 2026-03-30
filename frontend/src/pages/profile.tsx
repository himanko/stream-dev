import {
  User,
  Shield,
  BookOpen,
  Award,
  CreditCard,
  LogOut,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const TABS = [
  { path: "/profile/personal-info", label: "Personal Info", icon: User },
  { path: "/profile/security", label: "Security & Sign-in", icon: Shield },
  { path: "/profile/courses", label: "My Courses", icon: BookOpen },
  { path: "/profile/certificates", label: "Certificates", icon: Award },
  {
    path: "/profile/billing",
    label: "Payment & Subscription",
    icon: CreditCard,
  },
];

export default function Profile() {
  return (
    <div className="flex flex-col md:flex-row gap-8 min-h-[80vh] py-8">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="sticky top-24 space-y-1">
          <div className="mb-8 px-4 hidden md:block">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              My Account
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Manage your learning journey
            </p>
          </div>

          <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 hide-scrollbar px-2 md:px-0">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <NavLink
                  key={tab.path}
                  to={tab.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md whitespace-nowrap transition-colors ${
                      isActive
                        ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                        : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/50 dark:hover:text-white"
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </NavLink>
              );
            })}

            <div className="hidden md:block my-4 border-t border-zinc-200 dark:border-zinc-800" />

            <button className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-md whitespace-nowrap text-red-600 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-950/30 transition-colors">
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-3xl">
        {/* The Outlet acts as a window where your sub-pages will render */}
        <Outlet />
      </main>
    </div>
  );
}
