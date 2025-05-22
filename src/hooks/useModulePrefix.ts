import { useGetMeQuery } from "@/services/auth";
import { useAppSelector } from "@/stores/store";

export const adminModule = ["lottery", "ai-gen"];

export const useModulePrefix = () => {
  const { data: getMe } = useGetMeQuery({});
  const adminModule = useAppSelector((state)=>state.theme.admin.value)
  const permissions = getMe?.data?.permissions ?? [];

  if (adminModule === "aigen" && permissions.includes(adminModule)) return "admin/ai-gen";
  if (adminModule === "lottery" && permissions.includes(adminModule)) return "admin/lottery";

  return "admin/default";
};