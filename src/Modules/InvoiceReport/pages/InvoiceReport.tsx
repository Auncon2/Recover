import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Row,
  Table,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
// import { useGetReportListQuery } from "../api/ReportEndPoints";
import moment from "moment";
import { IoPrintOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { HomeOutlined } from "@ant-design/icons";
import { RiEdit2Line } from "react-icons/ri";
import "../../../App.css";
import { useReactToPrint } from "react-to-print";
import { useGetInvoiceReportListQuery } from "../api/InvoiceReportEndPoints";
// import PrintableReport from "../components/PrintableReport";

const { RangePicker } = DatePicker;
const AccountReportsss = () => {
  const [filterValue, setFilterValue] = useState<any>({
    from_date: "",
    to_date: "",
  });
  const valuesWithData: any = {} as any;

  for (const key of Object.keys(filterValue)) {
    // eslint-disable-next-line no-prototype-builtins
    if (filterValue.hasOwnProperty(key) && filterValue[key]) {
      valuesWithData[key] = filterValue[key];
    }
  }
  const { data } = useGetInvoiceReportListQuery(valuesWithData);
  const handleDateChange = (dates: any, dateStrings: any) => {
    if (dates.length === 2) {
      setFilterValue({
        from_date: dateStrings[0],
        to_date: dateStrings[1],
      });
    } else {
      setFilterValue({
        from_date: "",
        to_date: "",
      });
    }
  };

  const reportListColumns: ColumnsType<any> = [
    {
      title: "Naase",
      dataIndex: "user_name",
      key: "user_name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Invoice No.",
      dataIndex: "invoice_no",
      key: "invoice_no",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "invoice Created ",
      dataIndex: "invoice_created_at",
      key: "invoice_created_at",
      render: (text) => (
        <span>{moment(text).format("YYYY-MM-DD hh:mm A")}</span>
      ),
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Discount Amount",
      dataIndex: "discount_amount",
      key: "discount_amount",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Tax Amount",
      dataIndex: "tax_amount",
      key: "tax_amount",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Sub Total",
      dataIndex: "sub_total",
      key: "sub_total",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Due",
      dataIndex: "due",
      key: "due",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Edit",
      dataIndex: "bed_type",
      key: "bed_type",
      render: (_text) => (
        <span>
          <RiEdit2Line />
        </span>
      ),
    },
  ];

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
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
                <>
                  {/* <UserOutlined /> */}
                  <span>Report</span>
                </>
              ),
            },
            {
              title: <span className="text-emerald-800">Invoice Report</span>,
            },
          ]}
        />
      </div>
      {/* <PrintableReport ref={componentRef} /> */}
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
            }}
          >
            <Row align={"middle"} justify={"space-between"} gutter={[6, 15]}>
              <Col xs={24} sm={12} md={12} lg={12}>
                <RangePicker onChange={handleDateChange} />
              </Col>
              <Col xs={24} sm={12} md={12} lg={4}>
                {/* <ReactToPrint
                      bodyClass="print-agreement"
                      trigger={() => (
                        <Button
                          onClick={handlePrint}
                          icon={<IoPrintOutline />}
                          className="bg-emerald-800 text-white font-semibold"
                        >
                          Print
                        </Button>
                      )}
                    /> */}

                <Button
                  onClick={handlePrint}
                  icon={<IoPrintOutline />}
                  className="bg-emerald-800 text-white font-semibold"
                >
                  Print
                </Button>
                <Button
                  icon={<HiOutlineDocumentReport />}
                  className="bg-emerald-800 text-white font-semibold ms-2"
                >
                  Excel Report
                </Button>
              </Col>
            </Row>
          </Card>
          {/* 
              <Card
              // style={{
              //   boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              //   marginBottom: "1rem",
              // }}
              >
              </Card> */}
          <div>
            {data ? (
              <Table
                columns={[...reportListColumns]}
                dataSource={
                  data?.rooms && data.rooms.length > 0 ? data.rooms : []
                }
                key={"id"}
                rowKey="id"
                bordered
                scroll={{ x: true }}
                pagination={{ showSizeChanger: true }}
                className="custom-table"
              />
            ) : (
              <Empty />
            )}
          </div>
        </Col>
      </Row>
      <div className="hidden">
        {/* <PrintableReport componentRef={componentRef} /> */}
      </div>
      {/* <div ref={ref}>hello</div> */}
    </div>
  );
};

export default AccountReportsss;
