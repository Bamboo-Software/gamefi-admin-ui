import { TaskTypeEnum } from "@/enums/task.enums";
import { getTypeVisual } from "@/utils";

const TypeCol = ({ type }: { type: TaskTypeEnum }) => {
  const { icon, text } = getTypeVisual(type);

  return (
      <div className="flex items-center gap-2">
          {icon}
          <span className={`text-sm font-semibold capitalize`}>
              {text}
          </span>
      </div>
  );
};
export default TypeCol