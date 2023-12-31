import React, { HTMLAttributes, useRef, useState } from "react";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import "./CustomCarousel.scss";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import { SwiperOptions } from "swiper/types";
import { DataTypeWithId as DataTypeHotels } from "src/pages/admin/hotels/page-components/form-components";
import { DataType as DataTypeRooms } from "src/pages/admin/rooms/page-components/form-components";
import { DialogBookHotel } from "./custom-carousel-components/custom-carousel-components";

const header = (url: string) => <img alt="Card" src={url} />;

type BreakpointsSwipe =
    | {
          [width: number]: SwiperOptions
          [ratio: string]: SwiperOptions
      }
    | undefined
const breakpoints: BreakpointsSwipe = {
    0: { slidesPerView: 2, spaceBetween: 2 },
    705: { slidesPerView: 2, spaceBetween: 2 },
    915: { slidesPerView: 3, spaceBetween: 2 },
    1200: { slidesPerView: 4, spaceBetween: 2 },
};

const hotelTemplate = (
    key: number,
    data: DataTypeHotels & { rooms: DataTypeRooms[] }
) => (
    <Card
        key={key}
        title={data.name}
        subTitle={data.city}
        style={{ cursor: "pointer" }}
        footer={
            <div className="flex flex-wrap justify-content-end gap-2"></div>
        }
        header={header(data.image_url as string)}
        pt={{
            body: { className: "mx-0 px-3  text-sm" },
            content: { className: "py-0" },
        }}
        className="cards-carousel-hotels shadow-4 surface-border mx-0 border-round m-2  md:w-16rem"
    >
        {data.rooms.length} Habitaciones disponibles
        <p className="m-0">
            Disponibilidad para{" "}
            {data?.rooms?.reduce?.(
                (vb, va) => parseInt(va.max_occupancy) + vb,
                0
            )}{" "}
            personas
        </p>
    </Card>
);

type DivReference = React.LegacyRef<HTMLButtonElement>
const CustomNavigation = (props: {
    prevRef: DivReference
    nextRef: DivReference
}) => {
    const swiper = useSwiper();
    return (
        <div style={{ zIndex: "-9999", top: 0, left: 0 }} className="absolute">
            <button
                ref={props.prevRef}
                className="hidden"
                onClick={() => swiper.slidePrev()}
            ></button>
            <button
                ref={props.nextRef}
                className="hidden"
                onClick={() => swiper.slideNext()}
            ></button>
        </div>
    );
};
function CustomCarousel(
    props: HTMLAttributes<HTMLDivElement> & {
        items?: (DataTypeHotels & { rooms: DataTypeRooms[] })[]
    }
) {
    const [visible, setVisible] = useState(false);
    const [dataCurrentCard, setDataCurrentCard] = useState({});
    const prevRefNav = useRef<HTMLButtonElement>(null);
    const nextRefNav = useRef<HTMLButtonElement>(null);
    const itemsNotNull =
        props.items && Array.isArray(props.items) ? props.items : [];
    return (
        <div
            {...props}
            className={`${props.className} carousel-custom relative`}
        >
            <DialogBookHotel
                visible={visible}
                itemdata={
                    dataCurrentCard as DataTypeHotels & {
                        rooms: DataTypeRooms[],  id?: string
                    }
                }
                setvisible={setVisible}
            />
            <Swiper spaceBetween={4} breakpoints={breakpoints}>
                {itemsNotNull?.map?.((v, k) => (
                    <SwiperSlide
                        key={k}
                        data-testid="swiper-hotels-main-list-item"
                        onClick={() => {
                            setDataCurrentCard(v);
                            setVisible(true);
                        }}
                    >
                        {hotelTemplate(k, v)}
                    </SwiperSlide>
                ))}
                {(itemsNotNull.length === 0 && (
                    <span
                        data-testid="message-no-availability-carousel"
                        style={{ height: "100px" }}
                        className="block text-center mt-6"
                    >
                        No hay hoteles disponibles
                    </span>
                )) ||
                    ""}
                {<CustomNavigation prevRef={prevRefNav} nextRef={nextRefNav} />}
            </Swiper>
            {(itemsNotNull.length > 0 && (
                <Button
                    icon="pi pi-chevron-left bg-white"
                    data-testid="button-carousel-left"
                    className="carousel-left-button"
                    onClick={() => prevRefNav.current?.click()}
                    rounded
                    text
                    raised
                    severity="secondary"
                    aria-label="Notification"
                    style={{ left: "-18px" }}
                />
            )) ||
                ""}
            {(itemsNotNull.length > 0 && (
                <Button
                    icon="pi pi-chevron-right bg-white"
                    data-testid="button-carousel-right"
                    className="carousel-right-button"
                    onClick={() => nextRefNav.current?.click()}
                    rounded
                    text
                    raised
                    severity="secondary"
                    aria-label="Notification"
                />
            )) ||
                ""}
        </div>
    );
}

export default CustomCarousel;
