import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldValues, Path } from "react-hook-form";

type RenderFieldProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    inputClassName?: string;
  };
  
const InputForm = <T extends FieldValues>({
    control,
    name,
    label,
    type = 'text',
    placeholder,
    disabled,
    inputClassName,
  }: RenderFieldProps<T>) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-700 dark:text-gray-300">{label}</FormLabel>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={inputClassName || "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
};
  
export default InputForm