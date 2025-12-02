import MoneyBoxService from "../api/MoneyBoxService";
import { MoneyBox } from "../models/MoneyBox";

class MoneyBoxRepository {

   async fetchPaginated(page = 1, limit = 10): Promise<{ data: MoneyBox[]; total: number }> {
    const params = {
        page: page,
        limit: limit
        // Diğer filtreler (city, zone vb.) buraya eklenebilir.
    };
    var response = await MoneyBoxService.getListWithParams(params);
    return { data: response.data, total: response.total };
  }
  async fetchAll(): Promise<MoneyBox[]> {
    //deleted=false olanları getirir.
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
