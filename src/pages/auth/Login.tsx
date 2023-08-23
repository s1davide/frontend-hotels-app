import React, { Suspense, lazy } from "react";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import CopyrightNotice from "src/components/atoms/CopyrightNotice";
import "./Login.scss";
import Logo from "src/components/atoms/Logo/Logo";
import "primeflex/primeflex.min.css";
import useDocumentTitle from "src/services/PageTitle";
import { useNavigate } from "react-router-dom";

const ImagesBackgroundsLazy = lazy(
    () => import("src/components/molecules/ImagesBackgrounds/ImagesBackground")
);
const inputClassnames =
    "text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full";

const Login = () => {
    useDocumentTitle("Iniciar Sesión");
    const navigate = useNavigate();
    const submit = () => {
        navigate("/admin/hotels");
    };
    return (
        <>
            <main className="main-login p-component fadein animation-duration-950 flex flex-column align-items-center justify-content-center">
                <Suspense>
                    <ImagesBackgroundsLazy />
                </Suspense>
                <section className=" flex flex-column align-items-center sm:col-8 md:col-6 lg:col-5 xl:col-5">
                    <Card>
                        <header className="mb-6">
                            <Logo type="clear" textclassname="pt-2" />
                        </header>
                        <form
                            onSubmit={submit}
                            className="flex flex-column align-self-center px-5 px-1 gap-2"
                            action=""
                        >
                            <div className="field">
                                <label htmlFor="firstname1">Nombre:</label>
                                <input
                                    id="firstname1"
                                    type="text"
                                    className={inputClassnames}
                                />
                            </div>
                            <div className="field">
                                <label htmlFor="lastname1">Contraseña:</label>
                                <input
                                    id="lastname1"
                                    type="text"
                                    className={inputClassnames}
                                />
                            </div>
                            <Button
                                type="submit"
                                label="Iniciar Sesión"
                                className="mt-2"
                            />
                        </form>
                        <footer className="p-component align-self-center">
                            <CopyrightNotice />
                        </footer>
                    </Card>
                </section>
            </main>
        </>
    );
};
export default Login;
