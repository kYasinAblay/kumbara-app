export interface MoneyBox {
  id?: number;
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
