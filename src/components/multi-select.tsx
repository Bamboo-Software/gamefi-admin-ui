import { DIFFICULTY_OPTIONS } from "@/constants/games";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const MultiSelectField = ({ selected, onChange }: {
  selected: string[];
  onChange: (value: string[]) => void;
}) => {
  const toggleValue = (val: string) => {
    if (selected.includes(val)) {
      onChange(selected.filter((v) => v !== val));
    } else {
      onChange([...selected, val]);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          {selected.length > 0
            ? selected.join(", ")
            : "Select difficulty levels"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex flex-col gap-2">
          {DIFFICULTY_OPTIONS.map((option) => (
            <label key={option.value} className="flex items-center gap-2">
              <Checkbox
                checked={selected.includes(option.value)}
                onCheckedChange={() => toggleValue(option.value)}
              />
              {option.label}
            </label>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default MultiSelectField