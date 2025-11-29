import MoneyBoxService from "../api/MoneyBoxService";
import { MoneyBox } from "../models/MoneyBox";

class MoneyBoxRepository {
  async fetchAll(): Promise<MoneyBox[]> {
    return await MoneyBoxService.getList();
  }

  async add(box: MoneyBox): Promise<MoneyBox> {
  
    return await MoneyBoxService.create(box);
  }

  async update(box: MoneyBox): Promise<MoneyBox> {
 
    return await MoneyBoxService.update(box);
  }

  async updateAmount(id:number,amount:number): Promise<MoneyBox> {
 
    return await MoneyBoxService.updateAmount(id,amount);
  }

  async remove(id: number): Promise<void> {
    return await MoneyBoxService.deleteById(id);
  }
}

export default new MoneyBoxRepository();
