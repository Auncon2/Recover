export interface IInvoiceReport {
  rooms: IViewInvoiceReport[];
}

export interface IViewInvoiceReport {
  invoice_id: number;
  invoice_no: string;
  hotel_id: number;
  user_id: number;
  discount_amount: string;
  tax_amount: string;
  sub_total: string;
  grand_total: string;
  due: string;
  type: string;
  invoice_created_at: string;
  invoice_created_by: number;
  user_name: string;
}
