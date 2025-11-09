import { MoneyBox } from "./MoneyBox";

export interface User {
  id: string;
  name:string;
  surname: string;
  phone: number;
  zone: string;
  address: string;
  picture: string;
  moneyboxes: MoneyBox[];
  is_deleted: boolean;
  date: String;
}
