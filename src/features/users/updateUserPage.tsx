import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

import { Layout } from "../../shared/components/layout";
import { UpdateUserForm } from "../../shared/components/updateUserFrom";
import { getUserById, updateUser } from "../../shared/service/user.service";
import { UserRowSkeleton } from "../../shared/components/skeleton";
import { usePageTitle } from "../../shared/hooks/pageTitleContext";

interface UserData {
    name: string;
    email: string;
    password?: string;
}

export const UpdateUser: React.FC = () => {
    const { setTitle } = usePageTitle()
    const { userId } = useParams<{ userId: string }>();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        setTitle("Atulizar Perfil • Desafio Conéctar");
    }, [setTitle]);

    useEffect(() => {
        const fetchUser = async () => {
            if (!userId) return;

            const idNum = Number(userId);
            if (isNaN(idNum)) {
                toast.error("ID do usuário inválido");
                return;
            }

            try {
                setIsLoading(true);
                const data = await getUserById(idNum);
                setUserData({
                    name: data.name,
                    email: data.email,
                });
            } catch (error) {
                console.error("Erro ao buscar usuário:", error);
                toast.error("Erro ao carregar dados do usuário.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const handleUpdate = async (formData: UserData) => {
        if (!userId) return;

        const idNum = Number(userId);
        if (isNaN(idNum)) {
            toast.error("ID do usuário inválido");
            return;
        }

        try {
            await updateUser(idNum, formData);
            toast.success("Perfil atualizado com sucesso!");
            navigate("/perfil");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 403) {
                toast.error("Você não tem permissão para alterar a senha de outro usuário.");
            } else {
                toast.error("Erro ao atualizar usuário.");
            }
        }
    };

    return (
        <Layout title="Atualizar Perfil">
            <div>
                {isLoading ? (
                    <>
                        <UserRowSkeleton />

                    </>
                ) : (
                    userData && (
                        <UpdateUserForm
                            initialName={userData.name}
                            initialEmail={userData.email}
                            onSubmit={handleUpdate}
                        />
                    )
                )}
            </div>
        </Layout>
    );
};
