import { Button } from "primereact/button";
import { Column, ColumnEditorOptions } from "primereact/column";
import { InputText } from "primereact/inputtext";
import React from "react";
import { nameModule } from "../module-metadata";
import { DataTypeWithId } from "./form-components";
import { SwitchEnableDisable } from "src/components/atoms/SwitchEnableDisable/SwitchEnableDisable";

export const columnsTable: { label: string; field: string }[] = [
    { label: "Hotel", field: "hotel" },
    { label: "Costo", field: "cost" },
    { label: "Impuesto", field: "tax" },
    { label: "Localización", field: "location" },
    { label: "Tipo", field: "type" },
    { label: "Estado", field: "state" },
];

export const headerTable = (
    addHotel: () => void,
    setFetchingItems: () => Promise<void>,
    inputSearchOptions: {
        globalFilter: string
        setGlobalFilter: React.Dispatch<React.SetStateAction<string>>
    }
) => (
    <div className="flex  flex-wrap align-items-center justify-content-between gap-2">
        <span className="text-xl text-900 font-bold">{nameModule}</span>
        <div>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                    onChange={(e) =>
                        inputSearchOptions.setGlobalFilter(e.target.value)
                    }
                    value={inputSearchOptions.globalFilter}
                    className="p-inputtext-sm mr-2"
                    placeholder="Keyword Search"
                />
            </span>
            <Button
                onClick={() => addHotel()}
                icon="pi pi-plus"
                severity="success"
                className="mr-1"
                rounded
                raised
            />
            <Button
                onClick={() => setFetchingItems()}
                icon="pi pi-refresh"
                severity="secondary"
                rounded
                raised
            />
        </div>
    </div>
);

export const textEditorComponent = (columnOptions: ColumnEditorOptions) => {
    return (
        <InputText
            type="text"
            value={columnOptions.value}
            onChange={(e) => columnOptions.editorCallback!(e.target.value)}
        />
    );
};

export const ColumnsComponents = (
    data: DataTypeWithId[],
    update: (newData: DataTypeWithId) => void
) =>
    columnsTable?.map?.((col, key) => {
        if (col.field === "state")
            return (
                <Column
                    key={key}
                    field="state"
                    pt={{
                        headerContent: { className: "justify-content-center" },
                    }}
                    header="Estado"
                    body={(p: DataTypeWithId) => (
                        <SwitchEnableDisable
                            onClick={() => {
                                const item = data?.find(
                                    (item) => item.id === p.id
                                );
                                const newItem = {
                                    ...item,
                                    state:
                                        item?.state === "enabled"
                                            ? "disabled"
                                            : "enabled",
                                };
                                update(newItem as DataTypeWithId);
                            }}
                            checked={p.state === "enabled"}
                        />
                    )}
                ></Column>
            );
        else
            return (
                <Column
                    sortable
                    key={key}
                    field={col.field}
                    header={col.label}
                    editor={textEditorComponent}
                />
            );
    });
