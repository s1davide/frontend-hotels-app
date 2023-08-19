import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import "./AppLayout.scss";
import AppHeader from "src/components/organisms/Headers/AppHeader/AppHeader";
import {
    BreadcrumbContext,
    BreakpointSidebarContext,
    SidebarContext,
} from "src/services/ProvidersContext";
import AppSidebar from "src/components/organisms/Sidebars/AppSidebar/AppSidebar";
import { BreadCrumb } from "primereact/breadcrumb";
import { MenuItem } from "primereact/menuitem";
import AppFooter from "src/components/organisms/Footers/AppFooter/AppFooter";
const AppLayout = () => {
    const [openSidebar, setOpenSidebar] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [itemsBreadcrumb, setItemsBreacrumb] = useState<MenuItem[]>([]);
    const sidebarElement = useRef(null);
    const homeBreadcrumb = { icon: "pi pi-home", url: "/admin/hotels" };

    useEffect(() => {
        const classTransition = "content-with-transition";
        const parentContent = document.querySelector(
            ".parent-content > .parent-main"
        );
        const sidebarFixed = document.querySelector(".sidebar-fixed");
        setTimeout(() => parentContent?.classList.add(classTransition), 200);
        setTimeout(() => sidebarFixed?.classList.add(classTransition), 200);
        document.body.setAttribute("style", "overflow: hidden;");
    });
    return (
        <div>
            <BreakpointSidebarContext.Provider
                value={{ isSmallScreen, setIsSmallScreen }}
            >
                <SidebarContext.Provider
                    value={{ openSidebar, setOpenSidebar }}
                >
                    <BreadcrumbContext.Provider
                        value={{ itemsBreadcrumb, setItemsBreacrumb }}
                    >
                        <AppHeader
                            className="bg-primary-600"
                            menubarclassname={
                                "bg-primary shadow-4 w-full border-none"
                            }
                        />
                        <div
                            ref={sidebarElement}
                            className={`flex parent-content ${
                                openSidebar && !isSmallScreen
                                    ? ""
                                    : "hide-fixed-sidebar"
                            }`}
                        >
                            <AppSidebar />

                            <div className="parent-main ">
                                <BreadCrumb
                                    home={homeBreadcrumb}
                                    model={itemsBreadcrumb}
                                    className="border-none border-noround  relative "
                                />
                                <Outlet />
                                <AppFooter />
                            </div>
                        </div>
                    </BreadcrumbContext.Provider>
                </SidebarContext.Provider>
            </BreakpointSidebarContext.Provider>
        </div>
    );
};

export default AppLayout;
