import LoginService from "../api/LoginService";
import { LoginRequest } from "../models/LoginRequest";
import { User } from "../models/User";
import { Check } from "../models/Check";
import { Logout } from "../models/Logout";
import SessionCookieStore from "../session/SessionCookieStore";

class AuthRepository {
  async login(user: LoginRequest): Promise<Check> {
    return await LoginService.login(user);
  }

  async logout(): Promise<Logout> {
    SessionCookieStore.clear();
    return await LoginService.logout();
  }

  async me(): Promise<Check> {
    try {
      debugger;
      var deneme = await LoginService.check();
      console.log(deneme);
      return await LoginService.check();
    } catch (error) {
      console.log(error);
      return {
        success: false,
        userId: "repositoryden geliyorum",
        role: "",
        status: 0,
        message: ""
      };
    }

  }
}

export default new AuthRepository();
