import React from "react";
import { CustomProvider, DateRangePicker } from "rsuite";
import {
    DateRangePickerProps,
    DisabledDateFunction,
} from "rsuite/esm/DateRangePicker";
import "./CustomDateRange.scss";
import { esES } from "rsuite/locales";
const { beforeToday } = DateRangePicker;

function CustomDateRange(
    props: DateRangePickerProps & { icon?: string; inputclassname?: string }
) {
    return (
        <div
            className={`bg-white border-round-md pl-3 flex align-items-center ${props.className}`}
        >
            <i className={`pi ${props.icon}`}></i>
            <CustomProvider locale={esES}>
                <DateRangePicker
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
