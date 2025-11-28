import BaseApiService from "./BaseApiService";
import { MoneyBox } from "../models/MoneyBox";

class MoneyBoxService extends BaseApiService {
  async getList(params?: string[]): Promise<MoneyBox[]> {

    var request = await this.get<MoneyBox[]>("moneyboxlist?isDeleted=false");
    return request;
  }

  async getCount(): Promise<number> {
    return this.get<number>("moneyBoxCount");
  }

  async create(box: MoneyBox): Promise<MoneyBox> {
    try {
      return this.patch<MoneyBox>("moneyBoxCreate", box);
    } catch (error) {
      return {
        id:0,
        name: "",
        amount: 0,
        description: "",
        is_deleted: false,
        zone: "",
        city: "",
        user_id: ""
      };
    }
  }

  async update(box: MoneyBox): Promise<MoneyBox> {
    debugger;
    try {
      return this.patch<MoneyBox>(`moneyBoxCreate?id=${box.id}`, box);
    } catch (error) {
      return {
        id:0,
        name: "",
        amount: 0,
        description: "",
        is_deleted: false,
        zone: "",
        city: "",
        user_id: ""
      };
    }
  }

  async deleteById(id: number): Promise<void> {
    return this.delete(`moneyBoxDelete/${id}`);
  }
}

export default new MoneyBoxService();
