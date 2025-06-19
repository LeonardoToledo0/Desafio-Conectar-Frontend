import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { User } from "../features/users/userPage";
import { Admin } from "../features/admin/adminPages";
import { Login } from "../features/auth/loginPage";
import { Register } from "../features/auth/registerPage";
import { UpdateUser } from "../features/users/updateUserPage";
import { UpdateUserManager } from "../features/admin/updateUserManager";
import { PrivateRoute } from "./PrivateRoutes";
import { AccessDenied } from "../features/auth/AccessDenied";
import { UserInactives } from "../features/admin/userInactives";


export const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/error" element={<AccessDenied />} />




                <Route element={<PrivateRoute />}>
                    <Route path="/perfil" element={<User />} />
                    <Route path="/perfil/update/:userId" element={<UpdateUser />} />
                    <Route path="/user" element={<Admin />} />
                    <Route path="/perfil/update/Manager/:userId" element={<UpdateUserManager />} />
                    <Route path="/users/inactives" element={<UserInactives />} />
                </Route>
            </Routes>
        </Router>
    );
};
