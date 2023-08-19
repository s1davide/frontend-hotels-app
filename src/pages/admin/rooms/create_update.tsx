import React, { useContext, useEffect } from "react"
import { Button } from "primereact/button"
import { Card } from "primereact/card"
import { BreadcrumbContext } from "src/services/ProvidersContext"
import {
    DataType,
    DataTypeWithId,
    Inputs,
    Schema,
    cleanFieldsOnCreate,
    fileSizeLimit,
    initialValues,
    loadItemForUpdate,
} from "./page-components/form-components"
import {
    createBreadCrumb,
    indexRouterPath,
    singularNameModule,
    updateBreadCrumb,
} from "./module-metadata"
import { FormikConfig, useFormik } from "formik"
import { useCreate } from "./page-functions/create-functions"
import { useUpdate } from "./page-functions/update-functions"
import { useNavigate, useParams } from "react-router-dom"

const initialConfigurations = {
    configuredBreadcrumb: false,
}

export default function ListData() {
    const { setItemsBreacrumb } = useContext(BreadcrumbContext)
    const { id } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (initialConfigurations.configuredBreadcrumb) return
        initialConfigurations.configuredBreadcrumb = true
        if (id) setItemsBreacrumb(updateBreadCrumb)
        else setItemsBreacrumb(createBreadCrumb)
    })

    const { create } = useCreate()
    const { update } = useUpdate(() => navigate(indexRouterPath))
    // if(id)Schema={...Schema}
    const optionsFormik: FormikConfig<DataType> = {
        initialValues,
        validationSchema: Schema(Boolean(id)),
        onSubmit: async (data) => {
            const file =
                document.querySelector<HTMLInputElement>("input[type=file]")
                    ?.files![0]
            if ((file?.size as number) > fileSizeLimit) return
            ;(data.file as unknown) = file
            console.log(file)

            if (id) update({ ...data, id: parseInt(id) } as DataTypeWithId)
            else create(data)
        },
    }
    const formik = useFormik(optionsFormik)
    if (id) loadItemForUpdate(id, formik)
    else cleanFieldsOnCreate(formik)
    //  formik.initialValues
    return (
        <main className={"centered-content w-full"}>
            <Card
                title={`${id ? "Editar" : "Crear"} ${singularNameModule}`}
                className="w-full"
            >
                {/* <Formik */}
                <form className="flex flex-wrap" onSubmit={formik.handleSubmit}>
                    <Inputs formikInstance={formik} />
                    <div className="w-full flex justify-content-end pr-1">
                        <Button
                            size="small"
                            label={`${
                                id ? "Editar" : "Crear"
                            } ${singularNameModule}`}
                            className="align-self-end mr-1"
                            type="submit"
                        />
                    </div>
                </form>
            </Card>
        </main>
    )
}
