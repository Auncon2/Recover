import { Button, Col, Row } from "antd";
import { Link, useParams } from "react-router-dom";
import { useGetInvoiceDetailsQuery } from "../api/BookingInvoiceEndPoints";

import { IoPrintOutline } from "react-icons/io5";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import InvoiceVersionTwo from "../../../common/Invoice/InvoiceVersionTwo";
import InvoiceForPrint from "../../../common/Invoice/InvoiceForPrint";

const SingleInvoice = ({ copy }: any) => {
  const { id } = useParams();
  const { data } = useGetInvoiceDetailsQuery(Number(id));

  const theme = localStorage.getItem("theme");
  console.log("id", id, theme);

  // const componentRef = useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  //   pageStyle: `
  //     @page {
  //       size: A4;
  //       margin: 0;
  //     }
  //     @media print {
  //       body {
  //         margin: 0;
  //       }
  //     }
  //   `,
  // });
  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={12} md={12} lg={12} xl={7} xxl={5}>
          <Link to={`/invoice/booking-invoice`}>
            <Button
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                width: "100%",
              }}
            >
              Retun to Invoice List
            </Button>
          </Link>
        </Col>
        <Col xs={24} sm={12} md={12} lg={4} xl={3} xxl={2}>
          <Button
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              // width: "100px",
              width: "100%",
            }}
            // onClick={handlePrint}
            onClick={handleCashierPrint}
            icon={<IoPrintOutline />}
          >
            Print
          </Button>
        </Col>
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

export default SingleInvoice;
