import UserService from "../api/UserService";
import { User } from "../models/User";


class UserRepository {
  // async fetchAll(): Promise<User[]> {
  //   return await UserService.getList();
  // }

  async update(user: Omit<User, "id" | "date" | "is_deleted" | "moneyboxes" | "role">): Promise<User> {
    return await UserService.update(user);
  }

  //  async add(user: User): Promise<User> {
  //   return await UserService.create(box);
  // }

  // async remove(id: string): Promise<void> {
  //   return await UserService.deleteById(id);
  // }
}

export default new UserRepository();
