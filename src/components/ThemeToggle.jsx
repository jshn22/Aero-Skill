import { useTheme } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="relative w-14 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 flex items-center border border-gray-300 dark:border-gray-600"
    >
      <span
        className={`absolute left-1 w-6 h-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center transition-transform duration-300 shadow-md ${
          theme === "dark" ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {theme === "dark" ? (
          <Moon className="w-4 h-4 text-white" strokeWidth={2} />
        ) : (
          <Sun className="w-4 h-4 text-black" strokeWidth={2} />
        )}
      </span>
    </button>
  );
};

export default ThemeToggle;
