import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import {  useNavigate } from "react-router-dom";
import InputError from "src/components/atoms/InputError/InputError";
import { DataType as DataTypeHotels } from "src/pages/admin/hotels/page-components/form-components";
import { DataType as DataTypeRooms } from "src/pages/admin/rooms/page-components/form-components";
import { differenceTwoDates } from "src/services/Helpers";
type PropsDialogBookHotel = {
    visible: boolean
    setvisible: (p: boolean) => void
    itemdata: DataTypeHotels & {
        rooms: DataTypeRooms[]
        id?: string
    }
}
export const DialogBookHotel = (props: PropsDialogBookHotel) => {
    const [invalidDateInputs, setInvalidDateInputs] = useState(false);
    const navigate = useNavigate();
    const maxPersons = props?.itemdata?.rooms?.reduce(
        (a, b) => a + parseInt(b.max_occupancy),
        0
    );
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const values = Object.fromEntries(formData);
        if (
            new Date(values.dateFrom as string) >
            new Date(values.dateTo as string)
        ) {
            setInvalidDateInputs(true);
        } else {
            setInvalidDateInputs(false);
            const diferenceDays=differenceTwoDates(values.dateFrom as string,values.dateTo as string);
            let count_person_allowed = 0;
            const rooms:DataTypeRooms[]  = [];
            props.itemdata.rooms
                .sort(
                    (a, b) =>
                        parseInt(a.max_occupancy) - parseInt(b.max_occupancy)
                )
                .forEach((a) => {
                    if (
                        parseInt(values.persons as string) >
                        count_person_allowed
                    ) {
                        count_person_allowed += parseInt(a.max_occupancy);
                        rooms.push(a);
                    }
                });
            const costs=rooms.reduce((a,b)=>a+parseInt(b.cost)+parseInt(b.tax),0)*diferenceDays;
            
            navigate({
                pathname: "/make-reservation",
                search: `location=${props.itemdata.city}&dateFrom=${values.dateFrom}&`+
                `dateTo=${values.dateTo}&persons=${values.persons}&hotel=${props.itemdata.id}&rooms=${rooms.length}&`+
                `days=${diferenceDays}&cost=${costs}`,
            });
        }
    };

    return (
        <Dialog
            header={"Diligencie el formulario para reservar una habitación"}
            visible={props.visible}
            onHide={() => props.setvisible(false)}
        >
            <form onSubmit={onSubmit} className="flex flex-wrap" action="">
                <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                    <label htmlFor={"name"}>Numero de personas:</label>
                    <InputText
                        max={maxPersons}
                        autoFocus
                        required
                        className="w-full p-2"
                        id="persons"
                        name="persons"
                        type="number"
                    />
                </div>
                <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                    <label htmlFor={"dateFrom"}>Fecha de Ingreso:</label>
                    <InputText
                        required
                        style={{ height: "37px" }}
                        id="dateFrom"
                        name="dateFrom"
                        type="date"
                        className="w-full m-0"
                    />
                </div>
                <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                    <label htmlFor={"dateTo"}>Fecha de Salida:</label>
                    <InputText
                        required
                        style={{ height: "37px" }}
                        id="dateTo"
                        name="dateTo"
                        type="date"
                        className="w-full m-0"
                    />
                </div>
                <div className="ml-2">
                    {" "}
                    {InputError(
                        invalidDateInputs,
                        "La fecha de entrada no puede ser mayor a la de salida"
                    )}
                </div>
                <div className="w-full flex justify-content-end mt-2">
                    <Button className="ml-2">Aceptar</Button>
                    <Button
                        className="ml-2"
                        severity="secondary"
                        onClick={() => props.setvisible(false)}
                    >
                        Cancelar
                    </Button>
                </div>
            </form>
        </Dialog>
    );
};
