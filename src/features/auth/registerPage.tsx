import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginRegisterForm } from "../../shared/components/loginRegisterForm";
import type { RegisterData } from "../../shared/types/registerData";
import { userRegister } from "../../shared/service/auth.service";

import { validateEmail, validatePassword } from "../../shared/utils/validators";
import { toast } from "react-toastify";
import { usePageTitle } from "../../shared/hooks/pageTitleContext";

export const Register: React.FC = () => {
    const { setTitle } = usePageTitle()
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTitle("Sing up • Desafio Conéctar");
    }, [setTitle]);

    const register = async (
        name: string,
        email: string,
        password: string,
        confirmPassword: string
    ) => {
        const emailErr = validateEmail(email);
        const passErr = validatePassword(password);
        const confirmErr = password !== confirmPassword ? "As senhas não coincidem." : null;

        if (emailErr || passErr || confirmErr) {
            toast.error(emailErr || passErr || confirmErr || "Erro de validação");
            return;
        }

        setIsLoading(true);
        try {
            const data: RegisterData = { name, email, password };
            await userRegister(data);
            toast.success("Usuário registrado com sucesso!");

            navigate("/3");
        } catch (err) {
            console.error(err);
            toast.error("Falha ao cadastrar usuário.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <LoginRegisterForm
            mode="register"
            onSubmit={({ name, email, password, confirmPassword }) =>
                register(name ?? "", email, password, confirmPassword ?? "")
            }
            loading={isLoading}
        />
    );
};
