import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useContext } from "react"
import { MAIN_ROUTE } from "../module-metadata.tsx"
import { singularNameModule } from "../module-metadata.tsx"
import { NotificationContext } from "src/services/ProvidersContext.tsx"
import { SERVER_ROUTE } from "src/services/apiRoutes/index.ts"
import {
    DataType,
    DataTypeWithId,
} from "../page-components/form-components.tsx"
import { NavigateFunction } from "react-router-dom"
type ActionAfterUpdate = (() => unknown) | (() => NavigateFunction)
export const useUpdate = (action?: ActionAfterUpdate) => {
    const toast = useContext(NotificationContext)
    const updateRequest = async (data: {
        id: string | number
        newData: DataType
    }) => {
        return (
            await axios.patch<DataType>(
                `${SERVER_ROUTE}${MAIN_ROUTE}/${data.id}`,
                data.newData
            )
        ).data
    }
    const mutation = useMutation({
        mutationFn: updateRequest,
        onSuccess: () => {
            toast?.current?.show({
                severity: "success",
                summary: `${singularNameModule} creado`,
                detail: `${singularNameModule} actualizado exitosamente`,
            })
            typeof action === "function" && action()
        },
        onError: (error: AxiosError<ErrorAxiosNestJsRequest>) => {
            if (error.code === "ERR_NETWORK") {
                toast?.current?.show({
                    severity: "error",
                    summary: "Connection error",
                    detail: "Error en la conexión con el servidor",
                })
            } else {
                toast?.current?.show({
                    severity: "error",
                    summary: `Error actualizando ${singularNameModule}`,
                    detail: error.response?.data.message,
                })
            }
        },
    })
    const update = (newData: DataTypeWithId) => {
        mutation.mutate({ id: newData.id, newData })
    }

    return { update }
}
