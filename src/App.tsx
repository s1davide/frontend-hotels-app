import React, { useRef } from "react";
import Router from "./Router.tsx";
import "src/App.scss";

import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import QueryClientProviderComponent, {
    NotificationContext,
} from "./services/ProvidersContext.tsx";
import { Toast } from "primereact/toast";
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.min.css'
const App = () => {
    const toastRef = useRef<Toast>(null);
    return (
        <QueryClientProviderComponent>
            <PrimeReactProvider>
                <Toast ref={toastRef} />
                <NotificationContext.Provider value={toastRef}>
                    <Router />
                </NotificationContext.Provider>
            </PrimeReactProvider>
        </QueryClientProviderComponent>
    );
};
export default App;
