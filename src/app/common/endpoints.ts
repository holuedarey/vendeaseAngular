import { environment } from "../../environments/environment.prod";

const  BASE_URL = environment.production ? "https://vendease-backend.herokuapp.com" : "https://vendease-backend.herokuapp.com";

export const Endpoint = {
    AUTH: {
        login: `${BASE_URL}/authentication`,
        users: `${BASE_URL}/users`,
        create_user:`${BASE_URL}/users`,
        
    },
    TRANSACTION: {
        transaction: `${BASE_URL}/transactions`,
    },

    DASHBOARD: {
        invoice: `${BASE_URL}/invoice`,
        dashboard_graph: `${BASE_URL}/graph-data`,
        analytics: `${BASE_URL}/analytics`,
        loan:  `${BASE_URL}/reports/loans?`,
        loan_repayment:  `${BASE_URL}/reports/loanrepayments?`,
    },

    MEMBERDETAILS: {
        create_contriution : `${BASE_URL}/contributions`
    },
    MANDATES: {
        create_mandate : `${BASE_URL}/mandates`,
        member_mandate : `${BASE_URL}/mandates/search/`

    }

}