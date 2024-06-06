import {
  Breadcrumb,
  Button,
  Card,
  DatePicker,
  Empty,
  Form,
  Select,
  Table,
  theme,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
import moment from "moment";
import { IoPrintOutline } from "react-icons/io5";

import { HomeOutlined } from "@ant-design/icons";
import "../../../App.css";
import { useReactToPrint } from "react-to-print";
import { useGetAccountReportListQuery } from "../api/AccountReportEndPoints";
import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";
import dayjs from "dayjs";
import { TbFileReport } from "react-icons/tb";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";

const { RangePicker } = DatePicker;
const AccountReport = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [dummy, _setDummy] = useState<any>({});
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 20,
  });
  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });

  const { data } = useGetAccountReportListQuery({ ...filter });
  const { data: accountList } = useGetAccountListQuery(dummy);

  const reportListColumns: ColumnsType<any> = [
    {
      title: "SL",
      dataIndex: "id",
      key: "id",
      render: (_text, _record, index) => <span>{index + 1 + filter.skip}</span>,
    },

    {
      title: "Account Name",
      dataIndex: "account_name",
      key: "account_name",
      render: (text) => <span>{text ? text : "-"}</span>,
    },

    {
      title: "Credit Amount",
      dataIndex: "ac_tr_cash_in",
      key: "ac_tr_cash_in",
      render: (text) => <span>{text ? text : "0.00"}</span>,
    },
    {
      title: "Debit Amount",
      dataIndex: "ac_tr_cash_out",
      key: "ac_tr_cash_out",
      render: (text) => <span>{text ? text : "0.00"} </span>,
    },
    {
      title: "Ledger Balance",
      dataIndex: "ledger_balance",
      key: "ledger_balance",
      render: (text) => <span>{text ? text : "0.00"} </span>,
    },

    {
      title: "Transaction Date",
      dataIndex: "invoice_created_at",
      key: "invoice_created_at",
      render: (text) => (
        <span>{moment(text).format("YYYY-MM-DD hh:mm A")}</span>
      ),
    },
  ];

  // const componentRef = useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  return (
    <>
      <div className="my-5">
        <Breadcrumb
          separator=">"
          style={{ marginBottom: "40px" }}
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
                    Account Report
                  </span>
                </div>
              ),
            },
          ]}
        />
      </div>
      {/* <PrintableReport ref={componentRef} /> */}
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
            <Form.Item label="Search By Account Name" style={{ width: "100%" }}>
              <Select
                defaultValue=""
                style={{ width: "100%" }}
                // onChange={(value) =>
                //   handleFilterChange("account_id", value)
                // }
                onChange={(value) =>
                  setFilter({
                    ...filter,
                    name: value ? value : "",
                  })
                }
                placeholder="Key"
              >
                <Select.Option value="">All</Select.Option>
                {accountList?.data?.map((account: any) => (
                  <Select.Option key={account.name} value={account.name}>
                    {account.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Search By Date" style={{ width: "100%" }}>
              <RangePicker
                // onChange={handleDateChange}
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
            dataSource={data?.data}
            key={"id"}
            rowKey="id"
            bordered
            scroll={{ x: true }}
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
              total: data?.total,
              showTotal: (total) => `Total ${total} `,
            }}
            summary={() => (
              <Table.Summary.Row>
                <Table.Summary.Cell
                  colSpan={2}
                  index={0}
                  align="left"
                ></Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} index={0} align="left">
                  <span className="font-semibold">
                    Total Credit Amount : {data?.totalCreditAmount}
                  </span>
                </Table.Summary.Cell>
                <Table.Summary.Cell colSpan={1} index={1} align="left">
                  <span className="font-semibold">
                    Total Debit Amount : {data?.totalDebitAmount}
                  </span>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            )}
            className="custom-table"
          />
        ) : (
          <Empty />
        )}
      </div>
      <div className="hidden">
        {/* <PrintableReport componentRef={componentRef} /> */}
      </div>
      {/* <div ref={ref}>hello</div> */}
    </>
  );
};

export default AccountReport;
