import React, { Suspense, lazy, useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout/MainLayout.tsx";
import Index from "src/pages/index/index.tsx";
import NotFound from "./pages/not-found/not-found.tsx";
import { PrimeReactContext } from "primereact/api";
import AppLayout from "./layouts/AppLayout/AppLayout.tsx";

const Login = lazy(() => import("./pages/auth/Login.tsx"));
const ListHotels = lazy(() => import("./pages/admin/hotels/index.tsx"));
const CreateHotels = lazy(
    () => import("./pages/admin/hotels/create_update.tsx")
);
const ListReferences = lazy(() => import("./pages/admin/references/index.tsx"));
const CreateReferences = lazy(
    () => import("./pages/admin/references/create_update.tsx")
);
const ListRooms = lazy(() => import("./pages/admin/rooms/index.tsx"));
const CreateRooms = lazy(() => import("./pages/admin/rooms/create_update.tsx"));
const Router = () => {
    const { setRipple } = useContext(PrimeReactContext);
    useEffect(() => setRipple(true));

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Index />} />
                </Route>
                <Route path="/auth">
                    <Route
                        path="/auth/login"
                        element={
                            <Suspense fallback={<>Loading...</>}>
                                <Login />
                            </Suspense>
                        }
                    />
                </Route>
                <Route element={<AppLayout />}>
                    <Route
                        path="/admin/hotels"
                        element={
                            <Suspense fallback={<>Loading...</>}>
                                <ListHotels />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        path="/admin/hotels/create"
                        element={
                            <Suspense fallback={<>Loading...</>}>
                                <CreateHotels />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        path="/admin/hotels/update/:id"
                        element={
                            <Suspense fallback={<>Loading...</>}>
                                <CreateHotels />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        path="/admin/rooms"
                        element={
                            <Suspense fallback={<>Loading...</>}>
                                <ListRooms />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        path="/admin/rooms/create"
                        element={
                            <Suspense fallback={<>Loading...</>}>
                                <CreateRooms />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        path="/admin/rooms/update/:id"
                        element={
                            <Suspense fallback={<>Loading...</>}>
                                <CreateRooms />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        path="/admin/references"
                        element={
                            <Suspense fallback={<>Loading...</>}>
                                <ListReferences />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        path="/admin/references/create"
                        element={
                            <Suspense fallback={<>Loading...</>}>
                                <CreateReferences />
                            </Suspense>
                        }
                    ></Route>
                    <Route
                        path="/admin/references/update/:id"
                        element={
                            <Suspense fallback={<>Loading...</>}>
                                <CreateReferences />
                            </Suspense>
                        }
                    ></Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
