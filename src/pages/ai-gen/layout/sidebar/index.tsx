import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import {
  Settings,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  UsersRound,
  ChartArea,
  Target,
  FileStack,
  Package,
  LayoutTemplate,
} from "lucide-react";
import { useState } from "react";
import { routesPaths } from "@/constants/routes";
import { Button } from "@/components/ui/button";

interface AiGenSidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  onCollapse?: (collapsed: boolean) => void;
}
const {
  AI_GEN_OVERVIEW,
  AI_GEN_ANALYTIC,
  AI_GEN_TEMPLATES,
  AI_GEN_USERS,
  AI_GEN_HISTORY,
  AI_GEN_MODEL_STYLE,
  AI_GEN_SETTINGS,
  AI_GEN_HELP,
} = routesPaths;

export function AiGenSidebar({ className, onCollapse }: AiGenSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onCollapse) {
      onCollapse(newCollapsedState);
    }
  };

  const generalItems = [
    {
      title: "Overview",
      icon: (
        <Target className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")} />
      ),
      href: AI_GEN_OVERVIEW,
    },
    {
      title: "Analytic",
      icon: (
        <ChartArea
          className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")}
        />
      ),
      href: AI_GEN_ANALYTIC,
    },
  ];

  const manageItems = [
    {
      title: "Users",
      icon: (
        <UsersRound
          className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")}
        />
      ),
      href: AI_GEN_USERS,
    },
    {
      title: "Templates",
      icon: (
        <LayoutTemplate
          className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")}
        />
      ),
      href: AI_GEN_TEMPLATES,
    },
    {
      title: "History",
      icon: (
        <FileStack className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")} />
      ),
      href: AI_GEN_HISTORY,
    },
    {
      title: "Model vs Style",
      icon: (
        <Package
          className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")}
        />
      ),
      href: AI_GEN_MODEL_STYLE,
    },
  ];

  const otherItems = [
    {
      title: "Settings",
      icon: (
        <Settings className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")} />
      ),
      href: AI_GEN_SETTINGS,
    },
    {
      title: "Help",
      icon: (
        <HelpCircle
          className={cn("h-4 w-4", isCollapsed ? "mx-auto" : "mr-2")}
        />
      ),
      href: AI_GEN_HELP,
    },
  ];
  return (
    <div
      className={cn(
        "flex flex-col h-full transition-all duration-300",
        isCollapsed ? "w-18" : "w-64",
        className
      )}
    >
      <div className="flex-1 relative">
        <div
          className={`absolute transition-all duration-300 top-1/2 -translate-y-1/2 ${
            isCollapsed ? "left-14" : "left-60"
          }  z-10 flex flex-col gap-2`}
        >
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "size-8 rounded-full p-0 shadow-md",
              "bg-gray-200 dark:bg-gray-800",
              "text-gray-700 dark:text-gray-200",
              "hover:bg-gray-300 dark:hover:bg-gray-700"
            )}
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="size-4" />
            ) : (
              <ChevronLeft className="size-4" />
            )}
          </Button>
        </div>

        <div className="space-y-4 py-4">
          <div className="px-4 py-2">
            {!isCollapsed && (
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                General
              </h2>
            )}
            <div className="space-y-1">
              {generalItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
                      isCollapsed && "justify-center p-2"
                    )
                  }
                  title={isCollapsed ? item.title : ""}
                >
                  {item.icon}
                  {!isCollapsed && item.title}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="px-4 py-2 border-t ">
            {!isCollapsed && (
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                JFox AI Generator
              </h2>
            )}
            <div className="space-y-1">
              {manageItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end
                  className={({ isActive }) =>
                    cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
                      isCollapsed && "justify-center p-2"
                    )
                  }
                  title={isCollapsed ? item.title : ""}
                >
                  {item.icon}
                  {!isCollapsed && item.title}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="px-4 py-2 border-t ">
            {!isCollapsed && (
              <h2 className="mb-2 px-2 text-lg font-semibold tracking-tight">
                Other
              </h2>
            )}
            <div className="space-y-1">
              {otherItems.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
                      isCollapsed && "justify-center p-2"
                    )
                  }
                  title={isCollapsed ? item.title : ""}
                >
                  {item.icon}
                  {!isCollapsed && item.title}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
