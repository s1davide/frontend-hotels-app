import { API_ROUTES } from "src/services/apiRoutes"

export const nameModule = "Habitaciones"
export const singularNameModule = "Habitación"
const nameInCode = "rooms"
export const indexRouterPath = `/admin/${nameInCode}/`
export const createRouterPath = `/admin/${nameInCode}/create`
export const updateRouterPath = `/admin/${nameInCode}/update`
export const indexBreadCrumb = [
    { label: nameModule, url: `/admin/${nameInCode}` },
]
export const createBreadCrumb = [
    { label: nameModule, url: `/admin/${nameInCode}` },
    {
        label: `Crear ${singularNameModule}`,
        url: `/admin/${nameInCode}/create`,
    },
]
export const updateBreadCrumb = [
    { label: nameModule, url: `/admin/${nameInCode}` },
    {
        label: `Editar ${singularNameModule}`,
        url: `/admin/${nameInCode}/update`,
    },
]
export const MAIN_ROUTE = API_ROUTES[nameInCode]
