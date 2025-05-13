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

interface MultiComboboxProps {
  options: Option[]
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
  displayValue?: (values: string[]) => string;
}

export const MultiCombobox =  React.memo(({
  options,
  values,
  onChange,
  onSearch,
  className,
  displayValue,
  placeholder = "Select options...",
}: MultiComboboxProps) => {
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")

  const toggleValue = (val: string) => {
    if (values.includes(val)) {
      onChange(values.filter((v) => v !== val))
    } else {
      onChange([...values, val])
    }
  }

const buttonText = displayValue
    ? displayValue(values)
    : values
        .map((val) => options.find((opt) => opt.value === val)?.label)
        .filter(Boolean)
        .join(", ") || placeholder;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(className,"w-full justify-between")}
        >
          {buttonText}
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
          <CommandList className="max-h-[200px] overflow-y-auto" >
            <CommandEmpty>No result found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const label = option.label || option.value
                return (
                  <CommandItem
                    key={option.value}
                    value=""
                    onSelect={() => toggleValue(option.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        values.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {label}
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
})
