export const SERVER_ROUTE =
    process.env.BACKEND_ENDPOINT_DEV ||
    process.env.BACKEND_ENDPOINT_STAGING ||
    process.env.BACKEND_ENDPOINT_MAIN ||
    process.env.BACKEND_ENDPOINT_PROD;

export const API_ROUTES = {
    hotels: "/hotels",
    references: "/references",
    rooms: "/rooms",
};
