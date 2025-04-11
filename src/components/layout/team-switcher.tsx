import * as React from "react";
import {
  CaretSortIcon,
  CheckIcon,
  PlusCircledIcon,
} from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Team = {
  label: string;
  value: string;
};

const teams: Team[] = [
  {
    label: "Lottery Game",
    value: "personal",
  },
  {
    label: "Lottery AI",
    value: "team-a",
  },
  {
    label: "AI Agent",
    value: "team-b",
  },
];

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface TeamSwitcherProps extends PopoverTriggerProps {
  isCollapsed?: boolean;
  darkMode?: boolean;
}

export function TeamSwitcher({ className, isCollapsed = false }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [selectedTeam, setSelectedTeam] = React.useState<Team>(teams[0]);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn(
              "justify-between transition-all duration-200 bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200",
              isCollapsed ? "w-10 p-2" : "w-full",
              className
            )}
            title={isCollapsed ? selectedTeam.label : undefined}
          >
            <Avatar className={cn("h-5 w-5", isCollapsed ? "mr-0" : "mr-2")}>
              <AvatarImage
                src={`https://avatar.vercel.sh/${selectedTeam.value}.png`}
                alt={selectedTeam.label}
              />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
            {!isCollapsed && (
              <>
                {selectedTeam.label}
                <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn(
          "w-[200px] p-0 bg-gray-100 border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200", 
          
        )}>
          <Command>
            <CommandList>
              <CommandInput placeholder="Search project..." className={"text-gray-200 dark:text-gray-800"} />
              <CommandEmpty>No project found.</CommandEmpty>
              <CommandGroup heading="Projects">
                {teams.map((team) => (
                  <CommandItem
                    key={team.value}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                    className={cn(
                      "text-sm", 
                      "dark:hover:bg-gray-700 hover:bg-gray-100"
                    )}
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${team.value}.png`}
                        alt={team.label}
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    {team.label}
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTeam.value === team.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
            <CommandSeparator className={"dark:bg-gray-700 bg-gray-200"} />
            <CommandList>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    setShowNewTeamDialog(true);
                    setOpen(false);
                  }}
                  className={"dark:hover:bg-gray-700 hover:bg-gray-100"}
                >
                  <PlusCircledIcon className="mr-2 h-5 w-5" />
                  Create project
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <DialogContent className={cn("dark:g-gray-800 dark:border-gray-700 dark:text-gray-200 bg-white border-gray-200 text-gray-800")}>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription className={"dark:text-gray-400 text-gray-500"}>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input
                id="name"
                placeholder="Acme Inc."
                className={cn("dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 bg-white border-gray-300 text-gray-800")}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setShowNewTeamDialog(false)}
            className={cn("dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600 bg-gray-100 border-gray-300 text-gray-800 hover:bg-gray-200")}
          >
            Cancel
          </Button>
          <Button onClick={() => setShowNewTeamDialog(false)}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}