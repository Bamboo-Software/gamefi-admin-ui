import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
  value?: string | Date
  onChange?: (date?: Date) => void
  name?: string
}

export function DatePicker({ value, onChange }: DatePickerProps) {
  const date = typeof value === "string" ? new Date(value) : value

  const handleSelect = (selectedDate?: Date) => {
    onChange?.(selectedDate)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!date}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar mode="single" selected={date} onSelect={handleSelect} />
      </PopoverContent>
    </Popover>
  )
}

