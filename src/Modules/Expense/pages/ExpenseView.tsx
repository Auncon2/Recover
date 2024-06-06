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
import { useGetSingleExpenseQuery } from "../api/ExpenseEndPoint";

import ExpenseInvoiceToPrint from "../../../common/ExpenseInvoice/ExpenseInvoiceToPrint";
import ExpenseInvoiceResponsive from "../../../common/ExpenseInvoice/ExpenseInvoiceResponsive";

const ExpenseView = () => {
  const { id } = useParams();
  const { isLoading, data } = useGetSingleExpenseQuery(Number(id));

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
                <span>Expense</span>
              </>
            ),
          },
          {
            title: <span className="text-[#1B9FA2]">Expense View</span>,
          },
        ]}
      />

      <Row style={{ marginBottom: "1rem", gap: "3px" }} justify={"start"}>
        <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={5}>
          <Link to="/expense/expense-list">
            <Button
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ArrowLeftOutlined />
              Return to All Expense List
            </Button>
          </Link>
        </Col>
        <Col xs={24} sm={24} md={24} lg={5} xl={4} xxl={2}>
          <Button
            onClick={handleCashierPrint}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
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

      <ExpenseInvoiceResponsive data={data?.data} />
      <ExpenseInvoiceToPrint
        cashiercomponentRef={cashiercomponentRef}
        data={data?.data}
      />
    </>
  );
};

export default ExpenseView;
