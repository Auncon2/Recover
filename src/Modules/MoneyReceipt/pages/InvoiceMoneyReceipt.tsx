import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Col, Row, Table, Tooltip } from "antd";
import type { TableProps } from "antd";
import Search from "antd/es/input/Search";
import {
  IMoneyReceiptParams,
  IallMoneyReceiptList,
} from "../Types/MoneyReceiptsTypes";
import { useState } from "react";
import { useGetAllInvoiceMoneyReceiptListQuery } from "../api/MoneyReceiptEndPoints";
import { FaEye, FaMoneyBill } from "react-icons/fa6";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { useDebounce } from "../../../components/utils/useDebounce";
import { useDispatch } from "react-redux";
import {
  setInvoiceDue,
  setInvoiceDueForPurposeOf,
} from "../../../app/slice/reservationSlice";

const InvoiceMoneyReceipt = () => {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<IMoneyReceiptParams>({
    skip: 0,
    limit: 20,
    key: "",
  });

  // Define the handleSearch function to update the filter
  const handleSearch = (searchKey: string) => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      key: searchKey,
    }));
  };

  // Use the useDebounce hook to debounce the search key changes
  useDebounce(filter.key, 10000, handleSearch);

  const { data: MoneyReceipy, isLoading } =
    useGetAllInvoiceMoneyReceiptListQuery(filter);
  console.log("data", MoneyReceipy?.data);

  const columns: TableProps<IallMoneyReceiptList>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Guest Name",
      dataIndex: "customer_name",
      key: "customer_name",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Money Receipt no",
      dataIndex: "money_receipt_no",
      key: "money_receipt_no",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Payment Type",
      dataIndex: "payment_type",
      key: "payment_type",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Total Collected Amount",
      dataIndex: "total_collected_amount",
      key: "total_collected_amount",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Created By",
      dataIndex: "created_by_admin",
      key: "created_by_admin",
      render: (text) => <>{text ? text : "N/A"}</>,
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => (
        <div className="flex gap-2">
          {text ? dayjs(text).format("DD-MM-YYYY ") : "N/A"}
          &#40;{text ? dayjs(text).format("hh:mm A") : "N/A"} &#41;
        </div>
      ),
    },

    {
      title: "Action",
      key: "id",
      dataIndex: "id",
      render: (_, record: any) => (
        <Link to={`/money-receipt/view-receipt/${record?.id}`}>
          <Col xs={24} sm={20} md={16} lg={12} xl={12} xxl={12}>
            <Tooltip title="View">
              <Button
                size="small"
                icon={<FaEye size={15} />}
                style={{
                  backgroundColor: "#01adad",
                  color: "white",

                  width: "100%",
                }}
              />
            </Tooltip>
          </Col>
        </Link>
      ),
    },
  ];

  return (
    <>
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
            href: "/money-receipt/invoice-money-receipt",
            title: (
              <div className="flex items-center gap-2">
                <FaMoneyBill color="#01adad" />
                <span className="text-teal-600 font-semibold">
                  Money Receipt
                </span>
              </div>
            ),
          },
        ]}
      />

      <Row
        gutter={[12, 16]}
        justify={"space-between"}
        align={"middle"}
        style={{ marginTop: "30px" }}
      >
        <Col xs={24} sm={24} md={24} lg={12} xl={6} xxl={4}>
          <Link to="/money-receipt/add-receipt/create/money-receipt/all">
            <Button
              icon={<PlusOutlined />}
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",

                width: "100%",
              }}
              onClick={() => {
                dispatch(setInvoiceDue(null));
                dispatch(setInvoiceDueForPurposeOf(null));
              }}
            >
              Add Money Receipt
            </Button>
          </Link>
        </Col>

        <Col xs={24} sm={24} md={24} lg={12} xl={7} xxl={6}>
          <Search
            style={{ width: "100%" }}
            placeholder="Search by money receipt no."
            onChange={(e) =>
              setFilter((prevFilter) => ({
                ...prevFilter,
                key: e.target.value,
              }))
            }
          />
        </Col>
      </Row>

      <Table
        size="small"
        bordered={true}
        columns={columns}
        dataSource={MoneyReceipy?.data?.length ? MoneyReceipy?.data : []}
        style={{ marginTop: "30px" }}
        loading={isLoading}
        onChange={(pagination) => {
          setFilter({
            ...filter,
            skip: ((pagination.current || 1) - 1) * (pagination.pageSize || 20),
            limit: pagination.pageSize!,
          });
        }}
        pagination={{
          size: "default",
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "50", "100"],
          defaultPageSize: 20,
          // current: filter.skip + 1,
          total: MoneyReceipy?.total,
          showTotal: (total) => `Total ${total} `,
        }}
        scroll={{ x: true }}
      />
    </>
  );
};

export default InvoiceMoneyReceipt;
