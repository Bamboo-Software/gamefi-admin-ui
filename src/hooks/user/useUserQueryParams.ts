import { useMemo } from "react";

interface UseUserQueryParamsProps {
  currentPage: number;
  itemsPerPage: number;
  debouncedSearchTerm: string;
  role: string;
  active: string;
  sortConfig: { key: string; direction: "ASC" | "DESC" } | null;
}

const useUserQueryParams = ({
  currentPage,
  itemsPerPage,
  debouncedSearchTerm,
  role,
  active,
  sortConfig,
}: UseUserQueryParamsProps) => {
  const queryParams = useMemo(() => {
    const rawParams = {
      page: currentPage,
      limit: itemsPerPage,
      offset: (currentPage - 1) * itemsPerPage,
      email: debouncedSearchTerm,
      q: debouncedSearchTerm,
      username: debouncedSearchTerm,
      role,
      active,
      orderField: sortConfig?.key ?? "createdAt",
      orderDirection: sortConfig?.direction ?? "DESC",
    };

    return Object.fromEntries(
      Object.entries(rawParams).filter(([, value]) => value !== "")
    );
  }, [currentPage, itemsPerPage, debouncedSearchTerm, role, active, sortConfig]);

  return queryParams;
};

export default useUserQueryParams;