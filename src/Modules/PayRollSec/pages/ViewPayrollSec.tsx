import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Row } from "antd";
import { Link, useParams } from "react-router-dom";

import { IoPrintOutline } from "react-icons/io5";

import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

// import { useGetPayrollDetailsQuery } from "../api/PayrollEndPoints";
// import PayrollHeader from "../components/PayrollHeader";
// import PayrollBillingInformation from "../components/PayrollBillingInformation";
// import PrintPayroll from "../components/PrintPayroll";

import { useGetPayrollDetailsQuery } from "../api/HotelPayrollEndPoints";

import PrintPayroll from "../components/PrintPayroll";
import ResponsivePayrollInvoice from "../components/ResponsivePayrollInvoice";
const ViewPayrollSec = () => {
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
    <>
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
        <Col xs={24} sm={12} md={24} lg={12} xl={8} xxl={4}>
          <Link to={`/payroll`}>
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
        <Col xs={24} sm={12} md={24} lg={8} xl={5} xxl={2}>
          <Button
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "100%",
            }}
            onClick={handlePrint}
            icon={<IoPrintOutline />}
          >
            Print
          </Button>
        </Col>
      </Row>

      {theme === "defaultTheme" ? (
        <div className="py-3 my-5">
          <div
            className="w-[450px] lg:w-[600px] xl:w-[794px] h-[1123px] border mx-auto my-5 relative bg-white text-black"
            // style={{ width: "794px", height: "1123px" }}
          >
            <ResponsivePayrollInvoice data={data?.data} />
          </div>
        </div>
      ) : (
        <div className="my-5 py-3 bg-[#3A3A3A]">
          <div
            className="w-[450px] lg:w-[600px] xl:w-[794px] h-[1123px] border mx-auto my-5 relative bg-white text-black"
            // style={{ width: "794px", height: "1123px" }}
          >
            <ResponsivePayrollInvoice data={data?.data} />
          </div>
        </div>
      )}
      <div className="hidden py-[20rem] ">
        <PrintPayroll componentRef={componentRef} />
      </div>
    </>
  );
};

export default ViewPayrollSec;
