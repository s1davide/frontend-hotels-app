import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "./MainLayout.scss";

import "primeflex/primeflex.min.css";
import "primeicons/primeicons.css";
import MainHeader from "src/components/organisms/Headers/MainHeader/MainHeader";
import MainFooter from "src/components/organisms/Footers/MainFooter/MainFooter";

const MainLayout = () => {
    const routesWithouthMainTitle=["/make-reservation"];
    const location= useLocation();
    useEffect(()=>{
        document.body.setAttribute("style", "overflow: auto;");
    },[location]);
    return (
        <div className="mainlayout p-component w-full ">
            <div className="sizecomponent flex flex-column align-items-center">
                <MainHeader className="size-content"></MainHeader>
                <div className="flex flex-column mt-8 pt-8 pb-8 text-center">
                    {!routesWithouthMainTitle.includes(location.pathname)&& <>  <h1 className="text-5xl md:text-6xl col-12 mb-0">
                        Encuentra el lugar perfecto para hospedarte
                    </h1>
                    <h2 className="text-2xl md:text-3xl col-12 mt-0">
                        Reserva un hotel ahora
                    </h2></>}
                </div>

                <Outlet />
                <MainFooter></MainFooter>
            </div>
        </div>
    );
};

export default MainLayout;
