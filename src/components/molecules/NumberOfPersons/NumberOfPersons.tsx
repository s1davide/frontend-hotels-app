import { InputText, InputTextProps } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import React, { useRef, useState } from "react";
import InputNumberCustom from "src/components/atoms/InputNumberCustom/InputNumberCustom";
type InputType = InputTextProps & React.RefAttributes<HTMLInputElement>
function NumberOfPersons(props: InputType) {
    const menu = useRef<OverlayPanel>(null);
    const [adults, setAdults] = useState(0);
    return (
        <>
            <OverlayPanel ref={menu}>
                <section>
                    <section
                        style={{ minWidth: "300px" }}
                        className="flex align-items-center justify-content-between"
                    >
                        <h2 className="text-700" style={{ fontSize: "1rem" }}>
                            Cantidad de Personas
                        </h2>
                        <InputNumberCustom
                            onChange={(e) => setAdults(e.value)}
                        />
                    </section>
                </section>
            </OverlayPanel>
            <InputText
                {...props}
                placeholder={`Cantidad de personas: ${adults}`}
                readOnly={true}
                contentEditable={false}
                className={`shadow-none ${props.className}`}
                onClick={(event) => menu.current?.toggle(event)}
                aria-controls="popup_menu_left"
                aria-haspopup
            />
        </>
    );
}

export default NumberOfPersons;
