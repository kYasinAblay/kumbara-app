import BaseApiService from "./BaseApiService";
import { Credentials, User, UserResponse } from "../models/User";
import AuthRepository from "../repositories/AuthRepository";
import { Me } from "../models/Me";

class UserService extends BaseApiService {

  async getList(params?: string[]): Promise<User[]> {
    var request = await this.get<User[]>("users");
    return request;
  }
  
  async update(user: Omit<User, "created_at" | "is_deleted" | "moneyboxes" | "role">): Promise<User> {
    return this.put<User>("user/update/" + user.id, user);
  }
  
  async create(user: User): Promise<UserResponse> {

    console.log(user);
    const { id, ...userWithoutId } = user;

    try {
          return await this.post<UserResponse>("user/create", userWithoutId);
    } catch (error) {
      console.log("hata aldık",error);
    }
    throw new Error("User creation failed");
  }

  async deleteUser(id: string): Promise<boolean> {
    try {
    
          return await this.delete<boolean>("user/delete/"+id);
    } catch (error) {
      console.log("hata aldık",error);
    }
    throw new Error("User deletion failed");
  }

  async updatePassword(userId:string,credential:Credentials): Promise<UserResponse> {

    try {
          return await this.put<UserResponse>("user/changepassword/"+userId, credential);
    } catch (error) {
      console.log("hata aldık",error);
    }
    throw new Error("User change password failed");
  }


  async getMe(): Promise<Me> {
    return await AuthRepository.me();
  }
};

export default new UserService();
