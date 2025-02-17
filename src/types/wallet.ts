
export interface Transaction {
  type: string;
  amount: number;
  date: Date;
  source:string
}

export interface UserProfile {
  balance: number;
  email: string;
  name: string;
  phone:number
}