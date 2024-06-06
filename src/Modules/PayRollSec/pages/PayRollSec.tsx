import {
  Breadcrumb,
  Button,
  DatePicker,
  Form,
  Modal,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";
// import { useGetInvoiceListQuery } from "../api/BookingInvoiceEndPoints";
import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import dayjs from "dayjs";
import { IoMdAdd } from "react-icons/io";
import CreatePayroll from "../components/CreatePayroll";
import { useGetPayrollQuery } from "../api/HotelPayrollEndPoints";

import { IoArrowBack, IoArrowForwardOutline } from "react-icons/io5";

const { RangePicker } = DatePicker;

const bookingInvoiceColumns: ColumnsType<any> = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <span>{text ? text : "N/A"}</span>,
  },
  {
    title: "Voucher No",
    dataIndex: "voucher_no",
    key: "voucher_no",
    render: (text) => <span>{text ? text : "N/A"}</span>,
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
    title: "Pay Method",
    dataIndex: "pay_method",
    key: "pay_method",
    render: (text) => <span>{text ? text : "N/A"}</span>,
  },
  {
    title: "Account Name",
    dataIndex: "account_name",
    key: "account_name",
    render: (text) => <span>{text ? text : "N/A"}</span>,
  },
  {
    title: "Base Salary",
    dataIndex: "base_salary",
    key: "base_salary",
    render: (text) => <span>{text ? text : "N/A"}</span>,
  },
  {
    title: "Working Days",
    dataIndex: "attendance_days",
    key: "attendance_days",
    render: (text) => (
      <span>
        {text ? (
          `${text} Days`
        ) : (
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <span>Available in hours</span>
            <IoArrowForwardOutline color="#01adad" />
          </div>
        )}
      </span>
    ),
  },
  {
    title: "Working Hours",
    dataIndex: "working_hours",
    key: "working_hours",
    render: (text) => (
      <span>
        {text ? (
          `${text} Hours`
        ) : (
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <IoArrowBack color="#01adad" /> <span>Available in Days</span>
          </div>
        )}
      </span>
    ),
  },

  {
    title: "Gross Salary",
    dataIndex: "gross_salary",
    key: "gross_salary",
    render: (text) => <span>{text ? text : "N/A"}</span>,
  },
  {
    title: "Total Salary",
    dataIndex: "total_salary",
    key: "total_salary",
    render: (text) => <span>{text ? text : "N/A"}</span>,
  },
  {
    title: "Salary Date",
    dataIndex: "salary_date",
    key: "salary_date",
    render: (text) => (
      <span>
        {dayjs(text).format("DD-MM-YYYY ")
          ? dayjs(text).format("DD-MM-YYYY ")
          : "N/A"}
      </span>
    ),
  },
];
const PayRollSec = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 20,
  });
  const { data } = useGetPayrollQuery({ ...filter });

  const cardshowModal = () => {
    setModalOpen(true);
  };

  const cardhandleCancel = () => {
    setModalOpen(false);
  };

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
              <div className="flex items-center gap-1">
                <AppstoreOutlined style={{ color: "#20a09e" }} />
                <span className="text-[#20a09e] font-semibold">Payroll</span>
              </div>
            ),
          },
        ]}
      />

      <Modal
        title={
          <Typography.Title level={3} className="text-center mt-5 font-serif">
            Add Employee Salary
          </Typography.Title>
        }
        open={modalOpen}
        onCancel={cardhandleCancel}
        footer={false}
        width={1300}
      >
        <CreatePayroll cardhandleCancel={cardhandleCancel} />
      </Modal>
      <div className="flex flex-col gap-0 w-full ">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-5 md:mb-0">
          <Form
            layout="vertical"
            className="flex flex-col xl:flex-row justify-start gap-3 items-center w-[200px] md:w-[400px] lg:w-[800px] 2xl:w-[900px]"
          >
            <Form.Item
              label="Search by Voucher No / Employee Name"
              style={{ width: "100%" }}
            >
              <Search
                placeholder="Search by Voucher No / Employee Name"
                style={{ width: "100%" }}
                // onChange={(e) => setFilterValue({ key: e.target.value })}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    key: e.target.value ? e.target.value : "",
                  })
                }
              />
            </Form.Item>

            <Form.Item label="Search by Date" style={{ width: "100%" }}>
              <RangePicker
                onChange={(value: any) =>
                  setFilter({
                    ...filter,
                    from_date:
                      (value && dayjs(value[0]).format("YYYY-MM-DD")) || "",
                    to_date:
                      (value && dayjs(value[1]).format("YYYY-MM-DD")) || "",
                  })
                }
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
          {/* <Col xs={24} sm={12} md={12} lg={3}> */}
          <Button
            icon={<IoMdAdd color="white" size="20" />}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              // width: "200px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={cardshowModal}
          >
            Add Employee Salary
          </Button>
          {/* </Col> */}
        </div>

        <Table
          size="small"
          bordered={true}
          columns={[
            ...bookingInvoiceColumns,
            {
              title: "View",
              key: "action",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              render: (record: any) => (
                <Space size="middle">
                  <Link to={`/payroll/${record.id}`}>
                    <Tooltip title="View">
                      <FaEye />
                    </Tooltip>
                  </Link>
                  {/* More actions can be added here */}
                </Space>
              ),
            },
          ]}
          dataSource={data?.data}
          key={"payroll_id"}
          rowKey="payrollId"
          scroll={{ x: true }}
          // pagination={{ showSizeChanger: true }}
          onChange={(pagination) => {
            setFilter({
              ...filter,
              skip:
                ((pagination.current || 1) - 1) * (pagination.pageSize || 20),
              limit: pagination.pageSize!,
            });
          }}
          pagination={{
            size: "default",
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30", "50", "100"],
            defaultPageSize: 20,

            // current: filter.skip + 1,
            // total: data?.total,
            showTotal: (total) => `Total ${total} `,
          }}
        />
      </div>
    </>
  );
};

export default PayRollSec;
