import { InputText } from "primereact/inputtext";
import React, { useRef } from "react";
import "./InputWithIcon.scss";
import { useQueryParams } from "src/services/Hooks";
interface PropsInputWithIcon
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: string
}

function InputWithIcon(props: PropsInputWithIcon & { inputid?: string }) {
    const input = useRef<HTMLInputElement>(null);
    const queryParam = useQueryParams();
    return (
        <div
            {...props}
            className={`inputwithicon p-inputgroup ${"" || props.className}`}
        >
            <span
                onClick={() => input.current?.focus()}
                className="p-inputgroup-addon pr-0 pl-1 bg-white border-none"
            >
                <i className={`pi ${props.icon} `}></i>
            </span>
            <InputText
                id={props.inputid || ""}
                ref={input}
                className="w-9 pl-0"
                placeholder="Ubicación"
                defaultValue={queryParam.get("location")||""}
            />
        </div>
    );
}

export default InputWithIcon;
