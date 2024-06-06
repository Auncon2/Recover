import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Row,
  Select,
  Table,
  theme,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
// import { useGetReportListQuery } from "../api/ReportEndPoints";
import moment from "moment";
import { IoPrintOutline } from "react-icons/io5";

import { HomeOutlined } from "@ant-design/icons";

import "../../../App.css";
import { useReactToPrint } from "react-to-print";

import dayjs from "dayjs";
import { TbFileReport } from "react-icons/tb";

import { useGetClientLedgerReportListQuery } from "../api/ClientLedgerReportEndPoints";
import { useGetCustomerListQuery } from "../../Customer/api/CustomerEndPoints";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";

// import PrintableReport from "../components/PrintableReport";

const { RangePicker } = DatePicker;
const ClientLedgerReport = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [guestTypeList, setGuestTypeList] = useState<any>([]);
  const [dummy, _setRoomTypeList] = useState<any>({});
  const formatDate = (date: any) => {
    return date.toISOString().split("T")[0];
  };

  const currentDate = new Date();

  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

  const endOfWeek = new Date(currentDate);
  endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));

  const [filter, setFilter] = useState<any>({
    from_date: formatDate(startOfWeek),
    to_date: formatDate(endOfWeek),
    skip: 0,
    limit: 20,
    user_id: "",
    pay_type: "",
  });
  // const [form] = useForm();
  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });

  const { data } = useGetClientLedgerReportListQuery({ ...filter });
  const { data: guestlist } = useGetCustomerListQuery(dummy);
  const [guestInfo, setGuestInfo] = useState<any>();

  console.log("guestInfo sate", guestInfo);
  console.log("filter?.user_id", filter?.user_id);

  useEffect(() => {
    if (guestlist) {
      const GuestList =
        guestlist?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: `${value.name} (${value.email})`,
          // id: value.user_id,
          key: `room_${value.name}_${index}`,
        })) || [];

      // Prepend the "All" option to the room type list
      const GuestListWithAll = [
        {
          value: "",
          label: "All Guests",
          key: "guest_all",
        },
        ...GuestList,
      ];

      setGuestTypeList(GuestListWithAll);
    }
  }, [guestlist]);
  // ....................Guest Info.............................
  useEffect(() => {
    if (filter?.user_id != "" && guestlist) {
      const GuestLastBalance: any | undefined = guestlist?.data.find(
        (find: any) => find.id === filter?.user_id
      );

      if (GuestLastBalance) {
        setGuestInfo(GuestLastBalance);
      }
    }
  }, [filter?.user_id, guestlist]);
  const reportListColumns: ColumnsType<any> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Guest Name",
      dataIndex: "user_name",
      key: "user_name",
      render: (text) => <span>{text}</span>,
      className: "custom-header-style",
    },

    {
      title: "Voucher No.",
      dataIndex: "name",
      key: "name",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Pay Type",
      dataIndex: "pay_type",
      key: "pay_type",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <span>{text}</span>,
      //   align: "center",
    },
    {
      title: "Last Balance",
      dataIndex: "last_balance",
      key: "last_balance",
      render: (text) => <span>{text ? text : 0}</span>,
    },

    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (
        <>
          {/* {moment(text).subtract(6, "hours").format("YYYY-MM-DD hh:mm A")} */}
          {moment(text).format("DD MMM YYYY")}
        </>
      ),
    },
  ];

  const onSearch = (_value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

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
                  Guest Ledger Booking Report
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
                // form={form}
                // name="expense"
                layout="vertical"
                className="flex flex-col xl:flex-row justify-start gap-3 items-center w-[200px] md:w-[400px] lg:w-[600px] xl:w-[800px]"
              >
                <Form.Item label="Search By Date" style={{ width: "100%" }}>
                  <RangePicker
                    defaultValue={[
                      dayjs(formatDate(startOfWeek)),
                      dayjs(formatDate(endOfWeek)),
                    ]}
                    // onChange={handleDateChange}
                    onChange={(value: any) =>
                      setFilter({
                        ...filter,
                        from_date:
                          (value && dayjs(value[0]).format("YYYY-MM-DD")) ||
                          formatDate(startOfWeek),
                        to_date:
                          (value && dayjs(value[1]).format("YYYY-MM-DD")) ||
                          formatDate(endOfWeek),
                      })
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item>

                <Form.Item
                  label="Serach By Guest"
                  name="name"
                  style={{ width: "100%" }}
                >
                  <Select
                    defaultValue={""}
                    style={{ width: "100%" }}
                    placeholder="Select Room"
                    showSearch
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={guestTypeList}
                    onChange={(value: any) =>
                      setFilter({
                        ...filter,
                        user_id: value ? value : "",
                      })
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Serach By Pay Status"
                  style={{ width: "100%" }}
                >
                  <Select
                    defaultValue={""}
                    style={{ width: "100%" }}
                    placeholder="Select Pay Status"
                    showSearch
                    optionFilterProp="children"
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={[
                      {
                        value: "",
                        label: "All",
                      },
                      {
                        value: "debit",
                        label: "Debit",
                      },
                      {
                        value: "credit",
                        label: "Credit",
                      },
                    ]}
                    onChange={(value: any) =>
                      setFilter({
                        ...filter,
                        pay_type: value !== "" ? value : "",
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
          {guestInfo && filter?.user_id != "" ? (
            <div className="flex justify-end">
              <div className="flex flex-col ">
                <span className="text-center font-medium text-lg mb-3">
                  Guest Details
                </span>
                <table className="table-auto border-collapse border border-gray-400 mb-4 ">
                  <tbody className="divide-y divide-gray-400">
                    <tr>
                      <td className="border border-gray-400 px-4 py-2">Name</td>

                      <td className="border border-gray-400 px-4 py-2">
                        {guestInfo?.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-4 py-2">
                        E-mail
                      </td>

                      <td className="border border-gray-400 px-4 py-2">
                        {guestInfo?.email}
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-gray-400 px-4 py-2">
                        Location
                      </td>
                      <td className="border border-gray-400 px-4 py-2">
                        {guestInfo?.city && guestInfo?.country
                          ? `${guestInfo?.city}, ${guestInfo?.country}`
                          : "N/A"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            ""
          )}

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
                className="custom-table"
                summary={() => (
                  <Table.Summary.Row style={{ fontWeight: "bold" }}>
                    <Table.Summary.Cell colSpan={4} index={0} align="right">
                      Total Amount
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} index={1} align="left">
                      {data?.totalAmount}
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
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

export default ClientLedgerReport;
