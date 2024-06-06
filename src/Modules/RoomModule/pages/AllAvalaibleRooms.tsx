import {
  Breadcrumb,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  theme,
} from "antd";

import { useGetAvailableAndUnavaliableHotelRoomListQuery } from "../api/HotelRoomEndPoints";

import { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";

import CommonRoomlist from "./CommonRoomlist";
import dayjs from "dayjs";
import CommonPagination from "../../CommonComponents/CommonPagination";

import { useAppSelector } from "../../../app/store/store";
import { globalTheme } from "../../../app/slice/themeSlice";

const { RangePicker } = DatePicker;
const AllAvalaibleRooms = () => {
  // const dispatch = useDispatch();

  // const ss = useSelector((state: any) => state);
  // console.log("www", ss);

  const themeGlobal = useAppSelector(globalTheme);
  const [filterValue, setFilterValue] = useState<any>({
    key: "",
    from_date: dayjs().startOf("day").format("YYYY-MM-DD HH:mm:ss"),
    to_date: dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
    // from_date: "",
    // to_date: "",
    refundable: "",
    skip: 0,
    limit: 30,
  });

  // const showModal = () => {
  //   dispatch(updatecommonObjectState(filterValue));
  // };

  // console.log("filterValue", filterValue);
  const valuesWithData: any = {} as any;

  for (const key of Object.keys(filterValue)) {
    // eslint-disable-next-line no-prototype-builtins
    if (filterValue.hasOwnProperty(key) && filterValue[key]) {
      valuesWithData[key] = filterValue[key];
    }
  }
  const handleFilterChange = (name: string, value: string) => {
    setFilterValue((prevFilterValue: any) => ({
      ...prevFilterValue,
      [name]: value,
    }));
  };
  const { data } = useGetAvailableAndUnavaliableHotelRoomListQuery({
    ...filterValue,
  });
  return (
    <>
      <Breadcrumb
        className="mt-5 mb-[40px]"
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
                <span>Room</span>
              </>
            ),
          },
          {
            title: (
              <span className="text-[#119B9D]">
                Avaliable / Unavaliable Room List
              </span>
            ),
          },
        ]}
      />

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
                className="flex flex-col lg:flex-row gap-2"
              >
                <Col xs={24} sm={12} md={24} lg={8} xl={8}>
                  <Form.Item
                    label="Search by Room Number"
                    style={{ width: "100%" }}
                  >
                    <Input
                      onChange={(e) =>
                        handleFilterChange("key", e.target.value)
                      }
                      type="text"
                      placeholder="Room Number"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={24} lg={8} xl={8}>
                  <Form.Item label="Search by Status" style={{ width: "100%" }}>
                    <Select
                      defaultValue={""}
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleFilterChange("refundable", value.toString())
                      }
                    >
                      <Select.Option value="">All</Select.Option>
                      <Select.Option value="1">Refundable</Select.Option>
                      <Select.Option value="0">Non-refundable</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={12} md={24} lg={8} xl={24}>
                  <Form.Item
                    label="Search by Date & Time"
                    style={{ width: "100%" }}
                  >
                    <RangePicker
                      defaultValue={[
                        dayjs().startOf("day"), // default start time (beginning of current day)
                        dayjs().endOf("day"), // default end time (end of current day)
                      ]}
                      showTime={{ format: "HH:mm" }}
                      // showTime={{
                      //   format: "HH:mm A", // Specify the format including AM/PM
                      //   use12Hours: true, // Set to true to enable 12-hour format
                      // }}
                      format="YYYY-MM-DD HH:mm"
                      onChange={(value: any) =>
                        setFilterValue({
                          ...filterValue,
                          from_date:
                            (value &&
                              dayjs(value[0]).format("YYYY-MM-DD HH:mm:ss")) ||
                            // .subtract(6, "hour")
                            dayjs()
                              .startOf("day")
                              .format("YYYY-MM-DD HH:mm:ss"),
                          to_date:
                            (value &&
                              dayjs(value[1]).format("YYYY-MM-DD HH:mm:ss")) ||
                            // .subtract(6, "hour")
                            dayjs().endOf("day").format("YYYY-MM-DD HH:mm:ss"),
                        })
                      }
                      // disabledDate={(current) =>
                      //   current && current < moment().startOf("day")
                      // }
                    />
                  </Form.Item>
                </Col>
              </Form>

              <div className="flex items-center justify-around w-full xl:w-32">
                <img
                  src="/bg/bgremove (2).png"
                  alt="forgot"
                  className="w-[100px] h-[100px] object-cover object-center "
                />
                <img
                  src="/bg/bgremove (3).png"
                  alt="forgot"
                  className="w-[100px] h-[100px] block xl:hidden "
                />
                <img
                  src="/bg/bgremove (4).png"
                  alt="forgot"
                  className="w-[100px] h-[100px] hidden md:block xl:hidden"
                />
              </div>
            </div>
          </Card>

          <CommonRoomlist data={data} filterValue={filterValue} />

          {data && data.total && data.total > 10 ? (
            <div className="flex justify-end mt-8">
              <CommonPagination
                total={data?.total}
                onChange={(skip: any, pageSize: any) => {
                  setFilterValue({
                    ...filterValue,
                    skip,
                    limit: pageSize,
                  });
                }}
              />
            </div>
          ) : (
            ""
          )}
        </Col>
      </Row>
    </>
  );
};

export default AllAvalaibleRooms;
