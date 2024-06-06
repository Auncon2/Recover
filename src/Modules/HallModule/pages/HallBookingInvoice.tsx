import {
  Breadcrumb,
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  Space,
  Table,
  Tooltip,
  theme,
} from "antd";
import { AppstoreOutlined, HomeOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import Search from "antd/es/input/Search";

import { useState } from "react";
import { FaEye } from "react-icons/fa6";
import dayjs from "dayjs";

import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";

import { useGetHallBookingInvoiceListQuery } from "../api/HallEndPoints";
import { useDispatch } from "react-redux";
import {
  setInvoiceDue,
  setInvoiceDueForPurposeOf,
} from "../../../app/slice/reservationSlice";

const { RangePicker } = DatePicker;

const HallBookingInvoice = () => {
  const dispatch = useDispatch();
  const themeGlobal = useAppSelector(globalTheme);
  const [filter, setFilter] = useState<any>({
    skip: 0,
    limit: 20,
  });

  const { data } = useGetHallBookingInvoiceListQuery({ ...filter });
  const bookingInvoiceColumns: ColumnsType<any> = [
    {
      title: "Invoice ID",
      dataIndex: "invoice_id",
      key: "invoice_id",
      render: (text) => (
        <Link to={`/hall-booking-invoice/${text}`}>{text ? text : "N/A"}</Link>
      ),
    },
    {
      title: "Guest Name",
      dataIndex: "user_name",
      key: "user_name",
      render: (text, record) => (
        <Link to={`/guest/guest-list/${record?.user_id}`}>
          {text ? text : "N/A"}
        </Link>
      ),
    },
    {
      title: "Invoice No.",
      dataIndex: "invoice_no",
      key: "invoice_no",
      render: (text, record) => (
        <>
          {Number(record?.due) > 0 ? (
            <Link
              to={`/money-receipt/add-receipt/create/money-receipt/all`}
              className="text-red-600"
            >
              <Tooltip
                title={<span>This invoice has a due of {record?.due}</span>}
              >
                <span
                  onClick={() => {
                    dispatch(setInvoiceDue(record?.invoice_id));
                    dispatch(setInvoiceDueForPurposeOf("Hall Booking Invoice"));
                  }}
                >
                  {text ? text : "N/A"}
                </span>
              </Tooltip>
            </Link>
          ) : (
            <span> {text ? text : "N/A"}</span>
          )}
        </>
      ),
    },
    {
      title: "Booking ID",
      dataIndex: "hall_booking_id",
      key: "hall_booking_id",
      render: (text) => (
        <Link to={`/single_book_list/${text}`}>{text ? text : "N/A"}</Link>
      ),
    },
    {
      title: "Created By",
      dataIndex: "created_by_name",
      key: "created_by_name",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Sub Total",
      dataIndex: "sub_total",
      key: "sub_total",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Discount Amount",
      dataIndex: "discount_amount",
      key: "discount_amount",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Tax Amount",
      dataIndex: "tax_amount",
      key: "tax_amount",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },

    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Due",
      dataIndex: "due",
      key: "due",
      render: (text) => <span>{text ? text : "N/A"}</span>,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY ")}</span>,
    },
  ];
  return (
    <>
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
                  <span>Hall Booking Invoice</span>
                </>
              ),
            },

            {
              href: "",
              title: (
                <div className="flex items-center gap-1">
                  <AppstoreOutlined style={{ color: "#20a09e" }} />
                  <span className="text-[#20a09e] font-semibold">
                    Hall Booking Invoice List
                  </span>
                </div>
              ),
            },
          ]}
        />
      </>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {/* <Typography.Title level={5}>Booking Invoice</Typography.Title> */}

          {/* <Card
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
          </Card> */}

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
                  label="Search by Guest Name / Invoice Name"
                  style={{ width: "100%" }}
                >
                  <Search
                    placeholder="Search by Guest Name / Invoice Name"
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

              <img
                src="/bg/bgremove (2).png"
                alt="forgot"
                className="w-[100px] h-[100px] object-cover object-center "
              />
            </div>
          </Card>

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
                    <Link to={`/hall-booking-invoice/${record.invoice_id}`}>
                      <Tooltip title="View">
                        <FaEye />
                      </Tooltip>
                    </Link>
                    {/* More actions can be added here */}
                  </Space>
                ),
              },
            ]}
            dataSource={data?.data && data.data.length > 0 ? data.data : []}
            key={"invoice_id"}
            rowKey="agentListId"
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
              total: data?.total,
              showTotal: (total) => `Total ${total} `,
            }}
          />
        </Col>
      </Row>
    </>
  );
};

export default HallBookingInvoice;
