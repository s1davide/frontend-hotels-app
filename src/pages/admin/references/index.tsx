import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import React, { useContext, useEffect, useState } from "react";
import { BreadcrumbContext } from "src/services/ProvidersContext";
import {
    ColumnsComponents,
    headerTable,
} from "./page-components/table-components";
import { useUpdate } from "./page-functions/update-functions";
import { Column } from "primereact/column";
import { useFetch } from "./page-functions/fetch-data";
import { useNavigate } from "react-router-dom";
import {
    createRouterPath,
    indexBreadCrumb,
    updateRouterPath,
} from "./module-metadata";
import { DataTypeWithId } from "./page-components/form-components";
import { Button } from "primereact/button";
const initialConfigurations = {
    configuredBreadcrumb: false,
};

function AdminMainPage() {
    const { setItemsBreacrumb } = useContext(BreadcrumbContext);
    const [globalFilter, setGlobalFilter] = useState("");
    useEffect(() => {
        if (!initialConfigurations.configuredBreadcrumb) {
            initialConfigurations.configuredBreadcrumb = true;
            setItemsBreacrumb(indexBreadCrumb);
        }
        return () => {
            initialConfigurations.configuredBreadcrumb = false;
        };
    });
    const { data, refetch, isFetching } = useFetch();
    const navigate = useNavigate();
    const { update } = useUpdate(refetch);
    return (
        <main className=" aminnamepage">
            <Card className="w-full pr-0 mr-0">
                <DataTable
                    globalFilter={globalFilter}
                    paginator
                    rows={6}
                    size="small"
                    data-testid="contact-component"
                    editMode="row"
                    className="w-full"
                    loading={isFetching}
                    value={Array.isArray(data) ? data : []}
                    header={headerTable(
                        () => navigate(createRouterPath),
                        refetch,
                        { globalFilter, setGlobalFilter }
                    )}
                >
                    {ColumnsComponents(data as DataTypeWithId[], update)}
                    <Column
                        header="Editar"
                        headerStyle={{
                            width: "10%",
                            // minWidth: "8rem",
                        }}
                        body={(item: DataTypeWithId) => (
                            <Button
                                icon="pi pi-file-edit"
                                onClick={() =>
                                    navigate(updateRouterPath + `/${item.id}`)
                                }
                                rounded
                                text
                                severity="info"
                                aria-label="User"
                            />
                        )}
                    ></Column>
                </DataTable>
            </Card>
        </main>
    );
}

export default AdminMainPage;
