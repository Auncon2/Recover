import { Link, useParams } from "react-router-dom";

import { useReactToPrint } from "react-to-print";
import { useRef } from "react";

import { PrinterOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";

import { useGetHallBookingInvoiceDetailsQuery } from "../api/HallEndPoints";
import InvoiceVersionTwo from "../../../common/Invoice/InvoiceVersionTwo";
import InvoiceForPrint from "../../../common/Invoice/InvoiceForPrint";

const SingleHallBookingInvoiceList = ({ copy }: any) => {
  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });
  const { id } = useParams();
  const { data } = useGetHallBookingInvoiceDetailsQuery(Number(id));
  return (
    <>
      <Row align={"middle"} justify={"start"} gutter={[6, 15]}>
        <Link to={`/hall-booking-invoice`}>
          <Col xs={24} sm={12} md={12} lg={3}>
            <Button
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                // width: "200px",
              }}
            >
              Retun to Hall Booking Invoice List
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

export default SingleHallBookingInvoiceList;
