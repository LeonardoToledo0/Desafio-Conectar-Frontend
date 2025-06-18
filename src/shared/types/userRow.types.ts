export interface UserRowProps {
    image: string
    name: string;
    email: string;
    role: string;
    ativo: boolean;
    mode: "admin" | "user";
    userId: number
}