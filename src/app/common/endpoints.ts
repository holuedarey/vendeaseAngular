import { environment } from "../../environments/environment.prod";

const BASE_URL = environment.production ? "https://vendease-stg.herokuapp.com" : "https://vendease-stg.herokuapp.com";

export const Endpoint = {
    AUTH: {
        login: `${BASE_URL}/authentication`,
        users: `${BASE_URL}/users`,
        create_user: `${BASE_URL}/users`,

    },
    TRANSACTION: {
        transaction: `${BASE_URL}/transactions`,
    },

    DASHBOARD: {
        invoice: `${BASE_URL}/invoice`,
        analytic: `${BASE_URL}/analytics`,
        dashboard_graph: `${BASE_URL}/graph-data`,
        upload:`${BASE_URL}/upload`,
    },
    CLAIMS: {
        claims: `${BASE_URL}/claims`,
    },
    
    CLAIM_CONV: {
        claims: `${BASE_URL}/claims-conversation`,
    },
    PURCHASE: {
        purchase_orders:  `${BASE_URL}/purchase-orders`, 
    },

    PRODUCTS: {
        product: `${BASE_URL}/product`,
    },
    
    PAYMENT: {
        payment: `${BASE_URL}/payment`,
    },
    DELIVERY: { 
        delivery: `${BASE_URL}/delivery`,
    }
}