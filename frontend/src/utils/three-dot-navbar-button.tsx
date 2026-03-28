import {
  MoreVertical,
  BookOpen,
  GraduationCap,
  LogIn, // <-- Imported the LogIn icon here
  UserRound,
} from "lucide-react";
import { FaYoutube, FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

export function ThreeDotNavbarButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full h-9 w-9"
          aria-label="More resources"
        >
          <MoreVertical className="h-5 w-5 opacity-70" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 p-2">
        {/* The "Value" Section */}
        <DropdownMenuItem asChild>
          <Link to="/notes" className="flex items-center gap-2 cursor-pointer">
            <BookOpen className="h-4 w-4 text-brand" />
            <span>Free Backend Notes</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href="https://youtube.com/@funwithbackend"
            target="_blank"
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaYoutube className="h-4 w-4 text-red-500" />
            <span>YouTube Tutorials</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* The "Premium" Section */}
        <DropdownMenuItem asChild>
          <a
            href="https://udemy.com/..."
            target="_blank"
            className="flex items-center gap-2 cursor-pointer font-semibold"
          >
            <GraduationCap className="h-4 w-4 text-indigo-600" />
            <span>Udemy Mastery Courses</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* The "Community" Section */}
        <DropdownMenuItem asChild>
          <a
            href="https://github.com/..."
            target="_blank"
            className="flex items-center gap-2 cursor-pointer"
          >
            <FaGithub className="h-4 w-4" />
            <span>Open Source Projects</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator /> {/* <-- Added a separator here */}
        {/* Authentication Section */}
        <DropdownMenuItem asChild>
          {/* Swapped to React Router's Link, removed target="_blank", and changed the path */}
          <Link
            to="/sign-in"
            className="flex items-center gap-2 cursor-pointer"
          >
            <LogIn className="h-4 w-4" /> {/* <-- Swapped to the LogIn icon */}
            <span>Log In</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator /> {/* <-- Added a separator here */}
        {/* Profile Section */}
        <DropdownMenuItem asChild>
          {/* Swapped to React Router's Link, removed target="_blank", and changed the path */}
          <Link
            to="/profile"
            className="flex items-center gap-2 cursor-pointer"
          >
            <UserRound className="h-4 w-4" />{" "}
            {/* <-- Swapped to the LogIn icon */}
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
