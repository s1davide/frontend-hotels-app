import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { NotificationContext } from "src/services/ProvidersContext";
import { DataType } from "../page-components/form-components";
import { SERVER_ROUTE } from "src/services/apiRoutes";
import { useNavigate } from "react-router-dom";
import {
    MAIN_ROUTE,
    indexRouterPath,
    singularNameModule,
} from "../module-metadata";
import { appendToFormData } from "src/services/Helpers";

export const useCreate = () => {
    const navigate = useNavigate();
    const toast = useContext(NotificationContext);
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
    const create = (data: DataType) => {
        const formData = appendToFormData(data);
        console.log(formData.get("file"));

        mutation.mutate(formData as unknown as DataType);
    };
    return { create };
};
