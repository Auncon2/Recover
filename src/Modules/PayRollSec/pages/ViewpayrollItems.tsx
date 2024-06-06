import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Row } from "antd";
import { Link, useParams } from "react-router-dom";

import { IoPrintOutline } from "react-icons/io5";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import InvoiceDesignFooter from "../../BookingInvoice/pages/InvoiceDesignFooter";

// import { useGetPayrollDetailsQuery } from "../api/PayrollEndPoints";
// import PayrollHeader from "../components/PayrollHeader";
// import PayrollBillingInformation from "../components/PayrollBillingInformation";
// import PrintPayroll from "../components/PrintPayroll";
import BasicPayrollInformation from "../components/BasicPayrollInformation";
import { useGetPayrollDetailsQuery } from "../api/HotelPayrollEndPoints";
import PayrollBillingInformation from "../components/PayrollBillingInformation";
import PayrollHeader from "../components/PayrollHeader";
import PrintPayroll from "../components/PrintPayroll";

const Viewpayrolltems = () => {
  const { id } = useParams();
  const { data } = useGetPayrollDetailsQuery(Number(id));

  const theme = localStorage.getItem("theme");
  console.log("id", id, theme);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        body {
          margin: 0;
        }
      }
    `,
  });
  return (
    <div>
      <div className="my-5">
        <Breadcrumb
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
                <div className="flex items-center gap-1">
                  <AppstoreOutlined style={{ color: "#20a09e" }} />
                  <span className="text-[#20a09e] font-semibold">Payroll</span>
                </div>
              ),
            },
          ]}
        />
      </div>
      <hr className="my-5 borde0 border-[#20a09e]" />

      <Row align={"middle"} justify={"start"} gutter={[6, 15]}>
        <Col xs={24} sm={12} md={12} lg={3}>
          <div
            className=" font-semibold py-2 rounded"
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "200px",
            }}
          >
            <Link to={`/payroll`} className="flex justify-center items-center ">
              Retun to Invoice List
            </Link>
          </div>
        </Col>
        <Col xs={24} sm={12} md={12} lg={2}>
          <div>
            <Button
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                width: "100px",
              }}
              onClick={handlePrint}
              icon={<IoPrintOutline />}
              className=" font-semibold h-[38px] w-[6rem]"
            >
              Print
            </Button>
          </div>
        </Col>
      </Row>

      {theme === "defaultTheme" ? (
        <div className="py-3 my-5">
          <div
            className="border mx-auto my-5 relative bg-white text-black"
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
      ) : (
        <div className="my-5 py-3 bg-[#3A3A3A]">
          <div
            className="border mx-auto my-5 relative bg-white text-black"
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
      )}
      <div className="hidden py-[20rem] ">
        <PrintPayroll componentRef={componentRef} />
      </div>
      {/* <div ref={ref}>hello</div> */}
    </div>
  );
};

export default Viewpayrolltems;
