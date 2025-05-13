import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Option = {
  label: string;
  value: string;
};

const MultiSelectField = ({
  selected,
  onChange,
  options,
  placeholder = "Select options",
}: {
  selected: string[];
  onChange: (value: string[]) => void;
  options: Option[];
  placeholder?: string;
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
            ? options
                ?.filter((opt) => selected.includes(opt.value))
                ?.map((opt) => opt.label)
                ?.join(", ")
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex flex-col gap-2">
          {options?.map((option) => (
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

export default MultiSelectField;
