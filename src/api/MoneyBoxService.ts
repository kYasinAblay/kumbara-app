import BaseApiService from "./BaseApiService";
import { MoneyBox } from "../models/MoneyBox";

class MoneyBoxService extends BaseApiService {


  async getListWithParams(queryParams: Record<string, any>): Promise<{ data: MoneyBox[]; total: number }> {

  queryParams.isDeleted = false; 

    // Axios config objesi
    const config = {
      params: queryParams 
    };

  var request = await this.getWithConfig<{ data: MoneyBox[]; total: number }>("moneyboxlist", config);
  
  return request;
  }

  async getList(): Promise<MoneyBox[]> {

    var request = await this.get<MoneyBox[]>("moneyboxlist?isDeleted=false");
   console.log(request);
   
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

  async updateAmount(id:number,newAmount:number): Promise<MoneyBox> {
  
    try {
      return this.post<MoneyBox>(`MoneyBoxAmount/${id}`, {amount:newAmount});
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
