import React, { useEffect, useState } from "react";
import "./make-reservation.scss";
import { TabPanel, TabView } from "primereact/tabview";
import {
    EmergencyContectForm,
    FormPeople,
} from "./make-reservation-components/make-reservation-forms";
import { useQueryParams } from "src/services/Hooks";
import { useNavigate } from "react-router-dom";
import { useCreateReservation } from "src/services/ReservationBookingService";
type PersonsData = { [key: number]: { [key: string]: string } }
function MakeReservation() {
    const queryParams = useQueryParams();
    const navigate = useNavigate();

    const { create } = useCreateReservation();
    const persons = queryParams?.get("persons");
    useEffect(() => {
        if (!persons) {
            navigate("/");
        }
    });
    if (!persons) return;
    const numberOfPersons = Array.from(
        new Array(parseInt(persons as string)).keys()
    );

    const [indexPerson, setIndexPerson] = useState(0);
    const [personsData, setPersonsData] = useState<PersonsData>({});
    const [emergencyContactData, setEmergencyContactData] = useState<{
        [key: string]: string
    }>({});
    const submitPerson = (e: React.FormEvent, index: number) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData) as { [key: string]: string };
        setPersonsData((currPersonData) => ({
            ...currPersonData,
            [index]: data,
        }));

        setIndexPerson((currentIndexPerson) => currentIndexPerson + 1);
    };
    const reviewAllDataAndBook = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData);
        setEmergencyContactData(data as { [key: string]: string });
        for (let i = 0; i < numberOfPersons.length; i++) {
            const personData = personsData[i];
            if (
                personData &&
                personData["dateOfBirth"] &&
                personData["documentType"] &&
                personData["email"] &&
                personData["gender"] &&
                personData["lastName"] &&
                personData["name"] &&
                personData["noDocument"] &&
                personData["phone"]
            ) {
                create({
                    personsData: personData,
                    emergencyContact: data,
                    idHotel: queryParams.get("hotel"),
                    rooms: queryParams.get("rooms"),
                    persons: queryParams.get("persons"),
                    days: queryParams.get("days"),
                    cost: queryParams.get("cost"),
                    dateFrom: queryParams.get("dateFrom"),
                    dateTo: queryParams.get("dateTo"),
                });
                setTimeout(()=>navigate("/"),100);
            } else {
                setIndexPerson(i);
                return;
            }
        }
    };
    return (
        <main className="index bg-blue-50 w-full flex flex-column align-items-center">
            <section className="size-content flex flex-column align-items-center "></section>
            <h1 id="title-reservation-page" style={{ color: "black" }}>
                Reservar Habitación
            </h1>
            <TabView
                activeIndex={indexPerson}
                onTabChange={(e) => setIndexPerson(e.index)}
                className="w-full sm:px-8 bg-blue-50 mb-5"
                scrollable
         
            >
                {numberOfPersons.map?.((v) => (
                    <TabPanel
                        
                        key={v}
                        header={`Datos Persona ${v + 1}`}
                    >
                        <FormPeople
                            index={v}
                            currentData={personsData}
                            onsubmit={submitPerson}
                            changeIndexPerson={setIndexPerson}
                        />
                    </TabPanel>
                ))}
                <TabPanel
                    className="flex justify-content-center"
                    key={numberOfPersons?.length}
                    header={"Contacto de Emergencia"}
                >
                    <EmergencyContectForm
                        currentdata={emergencyContactData}
                        onsubmit={reviewAllDataAndBook}
                    />
                </TabPanel>
            </TabView>
        </main>
    );
}

export default MakeReservation;
