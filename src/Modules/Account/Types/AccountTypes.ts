export interface IAllAccountList {
  data: [
    {
      id: number;
      hotel_id: number;
      name: string;
      branch: string;
      account_number: string;
      details: string;
      bank: string;
      created_at: string;
      status: number;
      available_balance: string;
    }
  ];
}
