import { Button, Space } from "antd";
import Invoice from "../../../../common/Invoice/Invoice";
import { PrinterOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useInvoiceQuery } from "../../pos/api/posEndPoints";
import { useGetProfileQuery } from "../../../RoomModule/api/HotelRoomEndPoints";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const SungleOrder = () => {
  const { id } = useParams();
  const { data: invoice } = useInvoiceQuery(id);
  const { data: profile } = useGetProfileQuery();
  //   const navigate = useNavigate();

  const fullInvoicePrintRef = useRef<HTMLDivElement>(null);
  const customerPrintRef = useRef<HTMLDivElement>(null);
  const chefPrintRef = useRef<HTMLDivElement>(null);
  const tokenPrintRef = useRef<HTMLDivElement>(null);

  const handleFullInvoicePrintOut = useReactToPrint({
    content: () => fullInvoicePrintRef.current,
  });
  const handleCustomerPrintOut = useReactToPrint({
    content: () => customerPrintRef.current,
  });
  const handleChefPrintOut = useReactToPrint({
    content: () => chefPrintRef.current,
  });
  const handleTokenPrintOut = useReactToPrint({
    content: () => tokenPrintRef.current,
  });
  return (
    <div>
      {/* <Container title={`${invoice?.data?.table_name}'s Invoice`}> */}
      <Space
        direction="horizontal"
        // style={{ display: "flex", justifyContent: "space-between" }}
      >
        {/* <Button
          onClick={() => navigate(-1)}
          type="primary"
          danger
          icon={<ArrowLeftOutlined />}
        >
          Go Back
        </Button> */}
        <Space>
          <Button
            type="primary"
            size="middle"
            icon={<PrinterOutlined />}
            onClick={handleFullInvoicePrintOut}
          >
            FULL INVOICE
          </Button>
          <Button
            type="primary"
            size="middle"
            icon={<PrinterOutlined />}
            onClick={handleCustomerPrintOut}
          >
            INVOICE
          </Button>
          <Button
            type="primary"
            size="middle"
            icon={<PrinterOutlined />}
            onClick={handleChefPrintOut}
          >
            CHEF
          </Button>
          <Button
            type="primary"
            size="middle"
            icon={<PrinterOutlined />}
            onClick={handleTokenPrintOut}
          >
            TOKEN
          </Button>
        </Space>
      </Space>

      <Invoice
        fullInvoicePrintRef={fullInvoicePrintRef}
        customerPrintRef={customerPrintRef}
        chefPrintRef={chefPrintRef}
        tokenPrintRef={tokenPrintRef}
        invoice={invoice?.data}
        profile={profile?.data}
      />
    </div>
  );
};

export default SungleOrder;
