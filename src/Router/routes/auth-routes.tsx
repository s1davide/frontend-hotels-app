import React,{ Suspense, lazy } from "react";
import { Route } from "react-router-dom";

const Login = lazy(() => import("src/pages/auth/Login.tsx"));

export default    <Route path="/auth">
    <Route
        path="/auth/login"
        element={
            <Suspense fallback={<>Loading...</>}>
                <Login />
            </Suspense>
        }
    />
</Route>;