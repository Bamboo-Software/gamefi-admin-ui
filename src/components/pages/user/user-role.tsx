import { getRoleVisual } from "@/utils"

const RoleCol = ({ role }:{role:string}) => {
    return (
        <>
            <div className="flex items-center gap-2">
                {getRoleVisual(role).icon}
                <span className={`text-sm font-semibold capitalize ${getRoleVisual(role).textColor}`}>
                    {getRoleVisual(role).text}
                </span>
            </div>
        </>
    )
}
export default RoleCol