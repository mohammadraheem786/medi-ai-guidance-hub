
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LoaderProps {
  size?: "small" | "medium" | "large";
  color?: "primary" | "white" | "gray";
  className?: string;
  text?: string;
}

const Loader = ({
  size = "medium",
  color = "primary",
  className,
  text
}: LoaderProps) => {
  const sizeClasses = {
    small: "h-4 w-4",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  const colorClasses = {
    primary: "text-medical-500 dark:text-medical-400",
    white: "text-white",
    gray: "text-gray-500 dark:text-gray-400",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className={cn("relative", sizeClasses[size])}
      >
        <svg
          className={cn("animate-spin", colorClasses[color])}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </motion.div>
      {text && (
        <p className={cn("mt-2 text-sm", colorClasses[color])}>{text}</p>
      )}
    </div>
  );
};

export default Loader;
