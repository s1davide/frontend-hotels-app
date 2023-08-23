import React from "react";
import useDocumentTitle from "src/services/PageTitle";

import { SearchHotelComponent } from "../index-components/index-components.tsx";
import { useFetchAvailable } from "src/pages/admin/hotels/page-functions/fetch-data.tsx";

import "./search-hotel.scss";
import ListHotels from "./search-hotel-components/card-item.tsx";
import { useNavigate } from "react-router-dom";
import { useQueryParams } from "src/services/Hooks.tsx";

const Index = () => {
    useDocumentTitle("Hotels App");
    const queryParams = useQueryParams();
    const navigate = useNavigate();

    const { data } = useFetchAvailable(location.search);
  
    return (
        <main  className="index bg-blue-50 w-full flex flex-column align-items-center">
            <section className="size-content flex flex-column align-items-center ">
                <SearchHotelComponent
                    className=""
                    style={{ marginTop: "-35px" }}
                ></SearchHotelComponent>
                {data && data.length > 0 ? (
                    <p className="mt-8">
                        Se encontraron {data.length} coincidencias para: <br />{" "}
                        Ubicación:{" "}
                        <strong> {queryParams.get("location")}</strong> y
                        Cantidad de personas:{" "}
                        <strong>{queryParams.get("persons")}</strong>{" "}
                    </p>
                ) : (
                    <p className="mt-8">
                        No se encontraron coincidencias para: <br /> Ubicación:{" "}
                        <strong> {queryParams.get("location")}</strong> y
                        Cantidad de personas:{" "}
                        <strong>{queryParams.get("persons")}</strong>{" "}
                    </p>
                )}
                {data?.map?.((item, key) => ListHotels(item, navigate, key))}
            </section>
        </main>
    );
};
export default Index;
