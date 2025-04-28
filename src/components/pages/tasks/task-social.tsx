import { SocialTaskTypeEnum } from "@/enums/task.enums";
import { getSocialTypeVisual } from "@/utils";

const SocialTypeCol = ({ type }: { type: SocialTaskTypeEnum }) => {
    const { icon, text, textColor } = getSocialTypeVisual(type);
  
    return (
      <div className={`flex items-center gap-2`}>
        <span className={`${textColor}`}>{icon}</span>
        <span className="text-sm font-semibold capitalize">
          {text}
        </span>
      </div>
    );
  };
  
export default SocialTypeCol