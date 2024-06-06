import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Form,
  Select,
  Table,
  theme,
} from "antd";
import type { TableProps } from "antd";
import { useRef, useState } from "react";
import { useGetAllExpenseReportListQuery } from "../api/ExpenseReportEndPoints";
import { IExpenseReportAllList } from "../Types/ExpenseReportTypes";

import dayjs from "dayjs";
import { HomeOutlined } from "@ant-design/icons";
import { TbFileReport } from "react-icons/tb";
import { useReactToPrint } from "react-to-print";

import { IoPrintOutline } from "react-icons/io5";
import { useGetExpenseHeadlistQuery } from "../../Expense/api/ExpenseEndPoint";
import { useAppSelector } from "../../../app/store/store";
import { globalTheme } from "../../../app/slice/themeSlice";

const { RangePicker } = DatePicker;

const AllExpenseReportList = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [dummy, _setDummy] = useState<any>({});
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 20,
  });
  const { data: allExpenseList, isLoading } = useGetAllExpenseReportListQuery({
    ...filter,
  });
  const { data: expenseData } = useGetExpenseHeadlistQuery(dummy);
  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });
  const columns: TableProps<IExpenseReportAllList>["columns"] = [
    {
      title: "SL",
      dataIndex: "expense_tr_id",
      key: "0",
      render: (_text, _record, index) => <span>{index + 1 + filter.skip}</span>,
    },
    {
      title: "Expense Name",
      dataIndex: "expense_name",
      key: "1",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Expense Head",
      dataIndex: "expense_head",
      key: "2",
    },
    {
      title: "Account Name",
      dataIndex: "account_name",
      key: "3",
    },
    {
      title: "Account Type",
      dataIndex: "ac_type",
      key: "4",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Created By",
      dataIndex: "created_by",
      key: "5",
    },
    {
      title: "Expense Amount",
      dataIndex: "expense_amount",
      key: "6",
      render: (text) => <a>{text ? text : "-"} </a>,
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
              <div className="flex items-center gap-1">
                {/* <UserOutlined /> */}

                <span>Report</span>
              </div>
            ),
          },
          {
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <TbFileReport color="#20a09e" />
                <span className="text-[#20a09e] font-semibold">
                  Expense Report
                </span>
              </div>
            ),
          },
        ]}
      />
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
            <Form.Item label="Search by Guest Name " style={{ width: "100%" }}>
              <Select
                defaultValue=""
                style={{ width: "100%" }}
                onChange={(value) =>
                  setFilter({
                    ...filter,
                    key: value ? value : "",
                  })
                }
                placeholder="Select Guest Name"
              >
                <Select.Option value="">All</Select.Option>
                {expenseData?.data?.map((expense) => (
                  <Select.Option key={expense.id} value={expense.name}>
                    {expense.name}
                  </Select.Option>
                ))}
              </Select>
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

          <Button
            icon={<IoPrintOutline />}
            onClick={handleCashierPrint}
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "100px",
            }}
          >
            Print
          </Button>
        </div>
      </Card>
      <div
        ref={cashiercomponentRef}
        // style={{
        //   padding: "0.5in",
        //   width: "8.27in",
        //   minHeight: "11.69in",
        //   position: "relative",
        // }}
      >
        <Table
          size="small"
          scroll={{ x: true }}
          columns={columns}
          loading={isLoading}
          bordered={true}
          dataSource={allExpenseList?.data?.length ? allExpenseList?.data : []}
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
            total: allExpenseList?.total,
            showTotal: (total) => `Total ${total} `,
          }}
          summary={() => (
            <Table.Summary.Row style={{ fontWeight: "bold" }}>
              <Table.Summary.Cell colSpan={6} index={0} align="right">
                Total Amount
              </Table.Summary.Cell>
              <Table.Summary.Cell colSpan={1} index={1} align="left">
                {allExpenseList?.totalAmount}
              </Table.Summary.Cell>
            </Table.Summary.Row>
          )}
        />
      </div>
    </>
  );
};

export default AllExpenseReportList;
