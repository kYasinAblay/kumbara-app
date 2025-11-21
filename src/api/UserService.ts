import BaseApiService from "./BaseApiService";
import { User } from "../models/User";
import AuthRepository from "../repositories/AuthRepository";
import { Me } from "../models/Me";

class UserService extends BaseApiService {
   //burdaki check sınıfı user olarak değiştirilecek yada muadili
    async update(user: Omit<User, "id" | "date" | "is_deleted" | "moneyboxes" | "role">): Promise<User> {
    return this.patch<User>("user/update", user);
  }
   async create(user: User): Promise<User> {
    const{ id,...userWithoutId} = user;
    return this.patch<User>("user/create", userWithoutId);
  }
   
  async getMe() :Promise<Me>{
    return await AuthRepository.me();
  }
};

export default new UserService();
