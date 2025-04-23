declare global {
    export interface TableHeadSortableProps {
        onClick?: () => void;
        sortConfig: { key: string; direction: 'ASC' | 'DESC' } | null;
        columnKey: string;
        icon: React.ReactNode;
        title: string;
    }
}
export {};