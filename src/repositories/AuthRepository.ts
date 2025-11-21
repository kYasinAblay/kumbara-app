import LoginService from "../api/LoginService";
import { LoginRequest } from "../models/LoginRequest";
import { User } from "../models/User";
import { Check } from "../models/Check";
import { Logout } from "../models/Logout";
import SessionCookieStore from "../session/SessionCookieStore";
import { Me } from "../models/Me";

class AuthRepository {
  async login(user: LoginRequest): Promise<Check> {
    return await LoginService.login(user);
  }

  async logout(): Promise<Logout> {
    SessionCookieStore.clear();
    return await LoginService.logout();
  }

  async me(): Promise<Me> {
    try {
      debugger;
      var deneme = await LoginService.me();
      console.log(deneme);


      return await LoginService.me();
    } catch (error) {
      console.log(error);
      return {
        success: false,
        user:{
          address:"",
          city:1,
          date:"",
          district:"",
          moneyboxes:[],
          name:"",
          surname:"",
          phone:"",
          role:"",
          zone:"",
          username:"",
          picture:"",
          is_deleted:false,
          id:"",
        },
      };
    }

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
