import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Option {
  label?: string
  value: string
}

interface SingleComboboxProps {
  options: Option[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  placeholder?: string
  onSearch?: (query: string) => void
  returnAsArray?: boolean
  disabled?: boolean
  className?: string
}


const SingleCombobox = ({
  options,
  value,
  onChange,
  onSearch,
  placeholder = "Select option...",
  returnAsArray = false,
  className,
}: SingleComboboxProps) => {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const selectedValue = Array.isArray(value) ? value[0] : value
  const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label ?? ""

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(className, "w-full justify-between")}
        >
          {selectedLabel || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command shouldFilter={false}>
          <CommandInput
            placeholder="Search..."
            value={inputValue}
            onValueChange={(val) => {
              setInputValue(val)
              onSearch?.(val)
            }}
          />
          <CommandList>
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value=""
                  onSelect={() => {
                    const newValue = option.value
                    onChange(returnAsArray ? [newValue] : newValue)
                    setOpen(false)
                  }}
                  className="max-w-[400px] text-ellipsis truncate"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedValue === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label || option.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SingleCombobox