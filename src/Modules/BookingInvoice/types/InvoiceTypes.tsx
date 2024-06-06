/* eslint-disable @typescript-eslint/no-explicit-any */
export interface createInvoice {
  user_id: number;
  discount_amount: number;
  tax_amount: number;
  invoice_item: invoiceItems[];
}
export interface invoiceItems {
  name: string;
  total_price: number;
  quantity: number;
}

export interface IInvoiceList {
  total: number;
  data: IViewInvoiceList[];
}

export interface IViewInvoiceList {
  admin_name: string;
  invoice_id: number;
  invoice_no: string;
  user_id: number;
  discount_amount: number;
  tax_amount: string;
  sub_total: number;
  grand_total: number;
  due: number;
  description: string;
  type: string;
  created_at: string;
  created_by: number;
  user_name: string;
}

export interface ISingleViewInvoice {
  invoice_id: number;
  invoice_no: string;
  hotel_id: number;
  user_id: number;
  discount_amount: string;
  tax_amount: string;
  sub_total: string;
  grand_total: string;
  due: string;
  description: string;
  type: string;
  created_at: string;
  created_by: number;
  invoice_items: InvoiceItems[];
}

export interface InvoiceItems {
  name: string;
  quantity: number;
  total_price: number;
  invoice_item_id: number;
}

// export interface Invoicelist {
//   id: number;
//   total: string;
//   name: string;
//   itemName: string;
//   status: string;
// }
// export interface SingleInvoice {
//   id: number;
//   total: string;
//   vat: string;
//   name: string;
//   discount: string;
//   grandTotal: string;
//   status: string;
//   paidBy: string;
//   createdAt: string;
//   memberId: number;
//   memberName: string;
//   paidByName: string;
//   invoiceItems: InvoiceItem[];
// }
// export interface InvoiceItem {
//   id: number;
//   name: string;
//   amount: number;
//   quantity: number;
// }
export interface InvoiceHead {
  name: string;
  amount: number;
}

export interface IInvoiceCreate {
  total: number;
  vat: number;
  discount: number;
  grandTotal: number;
  invoiceItem: IInvoiceItem[];
  paymentType: string;
  accountId: any;
  user_id: number;
}
export interface IInvoiceItem {
  id: number;
  quantity: any;
}
