import React, { createContext, useContext, useEffect, useState } from "react";

interface PageTitleContextType {
    setTitle: (title: string) => void;
}

const PageTitleContext = createContext<PageTitleContextType>({
    setTitle: () => { },
});

export const PageTitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState("Desafio Conéctar");

    useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <PageTitleContext.Provider value={{ setTitle }}>
            {children}
        </PageTitleContext.Provider>
    );
};

export const usePageTitle = () => useContext(PageTitleContext);
