import ThemeToggle from "@/utils/theme-toggle";
import { ThreeDotNavbarButton } from "@/utils/three-dot-navbar-button";
// import { UserAvatarMenu } from "@/components/commons/user-avatar-menu";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky inset-x-0 top-0 z-50 bg-transparent backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-6 py-5 sm:px-12">
        {/* Logo / Home Link */}
        <Link to="/" className="group flex items-center gap-2">
          <div className="transition-transform group-hover:scale-110">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="size-8 fill-slate-400 stroke-slate-400 dark:fill-white dark:stroke-white"
            >
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            Fun With <span className="text-brand">Backend</span>
          </span>
        </Link>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 lg:gap-4">
          <ThemeToggle />
          <ThreeDotNavbarButton />
          {/* Added the User Avatar Menu right here! */}
          {/* <div className="hidden sm:block w-px h-6 bg-zinc-200 dark:bg-zinc-800 mx-1"></div>{" "} */}
          {/* Optional divider line */}
          {/* <UserAvatarMenu /> */}
        </div>
      </nav>
    </header>
  );
}
