// import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import { CgProfile } from "react-icons/cg";
import { FaPowerOff } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { useLocalStorage } from "react-use";
import { routesPaths } from '@/constants/routes';
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
// import { Button } from "../ui/button";

export function Header() {
    const [, , remove] = useLocalStorage("auth-token", "foo");

    const handleLogout = async () => {
        try {
            remove();
            window.location.href = routesPaths.AUTH;
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <header className="p-5 flex flex-row justify-between items-center shadow-2xs">

            <motion.span
                className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
             bg-clip-text text-transparent text-xl font-bold"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                Admin Dashboard Pro
            </motion.span>
            <div className="flex flex-row justify-evenly items-center space-x-3">
               
            <Button
              variant="outline"
              className="flex items-center shadow-2xl sm:shadow-lg md:shadow-2xl border-none size-8 sm:size-9 md:size-10 rounded-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-1 sm:focus:ring-2 dark:focus:ring-gray-500 focus:ring-offset-1 sm:focus:ring-offset-2 dark:focus:ring-offset-gray-900 bg-gray-50 hover:bg-gray-300 text-gray-900 border-gray-400 focus:ring-gray-300 focus:ring-offset-gray-100"
            >
              <Search />
            </Button>
            <ModeToggle />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="cursor-pointer hover:ring-2 ring-offset-1 sm:ring-offset-2 hover:ring-gray-300 dark:hover:ring-gray-400 shadow-md sm:shadow-lg md:shadow-2xl transition-all h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10">
                            <AvatarImage src={"https://github.com/shadcn.png"} alt="avatar" />
                            <AvatarFallback className="text-xs sm:text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                cF
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="bg-white dark:bg-gray-800 border space-y-2 my-1 border-gray-200 dark:border-gray-700 mt-1 sm:mt-2 p-1.5 sm:p-2 text-gray-900 dark:text-gray-100 w-32 sm:w-36 md:w-40 rounded-md shadow-lg"
                    >
                        <DropdownMenuItem onClick={() => { }} className="flex flex-row justify-start items-center cursor-pointer p-1 sm:p-1.5 md:p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-xs sm:text-sm">
                            <CgProfile className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-900 dark:text-gray-100" />
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="flex flex-row justify-start items-center cursor-pointer p-1 sm:p-1.5 md:p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700 text-red-500 dark:text-red-400 focus:text-red-500 dark:focus:text-red-400 text-xs sm:text-sm">
                            <FaPowerOff className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-red-500 dark:text-red-400" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}