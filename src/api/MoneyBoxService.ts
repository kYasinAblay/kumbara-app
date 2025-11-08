import BaseApiService from "./BaseApiService";
import { MoneyBox } from "../models/MoneyBox";

class MoneyBoxService extends BaseApiService {
  async getList(params?:string[]): Promise<MoneyBox[]> {
    
    var request = await this.get<MoneyBox[]>("moneyboxlist");
    return request;
  }

  async getCount(): Promise<number> {
    return this.get<number>("moneyBoxCount");
  }

  async create(box: MoneyBox): Promise<MoneyBox> {
    return this.post<MoneyBox>("moneyBoxCreate", box);
  }

  async deleteById(id: string): Promise<void> {
    return this.delete(`moneyBoxDelete/${id}`);
  }
}

export default new MoneyBoxService();
