/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ColumnsType } from "antd/lib/table";
import { IViewEmployee } from "./EmployeeTypes";
import dayjs from "dayjs";
import { Tag } from "antd";

export const EmployeeColumn: ColumnsType<IViewEmployee> = [
  {
    title: "Employee Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <>{text ? text : "N/A"}</>,
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
    render: (text) => <>{text ? text : "N/A"}</>,
  },
  {
    title: "Mobile No",
    dataIndex: "mobile_no",
    key: "mobile_no",
    render: (text) => <>{text ? text : "N/A"}</>,
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (text) => (
      <>
        {text === "hotel" ? (
          <Tag color="cyan" style={{ width: "90px", textAlign: "center" }}>
            Hotel
          </Tag>
        ) : text === "restaurant" ? (
          <Tag color="magenta" style={{ width: "90px", textAlign: "center" }}>
            Restaurant
          </Tag>
        ) : (
          <Tag color="purple" style={{ width: "90px", textAlign: "center" }}>
            Management
          </Tag>
        )}
      </>
    ),
  },
  {
    title: "Department",
    dataIndex: "department",
    key: "department",
    render: (text) => <>{text ? text : "N/A"}</>,
  },
  {
    title: "Joining Date",
    dataIndex: "joining_date",
    key: "joining_date",
    render: (text) => <>{text ? dayjs(text).format("YYYY-MM-DD") : "N/A"}</>,
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    render: (text) => <>{text ? text : "N/A"}</>,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "Status",

    render: (text) => (
      <Tag
        color={text === 0 ? "orange" : "green"}
        style={{ width: "90px", textAlign: "center" }}
      >
        {text === 0 ? "Unavailable" : " Availabale"}
      </Tag>
    ),
  },
];
