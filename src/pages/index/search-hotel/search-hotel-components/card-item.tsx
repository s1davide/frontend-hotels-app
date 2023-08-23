import React from "react";
import { DataType as DataTypeHotels } from "src/pages/admin/hotels/page-components/form-components.tsx";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { useQueryParams } from "src/services/Hooks.tsx";
import { NavigateFunction } from "react-router-dom";
import { DataType as DataTypeRooms } from "src/pages/admin/rooms/page-components/form-components";

const ListHotels = (
    item: DataTypeHotels & { id:string,rooms: DataTypeRooms[] },
    navigate: NavigateFunction,
    key: number
) => {
    const queryParams = useQueryParams();
    const [initialDate, finalDate] = [
        new Date(queryParams.get("dateFrom") as string) as unknown as number,
        new Date(queryParams.get("dateTo") as string) as unknown as number,
    ];
    const persons = parseInt(queryParams.get("persons") as string);
    const days = (finalDate - initialDate) / 86400000;

    const cost = item?.rooms?.map?.((room) => ({
        ...room,
        cost: parseInt(room.cost),
        tax: parseInt(room.tax),
    }))
        .reduce((a, b) => a + b.tax + b.cost, 0);

    const totalCost = (cost * days).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    // search: `location=${props.itemdata.city}&dateFrom=${values.dateFrom}&`+
    // `dateTo=${values.dateTo}&persons=${values.persons}&hotel=${props.itemdata.id}&rooms=${rooms.length}&`+
    // `days=${diferenceDays}&cost=${costs}`,
    return (
        <Card key={key} style={{ width: "98%" }} className=" mt-5 mb-5">
            <div className="card-result-hotel flex relative  w-full flex-wrap px-3 align-items-center gap-3">
                <div className="flex flex-wrap card-result-half-content">
                    <img
                        className="w-18rem shadow-2 ml-2 mr-3 flex-shrink-0 border-round"
                        src={item.image_url}
                        alt={item.name}
                    />
                    <div
                        style={{ minWidth: "205px", marginRight: "180px" }}
                        className="flex-1 flex flex-column gap-2 xl:mr-8"
                    >
                        <h3 className="font-bold">{item.name}</h3>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-map-marker"></i>
                            <span>
                                {item.city}, {item.department}
                            </span>
                        </div>
                        <div className="flex align-items-center gap-2">
                            <i className="pi pi-home"></i>
                            <span>
                                {item.rooms.length}{" "}
                                {item.rooms.length > 1
                                    ? "Habitaciones"
                                    : "Habitación"}{" "}
                                para {persons}
                                {persons>1?" personas":" persona"}
                            </span>
                        </div>
                        
                        <div className="flex align-items-center gap-2">
                            <span>
                                Del {queryParams.get("dateFrom")} al{" "}
                                {queryParams.get("dateTo")} ({days} {days>1?"días":"dia"})
                            </span>
                        </div>
                    </div>
                </div>
                <div className="parent-right-content flex flex-column justify-content-between ">
                    <span
                        style={{ top: "0", right: "16px" }}
                        className="price-card-result flex flex-column align-items-end absolute"
                    >
                        <span className=" font-bold text-xl text-900">
                            {totalCost}
                        </span>
                        <span>Impuesto incluido</span>
                    </span>
                    <Button
                        size="small"
                        style={{ bottom: "0", right: "16px" }}
                        className="absolute"
                        onClick={() =>
                            navigate({
                                pathname: "/make-reservation",
                                search: `${location.search}&hotel=${item.id}&rooms=${item.rooms.length}&`+
                                `days=${days}&cost=${cost * days}`,
                            })
                        }
                    >
                        Reservar
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default ListHotels;
