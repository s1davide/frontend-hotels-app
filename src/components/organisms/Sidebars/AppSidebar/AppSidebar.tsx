import React, { useContext, useEffect } from "react"
import "./AppSidebar.scss"
import {
    BreakpointSidebarContext,
    SidebarContext,
} from "src/services/ProvidersContext"
import { Sidebar } from "primereact/sidebar"
import { GroupItems } from "./components-appsidebar/components"

function AppSidebar() {
    const { openSidebar, setOpenSidebar } = useContext(SidebarContext)
    const { isSmallScreen, setIsSmallScreen } = useContext(
        BreakpointSidebarContext
    )
    useEffect(() => {
        const match = "(max-width: 990px)"
        window.matchMedia(match).addEventListener("change", (e) => {
            setIsSmallScreen(e.matches)
            !e.matches && !openSidebar && setOpenSidebar(true)
            e.matches && setOpenSidebar(false)
        })
        const matches = window.matchMedia(match).matches
        setIsSmallScreen(matches)
        !matches && setOpenSidebar(true)
    }, [isSmallScreen])
    return (
        <aside className="flex pt-3 px-2 bg-white justify-content-center overflow-y-scroll  sidebar-fixed sidebar-fixed-content shadow-6 hidebasidebar">
            <GroupItems />
            <Sidebar
                pt={{ closeButton: { className: "hidden" } }}
                visible={openSidebar && isSmallScreen}
                className=" floating-sidebar-width"
                onHide={() => setOpenSidebar(false)}
            >
                <GroupItems />
            </Sidebar>
        </aside>
    )
}

export default AppSidebar
