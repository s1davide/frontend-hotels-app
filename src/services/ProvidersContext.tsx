import { MenuItem } from "primereact/menuitem"
import { Toast } from "primereact/toast"
import React, { createContext } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

export const SidebarContext = createContext<{
    openSidebar: boolean
    setOpenSidebar: React.Dispatch<React.SetStateAction<boolean>>
}>({ openSidebar: false, setOpenSidebar: () => false })

export const BreakpointSidebarContext = createContext<{
    isSmallScreen: boolean
    setIsSmallScreen: React.Dispatch<React.SetStateAction<boolean>>
}>({ isSmallScreen: false, setIsSmallScreen: () => false })

export const BreadcrumbContext = createContext<{
    itemsBreadcrumb: MenuItem[]
    setItemsBreacrumb: React.Dispatch<React.SetStateAction<MenuItem[]>>
}>({ itemsBreadcrumb: [], setItemsBreacrumb: () => [] })

export const NotificationContext = createContext<
    React.MutableRefObject<Toast | null> | undefined
>(undefined)

export default function QueryClientProviderComponent({
    children,
}: {
    children: React.ReactNode
}) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}
