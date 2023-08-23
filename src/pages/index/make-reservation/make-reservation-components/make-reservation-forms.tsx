import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

type PropsPeople = {
    index: number
    onsubmit: (e: React.FormEvent<HTMLFormElement>, i: number) => void
    changeIndexPerson: (p: number) => void
    currentData: { [key: number]: { [key: string]: string } }
}
export const FormPeople = (props: PropsPeople) => {
    return (
        <form
            onSubmit={(e) => props.onsubmit(e, props.index)}
            className="flex flex-wrap"
            action=""
        >
            <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                <label htmlFor={"name"}>Nombre:</label>
                <InputText
                    required
                    className="w-full p-2"
                    id="name"
                    name="name"
                    defaultValue={props.currentData[props.index]?.name}
                />
            </div>
            <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                <label htmlFor={"lastName"}>Apellido:</label>
                <InputText
                    required
                    id="lastName"
                    name="lastName"
                    className="w-full p-2"
                    defaultValue={props.currentData[props.index]?.lastName}
                />
            </div>
            <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                <label htmlFor={"dateOfBirth"}>Fecha de Nacimiento:</label>
                <InputText
                    required
                    style={{ height: "37px" }}
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    className="w-full m-0"
                    defaultValue={props.currentData[props.index]?.dateOfBirth}
                />
            </div>
            <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                <label htmlFor={"gender"}>Género:</label>

                <select
                    required
                    id="gender"
                    name="gender"
                    className="p-inputtext p-component w-full p-2 w-full p-2"
                    defaultValue={props.currentData[props.index]?.gender}
                >
                    <option value="">--Seleccione una opción--</option>
                    <option value="male">Masculino </option>
                    <option value="female">Femenino</option>
                    <option value="other">Otro</option>
                </select>
            </div>
            <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                <label htmlFor={"documentType"}>Tipo de documento:</label>
                <select
                    required
                    id="documentType"
                    name="documentType"
                    className="p-inputtext p-component w-full p-2 w-full p-2"
                    defaultValue={props.currentData[props.index]?.documentType}
                >
                    <option value="">--Seleccione una opción--</option>
                    <option value="cc">Cédula de ciudadania</option>
                    <option value="ce">Cédula de extranjeria</option>
                </select>
            </div>
            <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                <label htmlFor={"noDocument"}>Número de documento:</label>
                <InputText
                    required
                    id="noDocument"
                    name="noDocument"
                    type="number"
                    className="w-full p-2"
                    defaultValue={props.currentData[props.index]?.noDocument}
                />
            </div>
            <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                <label htmlFor={"email"}>Email:</label>
                <InputText
                    required
                    id="email"
                    name="email"
                    className="w-full p-2"
                    type="email"
                    defaultValue={props.currentData[props.index]?.email}
                />
            </div>
            <div className="col-12 sm:col-6 md:col-6 xl:col-3">
                <label htmlFor={"phone"}>Teléfono de contacto:</label>
                <InputText
                    required
                    id="phone"
                    name="phone"
                    type="number"
                    className="w-full p-2"
                    defaultValue={props.currentData[props.index]?.phone}
                />

                <div className="w-full flex justify-content-end mt-2">
                    {" "}
                    <Button
                        disabled={props.index === 0}
                        onClick={() => props.changeIndexPerson(props.index - 1)}
                    >
                        Anterior
                    </Button>{" "}
                    <Button className="ml-2">Siguiente</Button>
                </div>
            </div>
        </form>
    );
};

type PropsEmergencyPerson = {
    onsubmit: (e: React.FormEvent<HTMLFormElement>)=>void,currentdata:{ [key: string]: string }
}
export const EmergencyContectForm = (props:PropsEmergencyPerson) => {
    return (
        <form
            onSubmit={(e) => props.onsubmit(e)}
            className="flex flex-wrap w-full"
            action=""
        >
            <div className="col-12 sm:col-6 md:col-6 xl:col-4">
                <label htmlFor={"name"}>Nombre:</label>
                <InputText
                    required
                    className="w-full p-2"
                    id="name"
                    name="name"
                    defaultValue={props.currentdata?.name}
                />
            </div>
            <div className="col-12 sm:col-6 md:col-6 xl:col-4">
                <label htmlFor={"lastName"}>Apellido:</label>
                <InputText
                    required
                    id="lastName"
                    name="lastName"
                    className="w-full p-2"
                    defaultValue={props.currentdata?.lastName}
                />
            </div>

            <div className="col-12 sm:col-6 md:col-6 xl:col-4">
                <label htmlFor={"phone"}>Teléfono de contacto:</label>
                <InputText
                    required
                    id="phone"
                    name="phone"
                    type="number"
                    className="w-full p-2"
                    defaultValue={props.currentdata?.phone}
                />

                <div className="w-full flex justify-content-end mt-2">
                    <Button>Reservar</Button>
                </div>
            </div>
        </form>
    );
};
