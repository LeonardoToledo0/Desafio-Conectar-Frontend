export interface UpdateUserProps {
    initialName?: string;
    initialEmail?: string;
    onSubmit: (data: { name: string; email: string; password: string; status?: boolean; perfil?: string }) => void;

}
