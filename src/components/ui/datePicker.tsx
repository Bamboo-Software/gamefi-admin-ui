import * as React from "react"
import { format, setHours, setMinutes } from "date-fns"
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
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(date)

  const handleSelectDate = (date?: Date) => {
    if (!date) return
    const hours = selectedDate?.getHours() ?? 0
    const minutes = selectedDate?.getMinutes() ?? 0
    const updated = setMinutes(setHours(date, hours), minutes)
    setSelectedDate(updated)
    onChange?.(updated)
  }

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!selectedDate) return
    const value = parseInt(e.target.value, 10)
    let updated: Date
    if (e.target.name === "hours") {
      updated = setHours(selectedDate, value)
    } else {
      updated = setMinutes(selectedDate, value)
    }
    setSelectedDate(updated)
    onChange?.(updated)
  }

  const hoursOptions = Array.from({ length: 24 }, (_, i) => i)
  const minutesOptions = Array.from({ length: 60 }, (_, i) => i)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!selectedDate}
          className="data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(selectedDate, "PPP p") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4 space-y-2">
        <Calendar mode="single" selected={selectedDate} onSelect={handleSelectDate} />
        <div className="flex gap-2 items-center">
          <select
            name="hours"
            value={selectedDate?.getHours() ?? 0}
            onChange={handleTimeChange}
            className="border rounded px-2 py-1 "
          >
            {hoursOptions.map((hour) => (
              <option key={hour} value={hour} className='bg-popover text-white'>
                {hour.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
          <span>:</span>
          <select
            name="minutes"
            value={selectedDate?.getMinutes() ?? 0}
            onChange={handleTimeChange}
            className="border rounded px-2 py-1"
          >
            {minutesOptions.map((minute) => (
              <option key={minute} value={minute} className='bg-popover text-white'>
                {minute.toString().padStart(2, "0")}
              </option>
            ))}
          </select>
        </div>
      </PopoverContent>
    </Popover>
  )
}
