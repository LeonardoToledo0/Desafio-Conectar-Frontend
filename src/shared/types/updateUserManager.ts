export interface UpdateUserManagerProps {
    initialName: string;
    initialImage: string;
    initialStatus: boolean;
    initialRole: string;
    onUpdate: (data: { status: boolean; role: string }) => void;
    onDelete: () => void;
    mode: "admin" | "user";
}