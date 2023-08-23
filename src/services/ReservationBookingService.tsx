import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import {  NotificationContext } from "./ProvidersContext";
import { SERVER_ROUTE } from "./apiRoutes";
type Reservation={[key:string]:unknown}
export const useCreateReservation = () => {
    
    const toast = useContext(NotificationContext);
    const createRequest = async (data: Reservation) => {
        return (
            await axios.post<Reservation[]>(`${SERVER_ROUTE}/reservations`, data)
        ).data;
    };
    const mutation = useMutation({
        mutationFn: createRequest,
        onSuccess: () => {
            toast?.current?.show({
                severity: "success",
                summary: "Reservación Creada",
                detail: "Reservación creado exitosamente",
            });
        },
        onError: (error: AxiosError<ErrorAxiosNestJsRequest>) => {
            if (error.code === "ERR_NETWORK") {
                toast?.current?.show({
                    severity: "error",
                    summary: "Connection error",
                    detail: "Error en la conexión con el servidor",
                });
            } else {
                toast?.current?.show({
                    severity: "error",
                    summary: "Error creating contact",
                    detail: error.response?.data.message,
                });
            }
        },
    });
    const create = (data: Reservation) => {
        mutation.mutate(data as unknown as Reservation);
    };
    return { create };
};