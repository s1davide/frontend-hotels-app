import React, {  useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NotFound from "../pages/not-found/not-found.tsx";
import { PrimeReactContext } from "primereact/api";
import MainRoutes from "./routes/main-routes.tsx";
import AdminRoutes from "./routes/app-routes.tsx";
import  LoginRoutes from "./routes/auth-routes.tsx";

const Router = () => {
    const { setRipple } = useContext(PrimeReactContext);
    useEffect(() => setRipple(true));

    return (
        <BrowserRouter>
            <Routes>
                {MainRoutes}
                {LoginRoutes}
                {AdminRoutes}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
