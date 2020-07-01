export interface LoginResponseModel {
    data:{
        token?: string;
        user:{
            firstname?:string,
        }
    }
}

export interface RegisterResponseModel {
    message?: string;
    
}