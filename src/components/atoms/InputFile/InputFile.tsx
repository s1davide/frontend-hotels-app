import React, {
    ChangeEvent,
    InputHTMLAttributes,
    useRef,
    useState,
} from "react";
import "./InputFile.scss";
import InputError from "../InputError/InputError";
type PropsFileInput = InputHTMLAttributes<HTMLInputElement> & {
    parentclassname?: string
    error: { message?: string }
    sizelimit: number
    componentshowimage?: JSX.Element | undefined
}

function InputFile(props: PropsFileInput) {
    const [tooHeavy, setTooHeavy] = useState(false);
    const [fileName, setFileName] = useState("");
    const [messageSize, setMessageSize] = useState("");
    const refFileInput = useRef<HTMLInputElement>(null);

    const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if ((e.target.files?.length as number) > 0) {
            setTooHeavy(e.target.files![0].size > props.sizelimit);
            setMessageSize(`El tamaño limite es de ${props.sizelimit / 1000}kb`);
            setFileName(e.target.files![0].name);
        } else {
            setTooHeavy(false);
            setFileName("");
        }

        typeof props.onChange === "function" && props.onChange(e);
    };

    return (
        <div
            className={`custom-input-file relative flex flex-column justify-content-start ${props.parentclassname}`}
        >
            <label htmlFor={props.id} className="mb-2">
                Seleccionar Imagen:
            </label>
            <label
                className="text-custom-input-file"
                htmlFor={props.id}
                onClick={(e) => (
                    e.preventDefault(), refFileInput.current?.click()
                )}
            >
                {fileName ? fileName : "Seleccione un archivo"}
            </label>
            <input
                {...props}
                ref={refFileInput}
                onChange={handleFileSelected}
                type="file"
                name={props.name}
                id={props.id}
            />
            {props?.componentshowimage}
            {InputError(
                Boolean(props.error) || tooHeavy,
                (props.error && (props.error.message as string)) ||
                    (tooHeavy ? messageSize : "")
            )}
        </div>
    );
}

export default InputFile;
