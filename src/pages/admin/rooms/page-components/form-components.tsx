import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { InputText, InputTextProps } from "primereact/inputtext";
import React, { HTMLAttributes, HTMLInputTypeAttribute, useState } from "react";
import { useFetchOne } from "../page-functions/fetch-data";
import { SelectItem } from "primereact/selectitem";
import InputError from "src/components/atoms/InputError/InputError";
import { FormikTouched, useFormik } from "formik";
import { InferType, object, string } from "yup";
import { useFetch as useFetchReferences } from "../../references/page-functions/fetch-data";
import { useFetch as useFetchHotels } from "src/pages/admin/hotels/page-functions/fetch-data";
import InputFile from "src/components/atoms/InputFile/InputFile";
import { useParams } from "react-router-dom";
import { Dialog } from "primereact/dialog";

type InputOptions = {
    type?: HTMLInputTypeAttribute | "select"
    items?: SelectItem[]
    classnameinput?: string
}

type FormikInstance = ReturnType<typeof useFormik<DataType>>

type PropsCustomBasicInput = {
    name: keyof FormikTouched<DataType>
    label: string
    formikInstance?: FormikInstance
    onChange?:
        | React.ChangeEventHandler<HTMLInputElement>
        | ((event: DropdownChangeEvent) => void)
    value?: InputTextProps["value"]
    required?: boolean
    options?: InputOptions
}

export const fileSizeLimit = 800000;

const fieldsValidations = {
    hotel_id: string().required("Este campo es requerido"),
    cost: string().required("Este campo es requerido"),
    tax: string().required("Este campo es requerido"),
    type: string().required("Este campo es requerido"),
    location: string().required("Este campo es requerido"),
    state: string().required("Este campo es requerido"),
    file: string().required("Este campo es requerido"),
    image_url: string(),
};

export const CustomInput = (
    props: HTMLAttributes<HTMLDivElement> & PropsCustomBasicInput
) => {
    const touched = props.formikInstance?.touched;
    const errors = props.formikInstance?.errors;
    const isValid = !!(touched![props.name] && errors![props.name]);
    const message = errors![props.name];
    return (
        <div className={`field ${props.className}`}>
            <label htmlFor={props.name}>{props.label}</label>
            {props.options?.type === "select" ? (
                <Dropdown
                    id={props.name}
                    name={props.name}
                    required={props.required}
                    className={`text-base text-color surface-overlay p-0 m-0 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full ${
                        props.options?.classnameinput || ""
                    }`}
                    filter
                    value={props.value}
                    onChange={
                        props.onChange as (event: DropdownChangeEvent) => void
                    }
                    options={props.options.items}
                />
            ) : (
                <InputText
                    id={props.name}
                    name={props.name}
                    required={props.required}
                    type={props.options?.type || "text"}
                    value={props.value}
                    onChange={props.onChange}
                    className={`text-base text-color surface-overlay p-2 border-1 border-solid surface-border border-round appearance-none outline-none focus:border-primary w-full ${
                        props.options?.classnameinput || ""
                    }`}
                />
            )}
            {InputError(isValid, message as string)}
        </div>
    );
};

export const Schema = (idUpdate: boolean) => {
    const fieldValidationsDynamic = idUpdate
        ? { ...fieldsValidations, file: string() }
        : fieldsValidations;
    return object().shape(fieldValidationsDynamic);
};
export type DataType = InferType<ReturnType<typeof Schema>>
export type DataTypeWithId = DataType & { id: number }
export const initialValues = Object.keys(fieldsValidations).reduce(
    (previous, current) => ({ ...previous, [current]: "" }),
    {}
) as unknown as DataType;

export const loadItemForUpdate = (
    id: string,
    formikInstance: FormikInstance
) => {
    const { data } = useFetchOne(id, "get_value_for_update");
    const initialValuesFormik = formikInstance.initialValues as {
        [key: string]: unknown
    };
    if (!data) return;
    Object.keys(initialValuesFormik).forEach((field) => {
        initialValuesFormik[field] = data[field as keyof DataTypeWithId];
    });
};

