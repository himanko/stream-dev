import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "@/components/commons/theme-provider";
import { Button } from "@/components/ui/button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="w-9 h-9 rounded-md p-0"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FaSun className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <FaMoon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
