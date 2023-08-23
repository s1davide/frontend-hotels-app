import { SERVER_ROUTE } from "src/services/apiRoutes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { MAIN_ROUTE, nameModule } from "../module-metadata";
import { DataTypeWithId } from "../page-components/form-components";
import { useContext, useEffect } from "react";
import { LoadingContext } from "src/services/ProvidersContext";

type FilterData = { field?: string; value?: string }
export const useFetch = (
    filter: FilterData = {},
    customReference = nameModule
) => {
    const queryClient = useQueryClient();
    const searchBy = filter.field
        ? `?search_by=${filter.field}&value=${filter.value}`
        : "";
    const fetch = async () => {
        return (
            await axios.get<DataTypeWithId[]>(
                `${SERVER_ROUTE}${MAIN_ROUTE}${searchBy}`
            )
        ).data;
    };
    const { data, isFetching } = useQuery([customReference], fetch);

    const refetch = () =>
        queryClient.invalidateQueries({ queryKey: [customReference] });
    return { data, isFetching: isFetching, refetch: refetch };
};

export const useFetchOne = (
    id: string | number,
    customReference = "getbyone"
) => {
    const {setLoading}=useContext(LoadingContext);
    const queryClient = useQueryClient();

    const fetch = async () => {
        return (
            await axios.get<DataTypeWithId>(
                `${SERVER_ROUTE}${MAIN_ROUTE}/${id}`
            )
        ).data;
    };
    const { data, isFetching } = useQuery([customReference], fetch);
    useEffect(()=>setLoading(isFetching),[isFetching]);
    const refetch = () =>
        queryClient.invalidateQueries({ queryKey: [customReference] });
    return { data, isFetching: isFetching, refetch: refetch };
};
