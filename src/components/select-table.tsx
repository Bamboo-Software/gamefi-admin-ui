import { SelectContent, SelectItem } from '@/components/ui/select';
import { ROW_OPTIONS } from '@/constants';


const RowsSelectContent = () => {
  return (
    <SelectContent >
      {ROW_OPTIONS.map(option => (
        <SelectItem key={option.value} value={option.value} className='font-medium'>
          {option.label}
        </SelectItem>
      ))}
    </SelectContent>
  );
};

export default RowsSelectContent;
