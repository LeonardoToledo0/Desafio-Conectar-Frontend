
export interface DataTableProps {
    columns: string[];
    children: React.ReactNode;
    actionBar?: React.ReactNode;
    title?: string;
    mode: "admin" | "user";
}