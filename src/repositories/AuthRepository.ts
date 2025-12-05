import LoginService from "../api/LoginService";
import { LoginRequest, RegisterRequest } from "../models/LoginRequest";
import { User } from "../models/User";
import { Check } from "../models/Check";
import { Logout } from "../models/Logout";
import SessionCookieStore from "../session/SessionCookieStore";
import { Me } from "../models/Me";

class AuthRepository {
  async login(user: LoginRequest): Promise<Check> {
    return await LoginService.login(user);
  }

    async register(user: RegisterRequest): Promise<Check> {
    return await LoginService.register(user);
  }

  async logout(): Promise<Logout> {
    SessionCookieStore.clear();
    return await LoginService.logout();
  }

  async me(): Promise<Me> {
  return await LoginService.me();
  }

    async check(): Promise<Check> {
    try {
      return await LoginService.check();
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message:"Bilgilerinize ulaşılamadı.."
      };
    }

  }
}

export default new AuthRepository();
