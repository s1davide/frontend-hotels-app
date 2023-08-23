import { InputText, InputTextProps } from "primereact/inputtext";
import { OverlayPanel } from "primereact/overlaypanel";
import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import InputNumberCustom from "src/components/atoms/InputNumberCustom/InputNumberCustom";
import { useQueryParams } from "src/services/Hooks";

type InputType = InputTextProps & React.RefAttributes<HTMLInputElement>
const NumberOfPersons = forwardRef((props: InputType, _ref) => {
    const menu = useRef<OverlayPanel>(null);
    const [adults, setAdults] = useState(0);
    const [firstLoad, setFirstLoad] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const queryParams = useQueryParams();
    const focused = (e: React.FocusEvent<HTMLInputElement>) => {
        setTimeout(() => menu.current?.show(e, e.target), 150);
    };
    inputRef.current?.addEventListener("keydown", (e) => {
        e.key === "Tab" && menu.current?.hide();
    });
    useEffect(() => {
        if (!firstLoad) {
            const persons = parseInt(queryParams.get("persons") as string);
            if (queryParams.get("persons") as string) setAdults(persons);
            setFirstLoad(true);
        }
    });
    useImperativeHandle(_ref, () => ({
        getPersonsCount: () => adults,
    }));
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
                            value={adults}
                            onChange={(e) => setAdults(e.value)}
                        />
                    </section>
                </section>
            </OverlayPanel>
            <InputText
                ref={inputRef}
                {...props}
                onFocus={focused}
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
});
NumberOfPersons.displayName="NumberOfPersons";
export default NumberOfPersons;
