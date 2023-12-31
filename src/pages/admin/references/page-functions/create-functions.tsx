import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext, useEffect } from "react";
import { LoadingContext, NotificationContext } from "src/services/ProvidersContext";
import { DataType } from "../page-components/form-components";
import { SERVER_ROUTE } from "src/services/apiRoutes";
import { useNavigate } from "react-router-dom";
import {
    MAIN_ROUTE,
    indexRouterPath,
    singularNameModule,
} from "../module-metadata";

export const useCreate = () => {
    const navigate = useNavigate();
    const toast = useContext(NotificationContext);
    const {setLoading}=useContext(LoadingContext);
    const createRequest = async (data: DataType) => {
        return (
            await axios.post<DataType[]>(`${SERVER_ROUTE}${MAIN_ROUTE}`, data)
        ).data;
    };
    const mutation = useMutation({
        mutationFn: createRequest,
        onSuccess: () => {
            navigate(indexRouterPath);
            toast?.current?.show({
                severity: "success",
                summary: `${singularNameModule} Creado`,
                detail: `${singularNameModule} creado exitosamente`,
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
    useEffect(()=>setLoading(mutation.isLoading),[mutation.isLoading]);
    const create = (data: DataType) => {
        mutation.mutate(data);
    };
    return { create };
};
