import { useNavigate } from "react-router-dom";
import { useAuth } from "./authContext";


export const useLogout = () => {
    const { dispatch } = useAuth();
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("role");
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        localStorage.removeItem("name");

        dispatch({ type: "LOGOUT" });

        navigate("/", { replace: true });
    };

    return logout;
};
