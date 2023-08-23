import React, { HTMLAttributes, useContext } from "react";
import Logo from "src/components/atoms/Logo/Logo";
import { Avatar } from "primereact/avatar";
import { SidebarContext } from "src/services/ProvidersContext";
import { Toolbar } from "primereact/toolbar";
import "./AppHeader.scss";
import { Button } from "primereact/button";
const AppHeader = (
    props: HTMLAttributes<HTMLElement> & { menubarclassname?: string }
) => {
    const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
    return (
        <header {...props}>
            <Toolbar
                className={`py-0 shadow-4 app-toolbar-component pl-0 ${props.menubarclassname}`}
                start={
                    <>
                        <Logo
                            className="logo-navbar pt-1  bg-primary-700 h-full"
                            textclassname="text-base mt-2"
                            imageheight="40px"
                            style={{ paddingBottom: "12px" }}
                        />
                        <Button
                            icon={"pi pi-chevron-left"}
                            className={`${
                                openSidebar ? "" : "button-sidebar-open"
                            } bg-orange-200 btn-sidebar-header `}
                            onClick={() =>
                                setOpenSidebar(
                                    (openSidebarCurrent) => !openSidebarCurrent
                                )
                            }
                            rounded
                            text
                            raised
                            severity="secondary"
                            aria-label="Notification"
                        />
                    </>
                }
                end={
                    <Avatar
                        icon="pi pi-user"
                        style={{ color: "gray" }}
                        shape="circle"
                    />
                }
            ></Toolbar>
        </header>
    );
};

export default AppHeader;
