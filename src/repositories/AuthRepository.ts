import LoginService from "../api/LoginService";
import { LoginRequest } from "../models/LoginRequest";
import { User } from "../models/User";
import { Check } from "../models/Check";
import { Logout } from "../models/Logout";

class AuthRepository {
  async login(user:LoginRequest): Promise<Check> {
    return await LoginService.login(user);
  }

  async logout(): Promise<Logout> {
    return await LoginService.logout();
  }

  async me(): Promise<Check> {
    return await LoginService.check();
  }
}

export default new AuthRepository();
