export interface MoneyBox {
  id?: string;
  zone: string;
  name: string;
  city?: string;
  amount: number;
  description: string;
  is_deleted?: boolean;
  created_at?: string;
  modified_at?:string;
  user_id?:string;
}
