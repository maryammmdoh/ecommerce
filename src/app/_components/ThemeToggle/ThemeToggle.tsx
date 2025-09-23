"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
// import { Moon, Sun } from "lucide-react"; // icons

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            className="bg-purple-300 hover:bg-purple-300 border-0 hover:text-purple-600 shadow-none"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            {/* {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />} */}
            {theme === "dark" ? <i className="fas fa-sun "></i> : <i className="fas fa-moon "></i>}
        </Button>
    );
}