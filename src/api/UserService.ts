import BaseApiService from "./BaseApiService";
import { User } from "../models/User";
import AuthRepository from "../repositories/AuthRepository";
import { Me } from "../models/Me";

class UserService extends BaseApiService {

  async getList(params?: string[]): Promise<User[]> {
    var request = await this.get<User[]>("users");
    return request;
  }
  //burdaki check sınıfı user olarak değiştirilecek yada muadili
  async update(user: Omit<User, "created_at" | "is_deleted" | "moneyboxes" | "role">): Promise<User> {
    return this.patch<User>("user/create/" + user.id, user);
  }
  
  async create(user: User): Promise<User> {
    const { id, ...userWithoutId } = user;
    return this.patch<User>("user/create", userWithoutId);
  }

  async getMe(): Promise<Me> {
    return await AuthRepository.me();
  }
};

export default new UserService();
