import { MoneyBox } from "./MoneyBox";

export interface User {
  id: string;
  username?:string,
  name:string;
  surname: string;
  phone: string;
  zone: string;
  city:number;
  district:string;
  address: string;
  picture: string;
  moneyboxes: MoneyBox[];
  role:string,
  is_deleted: boolean;
  date: String;
}
