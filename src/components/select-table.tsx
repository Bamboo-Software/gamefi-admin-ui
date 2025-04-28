import { SelectContent, SelectItem } from '@/components/ui/select';

type Option = {
  value: string;
  label: string;
};

type GenericSelectContentProps = {
  options: Option[];
  itemClassName?: string;
};

const GenericSelectContent = ({ options, itemClassName = 'font-medium' }: GenericSelectContentProps) => {
  return (
    <SelectContent className="max-h-60 overflow-y-auto">
      {options.map(option => (
        <SelectItem key={option.value} value={option.value} className={itemClassName}>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  );
};

export default GenericSelectContent;
