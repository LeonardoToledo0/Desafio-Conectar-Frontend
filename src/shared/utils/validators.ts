
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^\d{6}$/;

export function validateEmail(email: string): string | null {
    return emailRegex.test(email) ? null : "E‑mail inválido";
}

export function validatePassword(pass: string): string | null {
    return passwordRegex.test(pass)
        ? null
        : "A senha deve ter exatamente 6 dígitos numéricos";
}
