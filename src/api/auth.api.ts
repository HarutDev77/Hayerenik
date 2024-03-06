import axiosRequest from '@/api/axiosRequest';
import { LoginData } from '@/types/login-data';

export default class AuthApi {
   static async login(data: LoginData): Promise<any> {
      return axiosRequest.post('admin/login', data);
   }
}
