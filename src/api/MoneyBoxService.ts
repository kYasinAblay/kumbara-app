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
    debugger;
    try {
      console.log("Moneybox service çalıştı.");
      var url = box.id!==undefined ? `moneyBoxCreate/${box.id}` :"moneyBoxCreate/{id}";
      return this.patch<MoneyBox>(url, box);
    } catch (error) {
      return { 
        name:"",
        amount:0,
        description:"",
        is_deleted:false,
        zone:"",
        city:"",
        user_id:""
      };
    }
  }

  async deleteById(id: string): Promise<void> {
    return this.delete(`moneyBoxDelete/${id}`);
  }
}

export default new MoneyBoxService();
