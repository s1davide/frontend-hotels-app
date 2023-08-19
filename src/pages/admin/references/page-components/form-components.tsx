import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { InputText, InputTextProps } from "primereact/inputtext"
import React, { HTMLAttributes, HTMLInputTypeAttribute } from "react"
import { useFetch, useFetchOne } from "../page-functions/fetch-data"
import { SelectItem } from "primereact/selectitem"
import InputError from "src/components/atoms/InputError/InputError"
import { FormikTouched, useFormik } from "formik"
import { InferType, object, string } from "yup"

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
export const fileSizeLimit = 600000
const fieldsValidations = {
    domain: string().required("Este campo es requerido"),
    description: string().required("Este campo es requerido"),
    optional: string(),
    range_value: string().required("Este campo es requerido"),
    state: string().required("Este campo es requerido"),
}

export const CustomInput = (
    props: HTMLAttributes<HTMLDivElement> & PropsCustomBasicInput
) => {
    const touched = props.formikInstance?.touched
    const errors = props.formikInstance?.errors
    const isValid = !!(touched![props.name] && errors![props.name])
    const message = errors![props.name]

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
    )
}

export const Schema = object().shape(fieldsValidations)
export type DataType = InferType<typeof Schema>
export type DataTypeWithId = DataType & { id: number }
export const initialValues = Object.keys(fieldsValidations).reduce(
    (previous, current) => ({ ...previous, [current]: "" }),
    {}
) as unknown as DataType

export const loadItemForUpdate = (
    id: string,
    formikInstance: FormikInstance
) => {
    const { data } = useFetchOne(id, "get_value_for_update")
    const initialValuesFormik = formikInstance.initialValues as {
        [key: string]: unknown
    }
    if (!data) return
    Object.keys(initialValuesFormik).forEach((field) => {
        initialValuesFormik[field] = data[field as keyof DataTypeWithId]
    })
}
export const cleanFieldsOnCreate = (formikInstance: FormikInstance) => {
    const initialValuesFormik = formikInstance.initialValues as {
        [key: string]: unknown
    }
    Object.keys(initialValuesFormik).forEach((field) => {
        initialValuesFormik[field] = ""
    })
}

export const Inputs = ({
    formikInstance,
}: {
    formikInstance: FormikInstance
}) => {
    const { data } = useFetch({ field: "domain", value: "DOM_STATE" })
    const itemsReference = data?.map<SelectItem>((item) => ({
        label: item.description,
        value: item.range_value,
    }))

    return (
        <>
            <CustomInput
                name="domain"
                label="Dominio"
                required={true}
                formikInstance={formikInstance}
                onChange={formikInstance.handleChange}
                value={formikInstance.values.domain}
                className="col-12 sm:col-6 md:col-6 xl:col-3"
            />
            <CustomInput
                name="range_value"
                label="Valor"
                required={true}
                formikInstance={formikInstance}
                onChange={formikInstance.handleChange}
                value={formikInstance.values.range_value}
                className="col-12 sm:col-6 md:col-6 xl:col-3"
            />
            <CustomInput
                name="description"
                label="Descripción"
                required={true}
                formikInstance={formikInstance}
                onChange={formikInstance.handleChange}
                value={formikInstance.values.description}
                className="col-12 sm:col-6 md:col-6 xl:col-3"
            />
            <CustomInput
                name="optional"
                label="Opcional"
                formikInstance={formikInstance}
                onChange={formikInstance.handleChange}
                value={formikInstance.values.optional}
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
        </>
    )
}
