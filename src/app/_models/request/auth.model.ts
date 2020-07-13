export interface LoginRequestModel {
    email?: string;
    password?: string;
    strategy?: string;
}

export interface RegisterVendorRequestModel {
    name: string,
    email: string,
    password: string,
    type: string,
    phone: string,
    vendor: {
        name: string,
        address: string
    }
}


export interface RegisterSystemRequestModel {
    name: string,
    email: string,
    password: string,
    type: string,
    phone: string,
    system: {
        name: string,
        address: string
    }
}


export interface RegisterCreateRequestModel {
    name: string,
    email: string,
    password: string,
    phone: string,
    permissions: string
}

export interface RegisterBusinessRequestModel {
    name: string,
    email: string,
    password: string,
    type: string,
    phone: string,
    company: {
        name: string,
        address: string
    }
}
