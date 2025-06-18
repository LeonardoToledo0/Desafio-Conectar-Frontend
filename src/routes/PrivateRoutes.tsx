
import React from "react";
import { Outlet } from "react-router-dom";
import { AccessDenied } from "../features/auth/AccessDenied";


const isAuthenticated = () => !!localStorage.getItem("access_token");

export const PrivateRoute: React.FC = () =>
    isAuthenticated() ? <Outlet /> : <AccessDenied />;
