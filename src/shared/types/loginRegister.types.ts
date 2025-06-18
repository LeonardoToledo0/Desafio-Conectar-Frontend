

export interface LoginRegisterProps {
    mode: 'login' | 'register',
    onSubmit: (formData: { name: string, email: string, password: string, confirmPassword?: string }) => void
    loading?: boolean,
    errorMessage?: string


}