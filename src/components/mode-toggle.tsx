/* eslint-disable @typescript-eslint/no-unused-vars */
import { Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { setTheme, Theme } from "@/stores/theme/themeSlice";
import { useEffect, useState } from "react";
import { useLocalStorage } from "react-use";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";

export function ModeToggle() {
  const [localTheme, setLocalTheme] = useState<Theme>("system");

  // Safely access Redux state with fallback
  const theme = useAppSelector((state) => state.theme?.theme) || localTheme;
  const dispatch = useAppDispatch();
  const [storedTheme, setStoredTheme] = useLocalStorage<Theme>("theme", "system");

  useEffect(() => {
    const initialTheme = storedTheme || "system";
    if (initialTheme !== theme) {
      try {
        dispatch(setTheme(initialTheme));
      } catch (error) {
        // Fallback to local state if Redux dispatch fails
        setLocalTheme(initialTheme);
      }
    }
  }, [storedTheme, theme, dispatch]);

  // Theme effect removed as it's handled by ThemeProvider

  const handleThemeChange = (newTheme: Theme) => {
    setStoredTheme(newTheme);
    try {
      dispatch(setTheme(newTheme));
    } catch (error) {
      // Fallback to local state if Redux dispatch fails
      setLocalTheme(newTheme);
    }
  };

  return (
    <DropdownMenu>
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center shadow-2xl sm:shadow-lg md:shadow-2xl border-none size-8 sm:size-9 md:size-10 rounded-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-1 sm:focus:ring-2 dark:focus:ring-gray-500 focus:ring-offset-1 sm:focus:ring-offset-2 dark:focus:ring-offset-gray-900 bg-gray-50 hover:bg-gray-300 text-gray-900 border-gray-400 focus:ring-gray-300 focus:ring-offset-gray-100"
            >
              <span className="flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4">
                {theme === "system" && (<Laptop className="h-3.5 w-3.5 sm:h-4 sm:w-4" />)}
                {theme === "light" && (<Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />)}
                {theme === "dark" && (<Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />)}
              </span>
            </Button>
          </DropdownMenuTrigger>
        </HoverCardTrigger>
        <HoverCardContent className="bg-white rounded-md dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 py-1 sm:py-2 mt-1 sm:mt-2 shadow-lg sm:shadow-4xl px-2 w-fit">
          <p className="text-[10px] sm:text-xs">Appearance</p>
        </HoverCardContent>
      </HoverCard>

      <DropdownMenuContent
        align="end"
        className="p-1.5 sm:p-2 dark:bg-gray-800  rounded-md dark:text-gray-100 bg-gray-50  text-gray-900 min-w-[120px] sm:min-w-[140px]"
      >
        
        <DropdownMenuItem
          onClick={() => handleThemeChange("system")}
          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm dark:hover:bg-gray-700 dark:focus:bg-gray-700 focus:outline-none hover:bg-gray-300 focus:bg-gray-300"
        >
          <span className="flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4">
            <Laptop className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="text-xs sm:text-sm">OS Default</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("light")}
          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm dark:hover:bg-gray-700 dark:focus:bg-gray-700 focus:outline-none hover:bg-gray-300 focus:bg-gray-300">
          <span className="flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4">
            <Sun className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="text-xs sm:text-sm">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange("dark")}
          className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-sm dark:hover:bg-gray-700 dark:focus:bg-gray-700 focus:outline-none hover:bg-gray-300 focus:bg-gray-300">
          <span className="flex items-center justify-center w-3.5 h-3.5 sm:w-4 sm:h-4">
            <Moon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="text-xs sm:text-sm">Dark</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}