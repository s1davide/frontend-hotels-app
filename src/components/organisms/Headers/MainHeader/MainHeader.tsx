import React, { HTMLAttributes } from "react";
import Logo from "src/components/atoms/Logo/Logo";
import "./MainHeader.scss";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { Toolbar } from "primereact/toolbar";
const MainHeader = (props: HTMLAttributes<HTMLElement>) => {
    const navigate = useNavigate();

    return (
        <header
            {...props}
            className={`${props.className} fadeinup animation-duration-950 `}
        >
            <Toolbar
                className="bg-white shadow-5 py-1 px-2 border-none"
                start={<Logo type="dark" className="mb-1" imageheight="40px" />}
                end={
                    <>
                        {/* <Button
                            size="small"
                            severity="secondary"
                            label="Registrarse"
                            className="text-white"
                            icon="pi pi-id-card"
                            onClick={() => navigate("/auth/login")}
                            text
                        /> */}
                        <Button
                            size="small"
                            severity="secondary"
                            label="Iniciar Sesión"
                            className="text-white"
                            icon="pi pi-user"
                            onClick={() => navigate("/auth/login")}
                            text
                        />
                    </>
                }
            ></Toolbar>
        </header>
    );
};

export default MainHeader;
