import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Row,
  Table,
  Tag,
  theme,
} from "antd";
import { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
import { useGetReportListQuery } from "../api/ReportEndPoints";
import moment from "moment";
import { IoPrintOutline } from "react-icons/io5";

import { HomeOutlined } from "@ant-design/icons";

import "../../../App.css";
import { useReactToPrint } from "react-to-print";
import PrintableReport from "../components/PrintableReport";
import dayjs from "dayjs";
import { TbFileReport } from "react-icons/tb";
// import RoomReportSingleDetails from "./RoomReportSingleDetails";

import { useAppSelector } from "../../../app/store/store";
import { globalTheme } from "../../../app/slice/themeSlice";

const { RangePicker } = DatePicker;
const Report = () => {
  const themeGlobal = useAppSelector(globalTheme);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  // const showModal = (roomId: any) => {
  //   setSelectedRoomId(roomId);
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   setSelectedRoomId(null);

  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setSelectedRoomId(null);

  //   setIsModalOpen(false);
  // };
  const [filter, setFilter] = useState<any>({
    from_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    to_date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    skip: 0,
    limit: 20,
  });

  const cashiercomponentRef = useRef(null);
  const handleCashierPrint = useReactToPrint({
    content: () => cashiercomponentRef.current,
    documentTitle: `Expense`,
  });
  // const [filterValue, setFilterValue] = useState<any>({
  //   from_date: "",
  //   to_date: "",
  // });
  // const valuesWithData: any = {} as any;

  // for (const key of Object.keys(filterValue)) {
  //   // eslint-disable-next-line no-prototype-builtins
  //   if (filterValue.hasOwnProperty(key) && filterValue[key]) {
  //     valuesWithData[key] = filterValue[key];
  //   }
  // }
  // const { data } = useGetReportListQuery(valuesWithData);
  const { data } = useGetReportListQuery({ ...filter });
  // const handleDateChange = (dates: any, dateStrings: any) => {
  //   if (dates && dates.length === 2) {
  //     setFilterValue({
  //       from_date: dateStrings[0],
  //       to_date: dateStrings[1],
  //     });
  //   } else {
  //     setFilterValue({
  //       from_date: "",
  //       to_date: "",
  //     });
  //   }
  // };

  const reportListColumns: ColumnsType<any> = [
    {
      title: "SL",

      key: "0",
      render: (_text, _record, index) => <span>{index + 1 + filter.skip}</span>,
    },
    {
      title: "Room Number",
      dataIndex: "room_number",
      key: "room_number",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Room Type",
      dataIndex: "room_type",
      key: "room_type",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Bed Type",
      dataIndex: "bed_type",
      key: "bed_type",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Rate Per Night",
      dataIndex: "rate_per_night",
      key: "rate_per_night",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "Discount Percent",
      dataIndex: "discount_percent",
      key: "discount_percent",
      render: (text) => <span>{text} %</span>,
    },
    {
      title: "Refundable",
      dataIndex: "refundable",
      key: "refundable",
      render: (text) => (
        <span>
          {text === 1 ? (
            <Tag color="green">Refundable</Tag>
          ) : (
            <Tag color="red">Non-Refundable</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Availability",
      dataIndex: "available_status",
      key: "available_status",
      render: (text) => (
        <span>
          {text === 1 ? (
            <Tag color="green">Available</Tag>
          ) : (
            <Tag color="red">Unavailable</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Room Created Date",
      dataIndex: "room_created_at",
      key: "room_created_at",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    // {
    //   title: "Action",
    //   // dataIndex: "bed_type",
    //   key: "action",
    //   render: (record) => (
    //     <>
    //       <FaEye onClick={() => showModal(record.id)} />
    //     </>
    //   ),
    // },
  ];

  const componentRef = useRef(null);
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current,
  // });

  return (
    <>
      <Breadcrumb
        separator=">"
        style={{ marginBottom: "40px", marginTop: "20px" }}
        items={[
          {
            href: "/",
            title: (
              <div className="flex items-center gap-1">
                <HomeOutlined />
                <span>Dashboard</span>
              </div>
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
            href: "",
            title: (
              <div className="flex items-center gap-1">
                <TbFileReport color="#20a09e" />
                <span className="text-[#20a09e] font-semibold">
                  Room Report
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
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
              <Form layout="vertical">
                <Form.Item
                  label="Search By Date"
                  className="flex flex-col xl:flex-row justify-start gap-3 items-center w-[200px] md:w-[370px] lg:w-[600px] xl:w-[800px]"
                  style={{ width: "100%" }}
                >
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    format="YYYY-MM-DD HH:mm"
                    defaultValue={[
                      dayjs().startOf("day"),
                      dayjs().endOf("day"),
                    ]}
                    onChange={(value: any) =>
                      setFilter({
                        ...filter,
                        from_date:
                          (value &&
                            dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss")) ||
                          dayjs().format("YYYY-MM-DD HH:mm:ss"),
                        to_date:
                          (value &&
                            dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss")) ||
                          dayjs().format("YYYY-MM-DD HH:mm:ss"),
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
          {/* 
          <Card
          // style={{
          //   boxShadow: "0 0 0 1px rgba(0,0,0,.05)",
          //   marginBottom: "1rem",
          // }}
          >
          </Card> */}
          <div
            ref={cashiercomponentRef}
            // style={{
            //   padding: "0.5in",
            //   width: "8.27in",
            //   minHeight: "11.69in",
            //   position: "relative",
            // }}
          >
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
                  // showTotal: (total) => `Total ${total} `,
                }}
                summary={() => (
                  <Table.Summary.Row style={{ fontWeight: "bold" }}>
                    <Table.Summary.Cell colSpan={7} index={0} align="right">
                      Total Available Room
                    </Table.Summary.Cell>
                    <Table.Summary.Cell colSpan={1} index={1} align="left">
                      {data?.total_available_room}
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
        <PrintableReport componentRef={componentRef} />
      </div>
    </>
  );
};

export default Report;
