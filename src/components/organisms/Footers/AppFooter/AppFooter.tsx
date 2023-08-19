import React from "react"
import CopyrightNotice from "src/components/atoms/CopyrightNotice"
import Logo from "src/components/atoms/Logo/Logo"
import "./AppFooter.scss"
function AppFooter() {
    return (
        <footer className="app-footer  bg-white flex justify-content-between align-items-center shadow-3 px-3">
            <Logo
                imageheight="35px"
                textclassname="pt-2 text-base"
                type="clear"
            />
            <CopyrightNotice />
        </footer>
    )
}

export default AppFooter
