import React, { useRef } from "react";
import { CustomProvider, DateRangePicker, PickerHandle } from "rsuite";
import {
    DateRange,
    DateRangePickerProps,
    DisabledDateFunction,
} from "rsuite/esm/DateRangePicker";
import "./CustomDateRange.scss";
import { esES } from "rsuite/locales";
import { useQueryParams } from "src/services/Hooks";
const { beforeToday } = DateRangePicker;

function CustomDateRange(
    props: DateRangePickerProps & { icon?: string; inputclassname?: string }
) {
    const datePicker = useRef<PickerHandle>(null);
    const queryParams = useQueryParams();
    const defaultValue = (queryParams.get("dateFrom") as string)
        ? [
            new Date(queryParams.get("dateFrom") as string),
            new Date(queryParams.get("dateTo") as string),
        ] as DateRange
        : null;
    datePicker.current?.target
        ?.querySelector("input")
        ?.addEventListener("focus", () => {
            console.log("focus");

            setTimeout(() => datePicker.current?.open!(), 200);
        });

    return (
        <div
            className={`bg-white border-round-md pl-3 flex align-items-center ${props.className}`}
        >
            <i className={`pi ${props.icon}`}></i>
            <CustomProvider locale={esES}>
                <DateRangePicker
                  
                    defaultValue={defaultValue}
                    ref={datePicker}
                    {...props}
                    shouldDisableDate={beforeToday!() as DisabledDateFunction}
                    size="lg"
                    className={`daterangeinput  ${
                        props.inputclassname ? props.inputclassname : ""
                    } `}
                    placeholder="Fecha Ingreso - Fecha Salida"
                />
            </CustomProvider>
        </div>
    );
}

export default CustomDateRange;
