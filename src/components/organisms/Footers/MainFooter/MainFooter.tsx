import React from "react";
import CopyrightNotice from "src/components/atoms/CopyrightNotice";
import Logo from "src/components/atoms/Logo/Logo";

function MainFooter() {
    return (
        <footer className=" surface-100 w-full align-items-center p-8 pt-4 pb-4 flex flex-column">
            <section className="size-content flex  flex-column md:flex-row">
                <Logo
                    type="clear"
                    className="md:w-5 mr-0 sm:mr-4 lg:w-5 lg:mr-8"
                />
                <section className="flex justify-content-around text-center sm:text-left  flex-wrap md:flex-row  md:justify-content-between w-full lg:pr-8">
                    <section>
                        <h3 className="text-lg text-center sm:text-left mt-3 sm:mt-0">
                            Compañia
                        </h3>
                        <p className="text-sm">Acerca de</p>
                        <p className="text-sm">Información legal</p>
                        <p className="text-sm">Contáctanos</p>
                        <p className="text-sm">Blogs</p>
                    </section>
                    <section>
                        <h3 className="text-lg text-center sm:text-left mt-3 sm:mt-0">
                            Ayuda
                        </h3>
                        <p className="text-sm">Encontrar un hotel</p>
                        <p className="text-sm">Como hospedarte?</p>
                        <p className="text-sm">FAQs</p>
                        <p className="text-sm">Guias de alquiler</p>
                    </section>
                    <section>
                        <h3 className="text-lg text-center sm:text-left mt-3 sm:mt-0">
                            Contacto
                        </h3>
                        <p className="text-sm">Encontrar un hotel</p>
                        <p className="text-sm">Como hospedarte?</p>
                        <p className="text-sm">FAQs</p>

                        <div className="flex justify-content-between">
                            <a href="#">
                                <i className="pi pi-facebook"></i>
                            </a>
                            <a href="#">
                                <i className="pi pi-twitter"></i>
                            </a>
                            <a href="#">
                                <i className="pi pi-instagram"></i>
                            </a>
                            <a href="#">
                                <i className="pi pi-linkedin"></i>
                            </a>
                        </div>
                    </section>
                </section>
            </section>
            <CopyrightNotice className="w-full text-xs text-center mt-3"></CopyrightNotice>
        </footer>
    );
}

export default MainFooter;
