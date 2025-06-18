import React, { useEffect, useState } from "react";
import { LoginRegisterForm } from "../../shared/components/loginRegisterForm";
import { validateEmail, validatePassword } from "../../shared/utils/validators";
import type { LoginData } from "../../shared/types/login.types";
import { userLogin } from "../../shared/service/auth.service";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { usePageTitle } from "../../shared/hooks/pageTitleContext";

export const Login: React.FC = () => {
    const { setTitle } = usePageTitle()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setTitle("Sing in • Desafio Conéctar");
    }, [setTitle]);

    const login = async (email: string, password: string) => {
        const emailErr = validateEmail(email);
        const passErr = validatePassword(password);

        if (emailErr || passErr) {
            toast.error(emailErr || passErr || "Erro de validação");
            return;
        }

        setIsLoading(true);
        try {
            const data: LoginData = { email, password };
            const response = await userLogin(data);

            if (response && response.access_token) {
                localStorage.setItem("access_token", response.access_token);
                localStorage.setItem("role", response.role.toLowerCase());
                localStorage.setItem("userId", response.userId.toString());
                // localStorage.setItem("name", response.name);
                // localStorage.setItem("email", response.email);
                toast.success("Login realizado com sucesso!");
                navigate("/perfil");
            } else {
                throw new Error("Token não encontrado na resposta.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Falha ao realizar login.");
            navigate("/");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginRegisterForm
            mode="login"
            onSubmit={({ email, password }) => login(email, password)}
            loading={isLoading}
        />
    );
};
