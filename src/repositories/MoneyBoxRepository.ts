import MoneyBoxService from "../api/MoneyBoxService";
import { MoneyBox } from "../models/MoneyBox";

class MoneyBoxRepository {
  async fetchAll(): Promise<MoneyBox[]> {
    return await MoneyBoxService.getList();
  }

  async add(box: MoneyBox): Promise<MoneyBox> {
    debugger;
    return await MoneyBoxService.create(box);
  }

  async update(box: MoneyBox): Promise<MoneyBox> {
    debugger;
    return await MoneyBoxService.update(box);
  }

  async remove(id: number): Promise<void> {
    return await MoneyBoxService.deleteById(id);
  }
}

export default new MoneyBoxRepository();
