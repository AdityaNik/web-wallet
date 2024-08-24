"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";

export function ModeButton() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    console.log("Cuurent Theme: " + theme);
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  return (
    <div className="flex items-center gap-2">
      <Sun
        className={`h-5 w-5 ${isDarkMode ? "text-primary/50" : "text-primary"}`}
      />
      <Switch
        checked={isDarkMode}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
      <Moon
        className={`h-5 w-5 ${isDarkMode ? "text-primary" : "text-primary/50"}`}
      />
    </div>
  );
}
