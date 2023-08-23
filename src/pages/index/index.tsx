import React from "react";
import "./index.scss";

import {
    MobileSection,
    SearchHotelComponent,
} from "./index-components/index-components.tsx";
import CustomCarousel from "src/components/organisms/CustomCarousel/CustomCarousel";
import useDocumentTitle from "src/services/PageTitle";
import {  useFetchRecommended } from "../admin/hotels/page-functions/fetch-data.tsx";
import { DataTypeWithId as DataTypeHotels } from "src/pages/admin/hotels/page-components/form-components";
import { DataType as DataTypeRooms } from "../admin/rooms/page-components/form-components.tsx";
import { ProgressSpinner } from "primereact/progressspinner";

const Index = () => {
    useDocumentTitle("Hotels App");
    const { data, isFetching } = useFetchRecommended();
    return (
        <main className="index bg-blue-50 w-full flex flex-column align-items-center">
            <section className="size-content flex flex-column align-items-center ">
                <SearchHotelComponent
                    className=""
                    style={{ marginTop: "-35px" }}
                ></SearchHotelComponent>
                <h3 className="mt-3">Nuestros Hoteles recomendados</h3>
                {isFetching ? (
                    <ProgressSpinner style={{height:"300px"}} />
                ) : (
                    <CustomCarousel
                        items={
                            data as (DataTypeHotels & {
                                rooms: DataTypeRooms[]
                            })[]
                        }
                        className="relative first-carousel w-full"
                    />
                )}
                <MobileSection />
            </section>
        </main>
    );
};

export default Index;
