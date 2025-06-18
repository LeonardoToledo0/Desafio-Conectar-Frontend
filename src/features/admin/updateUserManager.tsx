/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "../../shared/components/layout";
import { UpdateUsermanagerForm } from "../../shared/components/updateUserManagerForm";
import { getUserById, updateUser, deleteUser } from "../../shared/service/user.service";
import { toast } from "react-toastify";
import axios from "axios";
import { usePageTitle } from "../../shared/hooks/pageTitleContext";

interface UserManagerFormState {
    initialName: string;
    initialImage: string;
    initialRole: string;
    initialStatus: boolean;

}
interface UserData {
    role: string;
    status: boolean;
}

export const UpdateUserManager: React.FC = () => {
    const { setTitle } = usePageTitle()
    const { userId } = useParams<{ userId: string }>();
    const [user, setUser] = useState<UserManagerFormState | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setTitle("Atulizar Usuário • Desafio Conéctar");
    }, [setTitle]);
    useEffect(() => {
        const fetchUser = async () => {
            const idNum = Number(userId);

            if (!userId || isNaN(idNum)) {
                toast.error("ID de usuário inválido na URL.");
                return;
            }

            try {
                const userData = await getUserById(idNum);

                if (!userData) {
                    toast.error("Usuário não encontrado.");
                    return;
                }

                setUser({
                    initialName: userData.name,
                    initialImage: userData.picture ?? `https://i.pravatar.cc/150?u=${idNum}`,
                    initialRole: userData.role,
                    initialStatus: userData.status,
                });
            } catch (err) {
                console.error(err);
                toast.error("Erro ao carregar dados do usuário.");
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
            navigate("/user");
        } catch (err) {
            if (axios.isAxiosError(err) && err.response?.status === 403) {
                toast.error("Você não tem permissão para alterar a senha de outro usuário.");
            } else {
                toast.error("Erro ao atualizar usuário.");
            }
        }
    };

    const handleDelete = async () => {
        if (!userId) return;

        const idNum = Number(userId);
        if (isNaN(idNum)) {
            toast.error("ID do usuário inválido");
            return;
        }

        try {
            await deleteUser(idNum);
            toast.success("Usuário deletado com sucesso!");
            navigate("/user");
        } catch (error) {
            toast.error("Erro ao deletar usuário.");
        }
    };

    return (
        <Layout title="Atualizar Perfil">
            <div className="w-full p-4">
                {user ? (
                    <>
                        <UpdateUsermanagerForm
                            {...user}
                            mode="admin"
                            onUpdate={handleUpdate}
                            onDelete={() => setIsModalOpen(true)}
                        />
                        {isModalOpen && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white rounded-lg p-6 max-w-sm w-full">
                                    <h2 className="text-lg font-semibold mb-4">Confirmação</h2>
                                    <p className="mb-6">Tem certeza que deseja deletar este usuário?</p>
                                    <div className="flex justify-end space-x-4">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDelete();
                                                setIsModalOpen(false);
                                            }}
                                            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                                        >
                                            Deletar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-6">Carregando usuário…</div>
                )}
            </div>
        </Layout>
    );
};
