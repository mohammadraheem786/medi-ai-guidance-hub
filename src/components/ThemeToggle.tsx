
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={theme}
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5 text-yellow-300" />
        ) : (
          <Moon className="h-5 w-5 text-slate-700" />
        )}
      </motion.div>
    </Button>
  );
};

export default ThemeToggle;
