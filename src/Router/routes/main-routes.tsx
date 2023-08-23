import React, { Suspense, lazy } from "react";
import { Route } from "react-router-dom";

const MainLayout = lazy(() => import("src/layouts/MainLayout/MainLayout"));
const Index = lazy(() => import("src/pages/index"));
const SearchHotels = lazy(
    () => import("src/pages/index/search-hotel/search-hotel")
);
const MakeReservation=lazy(()=>import("src/pages/index/make-reservation/make-reservation"));
export default (
    <Route
        element={
            <Suspense fallback={<>Loading...</>}>
                <MainLayout />
            </Suspense>
        }
    >
        <Route
            path="/"
            element={
                <Suspense fallback={<>Loading...</>}>
                    <Index />
                </Suspense>
            }
        />
        <Route
            path="/make-reservation"
            element={
                <Suspense fallback={<>Loading...</>}>
                    <MakeReservation/>
                </Suspense>
            }
        >

        </Route>
        <Route
            path="/search"
            element={
                <Suspense fallback={<>Loading...</>}>
                    <SearchHotels />
                </Suspense>
            }
        />
    </Route>
);
