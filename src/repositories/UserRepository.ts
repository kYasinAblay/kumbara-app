import UserService from "../api/UserService";
import { User, UserResponse } from "../models/User";


class UserRepository {
  async fetchAll(): Promise<User[]> {
    return await UserService.getList();
  }

  async update(user: Omit<User, "created_at" | "is_deleted" | "moneyboxes" | "role">): Promise<User> {
    return await UserService.update(user);
  }

   async add(user: User): Promise<UserResponse> {
      return await UserService.create(user);
  }

  async remove(id: string): Promise<boolean> {
    return await UserService.deleteUser(id);
  }
}

export default new UserRepository();
