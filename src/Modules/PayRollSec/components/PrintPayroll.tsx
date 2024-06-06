import { useParams } from "react-router-dom";
import { useGetPayrollDetailsQuery } from "../api/HotelPayrollEndPoints";
import PayrollHeader from "./PayrollHeader";
import BasicPayrollInformation from "./BasicPayrollInformation";
import PayrollBillingInformation from "./PayrollBillingInformation";
import InvoiceDesignFooter from "../../BookingInvoice/pages/InvoiceDesignFooter";

const PrintPayroll = ({ componentRef }: any) => {
  const { id } = useParams();
  const { data } = useGetPayrollDetailsQuery(Number(id));

  return (
    <div>
      <div ref={componentRef}>
        <div
          className="border mx-auto relative"
          style={{ width: "794px", height: "1123px" }}
        >
          <div>
            <PayrollHeader data={data} />
            <hr />
            <BasicPayrollInformation data={data} />
            <PayrollBillingInformation data={data} />
          </div>
          <div className="absolute bottom-0 mb-5 px-6 w-full">
            <InvoiceDesignFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintPayroll;
