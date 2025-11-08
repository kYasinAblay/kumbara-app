import MoneyBoxService from "../api/MoneyBoxService";
import { MoneyBox } from "../models/MoneyBox";

class MoneyBoxRepository {
  async fetchAll(): Promise<MoneyBox[]> {
    return await MoneyBoxService.getList();
  }

  async add(box: MoneyBox): Promise<MoneyBox> {
    return await MoneyBoxService.create(box);
  }

  async remove(id: string): Promise<void> {
    return await MoneyBoxService.deleteById(id);
  }
}

export default new MoneyBoxRepository();
