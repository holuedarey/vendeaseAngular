import { environment } from "../../environments/environment.prod";

const  BASE_URL = environment.production ? "https://vendease-backend.herokuapp.com" : "https://vendease-backend.herokuapp.com";

export const Endpoint = {
    AUTH: {
        login: `${BASE_URL}/authentication`,
        register: `${BASE_URL}/users`,
        verify: `${BASE_URL}/verify/phone`,
    },
    TRANSACTION: {
        transaction: `${BASE_URL}/transactions`,
    },

    DASHBOARD: {
        contribution: `${BASE_URL}/reports/contributions?`,
        recent_contribution: `${BASE_URL}/reports/contributions/recent?membershipCode=`,
        member_contribution: `${BASE_URL}/contributions/member/`,
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