/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";
import { Breadcrumb, Button, Col, Row } from "antd";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeftOutlined,
  HomeOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import { useReactToPrint } from "react-to-print";
import GlobalLoader from "../../../components/loader/GlobalLoader";

import { useGetMoneyReceiptSingleDetailsQuery } from "../api/MoneyReceiptEndPoints";

import PrintMoneyReceipt from "../../../common/MoneyReceipt/PrintMoneyReceipt";
import MoneyReceipt from "../../../common/MoneyReceipt/MoneyReceipt";

export const SingleMoneyReceipt = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetMoneyReceiptSingleDetailsQuery(Number(id));

  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });
  if (isLoading) {
    return <GlobalLoader />;
  }
  return (
    <>
      <Breadcrumb
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
                {/* <UserOutlined /> */}
                <span>Money Receipt</span>
              </>
            ),
          },
          {
            href: "/money-receipt/invoice-money-receipt",
            title: (
              <>
                {/* <UserOutlined /> */}
                <span>Money Receipt List</span>
              </>
            ),
          },
          {
            title: <span className="text-[#1B9FA2]">View Money Receipt</span>,
          },
        ]}
      />

      <Row gutter={[5, 16]} style={{ marginBottom: "1rem" }}>
        <Col xs={24} md={24} lg={12} xl={8} xxl={4}>
          <Link to="/money-receipt/invoice-money-receipt">
            <Button
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                // width: "250px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowLeftOutlined />
              Return to All Money Receipt List
            </Button>
          </Link>
        </Col>
        <Col xs={24} md={24} lg={12} xl={4} xxl={2}>
          <Button
            onClick={handleCashierPrint}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              // width: "100px",
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PrinterOutlined />
            Print
          </Button>
        </Col>
      </Row>
      <MoneyReceipt data={data} />
      <div className="hidden">
        <PrintMoneyReceipt
          cashiercomponentRef={cashiercomponentRef}
          data={data}
        />
      </div>
    </>
  );
};
