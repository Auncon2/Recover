import { Link, useParams } from "react-router-dom";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import { useGetRoomBookingInvoiceDetailsQuery } from "../api/RoomBookingEndPoints";
import { PrinterOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

import InvoiceForPrint from "../../../common/Invoice/InvoiceForPrint";
import InvoiceVersionTwo from "../../../common/Invoice/InvoiceVersionTwo";

const SingleRoomBookingInvoice = ({ copy }: any) => {
  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });
  const { id } = useParams();
  const { data } = useGetRoomBookingInvoiceDetailsQuery(Number(id));
  return (
    <>
      {/* <Breadcrumb
        className="my-5"
        separator=">"
        items={[
          {
            href: "/",
            title: (
              <>
                <HomeOutlined className=" me-1" />
                <span>Dashboard</span>
              </>
            ),
          },
          {
            href: "",
            title: (
              <>
                <span>Room Booking Invoice</span>
              </>
            ),
          },

          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">
                  View Room Booking Invoice
                </span>
              </div>
            ),
          },
        ]}
      />

      <hr className="my-5 borde0 border-[#20a09e]" /> */}

      <Row
        align={"middle"}
        justify={"start"}
        gutter={[6, 15]}
        style={{ marginBottom: "15px" }}
      >
        <Link to={`/room-booking-invoice`}>
          <Col xs={24} sm={12} md={12} lg={3}>
            <Button
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                // width: "200px",
              }}
            >
              Retun to Room Booking Invoice List
            </Button>
          </Col>
        </Link>

        <Button
          onClick={handleCashierPrint}
          style={{
            backgroundColor: "#01adad",
            color: "white",
            borderRadius: "50px",
            width: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PrinterOutlined />
          Print
        </Button>
      </Row>

      <InvoiceVersionTwo data={data} copy={copy} />

      <InvoiceForPrint
        cashiercomponentRef={cashiercomponentRef}
        data={data}
        copy={copy}
      />
    </>
  );
};

export default SingleRoomBookingInvoice;