export const cleanFieldsOnCreate = (formikInstance: FormikInstance) => {
    const initialValuesFormik = formikInstance.initialValues as {
        [key: string]: unknown
    };
    Object.keys(initialValuesFormik).forEach((field) => {
        initialValuesFormik[field] = "";
    });
};

export const Inputs = ({
    formikInstance,
}: {
    formikInstance: FormikInstance
}) => {
    const [showDialog, setShowDialog] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);
    const { id } = useParams();
    const { data } = useFetchReferences({ field: "domain", value: "DOM_STATE" });
    const itemsReference = data?.map<SelectItem>((item) => ({
        label: item.description,
        value: item.range_value,
    }));
    const { data: dataHotels } = useFetchHotels();
    const listHotels = dataHotels?.map<SelectItem>((item) => ({
        label: item.name,
        value: item.id,
    }));

    const fileInputError =
        formikInstance.errors.file && formikInstance.touched.file;

    return (
        <>
            <CustomInput
                name="hotel_id"
                label="Hotel"
                required={true}
                formikInstance={formikInstance}
                onChange={formikInstance.handleChange}
                value={formikInstance.values.hotel_id}
                options={{ type: "select", items: listHotels }}
                className="col-12 sm:col-6 md:col-6 xl:col-3"
            />
            <CustomInput
                name="cost"
                label="Costo"
                required={true}
                formikInstance={formikInstance}
                onChange={formikInstance.handleChange}
                value={formikInstance.values.cost}
                options={{ type: "number" }}
                className="col-12 sm:col-6 md:col-6 xl:col-3"
            />
            <CustomInput
                name="tax"
                label="Impuesto"
                required={true}
                formikInstance={formikInstance}
                onChange={formikInstance.handleChange}
                value={formikInstance.values.tax}
                options={{ type: "number" }}
                className="col-12 sm:col-6 md:col-6 xl:col-3"
            />
            <CustomInput
                name="type"
                label="Tipo"
                required={true}
                formikInstance={formikInstance}
                onChange={formikInstance.handleChange}
                value={formikInstance.values.type}
                className="col-12 sm:col-6 md:col-6 xl:col-3"
            />
            <CustomInput
                name="location"
                label="Ubicación de habitación"
                formikInstance={formikInstance}
                onChange={formikInstance.handleChange}
                value={formikInstance.values.location}
                className="col-12 sm:col-6 md:col-6 xl:col-3"
            />

            <CustomInput
                name="state"
                label="Estado"
                formikInstance={formikInstance}
                onChange={formikInstance.handleChange}
                value={formikInstance.values.state}
                options={{ type: "select", items: itemsReference }}
                className="col-12 sm:col-6 md:col-6 xl:col-3"
            />
            <InputFile
                error={
                    fileInputError
                        ? { message: formikInstance.errors.file }
                        : {}
                }
                id="file"
                name="file"
                onChange={formikInstance.handleChange}
                sizelimit={fileSizeLimit}
                parentclassname="col-12 mb-7 sm:mb-0 sm:col-6 md:col-6 xl:col-3"
                componentshowimage={
                    id ? (
                        <a
                            className="component-show-image text-sm"
                            onClick={() => setShowDialog(true)}
                        >
                            Imagen Actual
                        </a>
                    ) : undefined
                }
            />

            <Dialog
                header="Imagen Actual"
                visible={showDialog}
                style={{ width: "50vw" }}
                onHide={() => setShowDialog(false)}
            >
                <div className="flex justify-content-center">
                    {!imageLoaded ? "Cargando imagen..." : ""}
                    <img
                        width={"500px"}
                        src={formikInstance.values.image_url}
                        alt="Imagen actual del hotel"
                        onLoad={() => {
                            setImageLoaded(true);
                        }}
                    />
                </div>
            </Dialog>
        </>
    );
};
