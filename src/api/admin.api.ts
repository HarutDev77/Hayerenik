import axiosRequest from "@/api/axiosRequest";
import {AxiosResponse} from "axios";

export default class AdminApi {
    // properties

    static async getProperties ():Promise<AxiosResponse<any>>{
        const response =  await axiosRequest.get("admin/property")
        return response.data.resData
    }

    static async getPropertyById (id:number):Promise<AxiosResponse<any>>{
        const response =  await axiosRequest.get(`admin/property/edit-page-data/${id}`)
        return response.data.resData
    }

    static async createProperty (data:any):Promise<AxiosResponse<any>>{
        return await axiosRequest.post("admin/property", data)
    }

    static async editProperty (data:any):Promise<AxiosResponse<any>>{
        console.log(data)
        return await axiosRequest.put(`admin/property/${data.id}`, data.data)
    }

    static async deleteProperty (id:number):Promise<AxiosResponse<any>>{
        return await axiosRequest.delete(`admin/property/${id}`)
    }

    // products

    static async createProduct(data:any):Promise<AxiosResponse<any>>{
        return await axiosRequest.post("admin/product", data)
    }

    static async getProductsDataForCreate ():Promise<AxiosResponse<any>>{
        const response =  await axiosRequest.get("admin/product/create-page-data")
        return response.data.resData
    }
}