import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";
const itemsSidebar: { label: string; icon: string; url: string }[] = [
    { label: "Mis Hoteles", icon: "pi-building", url: "/admin/hotels" },
    { label: "Habitaciones", icon: "pi-home", url: "/admin/rooms" },
    { label: "Reservas", icon: "pi-calendar-times", url: "/" },
    { label: "Referencias", icon: "pi-list", url: "/admin/references" },
];
export const GroupItems = () => {
    const navigate = useNavigate();
    return (
        <ul className="w-full">
            <div className="mb-2 pl-1 font-semibold">
                <span>Menú Principal</span>
            </div>
            {itemsSidebar?.map?.((item, key) => (
                <li
                    key={key}
                    onClick={(e) => (e.preventDefault(), navigate(item.url))}
                >
                    <a href={item.url}>
                        <Button
                            appearance="subtle"
                            className="w-full mt-1 justify-content-start text-left text-sm text-700"
                        >
                            <i className={`pi ${item.icon} text-xs mr-2`} />
                            {item.label}
                        </Button>
                    </a>
                </li>
            ))}
        </ul>
    );
};
