import React from "react";
import "./index.scss";

import {
    BookComponent,
    MobileSection,
} from "./index-components/index-components.tsx";
import CustomCarousel from "src/components/organisms/CustomCarousel/CustomCarousel";
import useDocumentTitle from "src/services/PageTitle";
import { useFetchAvailable } from "../admin/hotels/page-functions/fetch-data.tsx";
import { DataTypeWithId as DataTypeHotels } from "src/pages/admin/hotels/page-components/form-components";
import { DataType as DataTypeRooms } from "../admin/rooms/page-components/form-components.tsx";

const Index = () => {
    useDocumentTitle("Hotels App");
    const { data } = useFetchAvailable();
    return (
        <main className="index bg-blue-50 w-full flex flex-column align-items-center">
            <section className="size-content flex flex-column align-items-center ">
                <BookComponent
                    className=""
                    style={{ marginTop: "-35px" }}
                ></BookComponent>
                <h3 className="mt-3">Nuestros Hoteles recomendados</h3>
                {/* <CustomCarousel items={data as (DataTypeHotels&{rooms:DataTypeRooms[]})[]} className="relative first-carousel w-full" /> */}
                {/* <h3 className="pt-4">Hoteles por ciudad</h3> */}
                <MobileSection />
            </section>
        </main>
    );
};

export default Index;
