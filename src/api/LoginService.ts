import BaseApiService from "./BaseApiService";
import { MoneyBox } from "../models/MoneyBox";
import { User } from "../models/User";
import { LoginRequest } from "../models/LoginRequest";
import { Check } from "../models/Check";
import { Logout } from "../models/Logout";
import { Me } from "../models/Me";

class LoginService extends BaseApiService {
  //burdaki check sınıfı user olarak değiştirilecek yada muadili
  async login(user: LoginRequest): Promise<Check> {
    return this.post<Check>("login", user);
  }
  async logout(): Promise<Logout> {
    return this.post<Logout>("logout");
  }
  async me(): Promise<Me> {
    return this.get<Me>("me");
  }
    async check(): Promise<Check> {
    return this.get<Check>("check");
  }
}
export default new LoginService();
