import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";
// import AppLayout from "src/layouts/AppLayout/AppLayout";
const AppLayout = lazy(() => import("src/layouts/AppLayout/AppLayout"));

const ListHotels = lazy(() => import("src/pages/admin/hotels/index.tsx"));
const CreateHotels = lazy(
    () => import("src/pages/admin/hotels/create_update.tsx")
);

const ListReferences = lazy(
    () => import("src/pages/admin/references/index.tsx")
);
const CreateReferences = lazy(
    () => import("src/pages/admin/references/create_update.tsx")
);

const ListRooms = lazy(() => import("src/pages/admin/rooms/index.tsx"));
const CreateRooms = lazy(
    () => import("src/pages/admin/rooms/create_update.tsx")
);
export default   (
    <Route element={ <Suspense fallback={<>Loading...</>}><AppLayout /></Suspense>}>
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
);
