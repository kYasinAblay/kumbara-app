import BaseApiService from "./BaseApiService";
import { MoneyBox } from "../models/MoneyBox";
import { User } from "../models/User";
import { LoginRequest } from "../models/LoginRequest";
import { Check } from "../models/Check";
import { Logout } from "../models/Logout";

class LoginService extends BaseApiService {
   //burdaki check sınıfı user olarak değiştirilecek yada muadili
    async login(user: LoginRequest): Promise<Check> {
    return this.post<Check>("login", user);
  }
   async logout(): Promise<Logout> {
    return this.post<Logout>("logout");
  }
    async check(): Promise<Check> {
       return this.get<Check>("me");
  }
}
export default new LoginService();
