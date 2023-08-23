import { InputSwitch, InputSwitchProps } from "primereact/inputswitch";
import React from "react";

export const SwitchEnableDisable = (props: InputSwitchProps) => {
    return (
        <div
            onClick={props.onClick}
            className="card flex justify-content-center"
        >
            <InputSwitch {...props} />
        </div>
    );
};
