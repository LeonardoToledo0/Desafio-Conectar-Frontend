import React from "react";
import { AppRoutes } from "./routes/routes";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./shared/hooks/authContext";
import { PageTitleProvider } from "./shared/hooks/pageTitleContext";

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <PageTitleProvider>
        <ToastContainer />
        <AppRoutes />
      </PageTitleProvider>
    </AuthProvider>
  );
};
