import { Button } from "primereact/button";
import React, { HTMLAttributes } from "react";

import "rsuite/dist/rsuite.min.css";
import CustomDateRange from "src/components/atoms/CustomDateRange/CustomDateRange";
import InputWithIcon from "src/components/atoms/InputWithIcon/InputWithIcon";
import NumberOfPersons from "src/components/molecules/NumberOfPersons/NumberOfPersons";

import Icon from "/assets/icons/icomoon-free_mobile.svg";

import "./index-components.scss";
export const BookComponent = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            {...props}
            className={`flex bookcomponent shadow-4 border-round-md surface-300 overflow-hidden ${props.className}`}
        >
            <InputWithIcon
                icon="pi-map-marker"
                className="inputbookcomponent childsbookcomponent"
            />
            <CustomDateRange
                icon="pi-calendar"
                className="inputbookcomponent childsbookcomponent"
            />
            <NumberOfPersons className="inputbookcomponent childsbookcomponent" />
            <Button
                className="  childsbookcomponent"
                label="buscar"
                icon="pi pi-search"
            />
        </div>
    );
};

export const MobileSection = () => (
    <section
        style={{ width: "99%", backgroundColor: "rgb(212 232 255)" }}
        className="flex mt-3 mb-4 p-7 border-round-md flex-column md:flex-row  justify-content-between"
    >
        <section className="align-self-center text-center md:text-left">
            <h3>Descarga nuestra aplicación</h3>
            <small>Disponible en</small>
            <div className="flex  mt-4 md:mt-0 justify-content-center md:justify-content-start">
                <Button size="small" icon="pi pi-android" label="Android" />
                <Button
                    size="small"
                    className="ml-1 md:ml-2"
                    icon="pi pi-apple"
                    label="AppleStore"
                />
            </div>
        </section>
        <img className="hidden md:block" src={Icon} alt="" />
    </section>
);
