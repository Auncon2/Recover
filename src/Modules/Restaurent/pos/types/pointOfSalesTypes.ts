export interface ICarts {
  inserted_product_id: number;
  item_food_id: number;
  food_item_name: string;
  product_name: string;
  item_total: number;
  product_retail_price: number;
  item_quantity: number;
  item_price: number;
  product_category: number;
}

export interface IDinein {
  rest_table_created_by: number;
  rest_table_id: number;
  rest_table_name: string;
  rest_table_status: string;
  type: string;
}
export interface ITakeout {
  takeout_table_created_by: number;
  takeout_table_id: number;
  takeout_table_name: string;
  takeout_table_status: string;
}
export interface IDelivary {
  created_by: number;
  delivary_id: number;
  delivary_platform_name: string;
  delivary_status: string;
}

export interface ICheckingOrder {
  item_food_id: number;
  food_item_name: string;
  food_item_production_price: string | number;
  item_id: number;
  item_quantity: string | number;
  item_total: string | number;
}

export interface IInvoice {
  createdfoods: ICheckingOrder[];
  invoice_discount: number;
  invoice_net_total: number;
  invoice_subtotal: number;
  invoice_created_at: any;
  invoice_no: string;
  invoice_total_paid: number;
  invoice_change: number;
  invoice_payment_type: string;
  table_name: string;
  invoice_customer_type: string;
  invoice_platform: string;
  first_name: string;
}
