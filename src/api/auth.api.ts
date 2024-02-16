import axiosRequest from "@/api/axiosRequest";
import {ILoginData} from "@/types/admin";
import {AxiosResponse} from "axios";

export default class AuthApi {
    static async login (data:ILoginData):Promise<any>{
        return await axiosRequest.post("admin/login", data)
    }
}