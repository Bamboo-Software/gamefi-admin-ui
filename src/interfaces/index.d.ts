declare global {
    export interface TableHeadSortableProps {
        onClick?: () => void;
        sortConfig: { key: string; direction: 'ASC' | 'DESC' } | null;
        columnKey: string;
        icon: React.ReactNode;
        title: string;
  }
  export interface TableColumn {
    columnKey: string;
    title: string;
    icon: JSX.Element;
  }
    export interface AdminTableProps<T> {
        data: T[];
        isLoading: boolean;
        sortConfig: {
          key: string;
          direction: "ASC" | "DESC";
        } | null;
      handleSort: (key: string) => void;
      columns: TableColumn[];
      renderCell: (config: CellConfig, index: number) => JSX.Element;
        handleSelectAll?: () => void;
        selectedUsers: string[];
        handleSelect: (id: string) => void;
        handleDelete: (item: T) => void;
      setCurrent: (item: T) => void;
      setIsViewOpen: (open: boolean) => void;
        setIsEditOpen: (open: boolean) => void;
        getStatusColor: (active: boolean) => string;
        getCellConfigs: (
          item: T,
          utils: {
            handleDelete: (item: T) => void;
            setCurrent: (item: T) => void;
            setIsViewOpen: (open: boolean) => void;
            setEditOpen: (open: boolean) => void;
            getStatusColor: (active: boolean) => string;
            formatDate: (date?: string) => string;
          }
        ) => CellProps[];
  }
  export interface QueryRequest {
    page?: number;
    q?: string;
    limit?: number;
    orderField?: string;
    offset?: number;
    orderDirection?: string
  }

}
export {};