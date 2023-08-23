import { Button } from "primereact/button";
import React, { HTMLAttributes, useRef, useState } from "react";

import "rsuite/dist/rsuite.min.css";
import CustomDateRange from "src/components/atoms/CustomDateRange/CustomDateRange";
import InputWithIcon from "src/components/atoms/InputWithIcon/InputWithIcon";
import NumberOfPersons from "src/components/molecules/NumberOfPersons/NumberOfPersons";

import Icon from "assets/icons/icomoon-free_mobile.svg";

import "./index-components.scss";
import { OverlayPanel } from "primereact/overlaypanel";
import { useNavigate } from "react-router-dom";


const validateBookInputs = (
    menu: React.RefObject<OverlayPanel>,
    setMessage: (p: string) => void
) => {
    const cityLocation = document.querySelector<HTMLInputElement>(
        "#input-city-location"
    );
    const dateRange =
        document.querySelector<HTMLInputElement>("#input-date-range");
    const numberPersons = document.querySelector<HTMLInputElement>(
        "#input-number-persons"
    );
    menu.current?.hide();
    if (!cityLocation?.value) {
        setTimeout(() => {
            setMessage("Digite la ubicación");
            menu.current?.show(null, cityLocation);
        }, 100);
        cityLocation?.focus();
        return false;
    }
    if (!dateRange?.value) {
        dateRange?.focus();
        return false;
    }
    if (numberPersons?.placeholder === "Cantidad de personas: 0") {
        setTimeout(() => {
            numberPersons?.click();
        }, 100);
        return false;
    }
    return true;
};

export const SearchHotelComponent = (props: HTMLAttributes<HTMLDivElement>) => {
    const menu = useRef<OverlayPanel>(null);
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const refNumberPersons = useRef<{ getPersonsCount: () => number }>();
    
  
    
    const searchHotels = () => {
        const filledInputs = validateBookInputs(menu, setMessage);
        if (!filledInputs) return;
        const cityLocationValue = document.querySelector<HTMLInputElement>(
            "#input-city-location"
        )?.value;
        const dateRangeValue = document
            .querySelector<HTMLInputElement>("#input-date-range")
            ?.value.split(" ~ ");
        const numberOfPersons = refNumberPersons.current?.getPersonsCount();

        navigate({
            pathname: "/search",
            search: `location=${cityLocationValue}&dateFrom=${
                dateRangeValue![0]
            }&dateTo=${dateRangeValue![1]}&persons=${numberOfPersons}`,          
        });
        navigate(0);
    };
    return (
        <div
            {...props}
            className={`flex SearchHotelComponent shadow-4 border-round-md surface-300 overflow-hidden ${props.className}`}
        >
            <InputWithIcon
                inputid="input-city-location"
                icon="pi-map-marker"
                className="inputSearchHotelComponent childsSearchHotelComponent"
               
            />
            <CustomDateRange
                id="input-date-range"
                icon="pi-calendar"
                className="inputSearchHotelComponent childsSearchHotelComponent"                
            />
            <NumberOfPersons
                id="input-number-persons"
                className="inputSearchHotelComponent childsSearchHotelComponent"
                ref={refNumberPersons}
            />
            <OverlayPanel ref={menu}>{message}</OverlayPanel>
            <Button
                onClick={searchHotels}
                className="  childsSearchHotelComponent"
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
