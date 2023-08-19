import { InputText } from "primereact/inputtext";
import React, { useRef } from "react";
import "./InputWithIcon.scss";
interface PropsInputWithIcon
    extends React.InputHTMLAttributes<HTMLInputElement> {
    icon?: string
}

function InputWithIcon(props: PropsInputWithIcon) {
    const input = useRef<HTMLInputElement>(null);
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
                ref={input}
                className="w-9 pl-0"
                placeholder="Ubicación"
            />
        </div>
    );
}

export default InputWithIcon;
