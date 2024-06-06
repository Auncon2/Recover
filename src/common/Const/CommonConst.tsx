import { useGetAllInvoiceListQuery } from "../../Modules/BookingInvoice/api/BookingInvoiceEndPoints";

export const useInvoiceData = () => {
  const { data: Invoicelist } = useGetAllInvoiceListQuery({ due_inovice: 1 });

  const invoice =
    Invoicelist?.data.map((value: any, index: any) => ({
      value: value.invoice_id,
      label: `${value.invoice_no}  (Due: ${value.due})`,
      key: `room_${value.invoice_no}_${index}`,
    })) || [];

  return invoice;
};
