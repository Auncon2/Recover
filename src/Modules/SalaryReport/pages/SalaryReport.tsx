import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Row,
  Table,
  theme,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
// import { useGetReportListQuery } from "../api/ReportEndPoints";
import moment from "moment";
import { IoPrintOutline } from "react-icons/io5";

import { HomeOutlined } from "@ant-design/icons";
import "../../../App.css";
import { useReactToPrint } from "react-to-print";
import dayjs from "dayjs";
import { TbFileReport } from "react-icons/tb";
import { useGetSalaryReportListQuery } from "../api/SalaryReportEndPoint";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";
// import PrintableReport from "../components/PrintableReport";
const { RangePicker } = DatePicker;

const SalaryReport = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 20,
  });

  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });

  const { data } = useGetSalaryReportListQuery({ ...filter });

  console.log("object", data);

  const reportListColumns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Salary Date",
      dataIndex: "salary_date",
      key: "salary_date",
      render: (text) => (
        <span>{text ? moment(text).format("YYYY-MM-DD hh:mm A") : "N/A"}</span>
      ),
    },
    {
      title: "Employee Name",
      dataIndex: "employee_name",
      key: "employee_name",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Account Name",
      dataIndex: "account_name",
      key: "account_name",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Basic Salary",
      dataIndex: "basic_salary",
      key: "basic_salary",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Other Allowance",
      dataIndex: "Other_Allowance",
      key: "Other_Allowance",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Net Amount",
      dataIndex: "Net_Amount",
      key: "Net_Amount",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
  ];

  return (
    <>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: "40px", marginTop: "20px" }}
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
            title: (
              <div className="flex items-center gap-1">
                <TbFileReport color="#20a09e" />
                <span className="text-[#20a09e] font-semibold">
                  Salary Report
                </span>
              </div>
            ),
          },
        ]}
      />

      {/* <PrintableReport ref={componentRef} /> */}
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card
            style={{
              boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
              marginBottom: "1rem",
              backgroundImage:
                themeGlobal.theme === theme.defaultAlgorithm
                  ? `url('/bg/svg (3).png')`
                  : `url('/bg/svg (4).png')`,

              backgroundPosition: "center",
              backgroundSize: "cover",
            }}
          >
            <div className="flex flex-col xl:flex-row justify-between items-center">
              <Form
                layout="vertical"
                className="flex flex-col xl:flex-row justify-start gap-3 items-center w-[200px] md:w-[400px] lg:w-[600px] xl:w-[800px]"
              >
                <Form.Item
                  label="Search by Employee Name "
                  style={{ width: "100%" }}
                >
                  <Input
                    onChange={(e) =>
                      setFilter({
                        ...filter,
                        key: e.target.value ? e.target.value : "",
                      })
                    }
                    type="text"
                    placeholder="Employee Name"
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item label="Search by Date" style={{ width: "100%" }}>
                  <RangePicker
                    style={{ width: "100%" }}
                    onChange={(value: any) =>
                      setFilter({
                        ...filter,
                        from_date:
                          (value && dayjs(value[0]).format("YYYY-MM-DD")) || "",
                        to_date:
                          (value && dayjs(value[1]).format("YYYY-MM-DD")) || "",
                      })
                    }
                  />
                </Form.Item>
              </Form>

              <Button
                // onClick={handlePrint}
                onClick={handleCashierPrint}
                icon={<IoPrintOutline />}
                style={{
                  backgroundColor: "#01adad",
                  color: "white",
                  borderRadius: "50px",
                  width: "100px",
                }}
              >
                Print
              </Button>
              {/* <Button
                  icon={<HiOutlineDocumentReport />}
                  style={{
                    backgroundColor: "#01adad",
                    color: "white",
                    borderRadius: "50px",
                    width: "140px",
                    marginLeft: "10px",
                  }}
                >
                  Excel Report
                </Button> */}
            </div>
          </Card>

          <div ref={cashiercomponentRef}>
            {data ? (
              <Table
                size="small"
                columns={[...reportListColumns]}
                dataSource={
                  data?.data && data?.data.length > 0 ? data?.data : []
                }
                key={"id"}
                rowKey="id"
                bordered
                scroll={{ x: true }}
                onChange={(pagination) => {
                  setFilter({
                    ...filter,
                    skip:
                      ((pagination.current || 1) - 1) *
                      (pagination.pageSize || 20),
                    limit: pagination.pageSize!,
                  });
                }}
                pagination={{
                  size: "default",
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30", "50", "100"],
                  defaultPageSize: 20,
                  // current: filter.skip + 1,
                  total: data?.total,
                  showTotal: (total) => `Total ${total} `,
                }}
                summary={() => (
                  <Table.Summary.Row>
                    <Table.Summary.Cell colSpan={7} index={0} align="right">
                      Total Amount
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} index={1} align="left">
                      {data?.totalAmount}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
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
    </>
  );
};

export default SalaryReport;
