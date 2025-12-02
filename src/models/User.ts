import { UserWithPassword } from "../data/users";
import { MoneyBox } from "./MoneyBox";

export interface User {
  id?: string;
  username?:string,
  name:string;
  surname: string;
  phone: string;
  zone: string;
  city:number;
  district:string;
  address: string;
  picture: string;
  moneyboxes?: MoneyBox[];
  role?:string,
  is_deleted?: boolean;
  created_at?: string;
  modified_at?:string;
}

export interface UserResponse {
 success: boolean;
 user:UserWithPassword;
}

