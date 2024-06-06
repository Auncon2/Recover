import {
  Breadcrumb,
  Card,
  Col,
  DatePicker,
  Form,
  Row,
  TimePicker,
  theme,
} from "antd";

import { useState } from "react";
import { HomeOutlined } from "@ant-design/icons";

import dayjs from "dayjs";
import CommonPagination from "../../CommonComponents/CommonPagination";

import CommonHallList from "../components/CommonHallList";
import { useGetHallAvailableUnavailableListQuery } from "../api/HallEndPoints";
import moment from "moment";
import { globalTheme } from "../../../app/slice/themeSlice";
import { useAppSelector } from "../../../app/store/store";

const HallAvalaiableUnavalaiableList = () => {
  const themeGlobal = useAppSelector(globalTheme);
  const [filterValue, setFilterValue] = useState<any>({
    event_date: dayjs().format("YYYY-MM-DD"),
    start_time: dayjs().startOf("day").format("HH:mm:ss"),
    end_time: dayjs().endOf("day").format("HH:mm:ss"),

    skip: 0,
    limit: 30,
  });
  console.log("filterValueddddd", filterValue);
  const valuesWithData: any = {} as any;

  for (const key of Object.keys(filterValue)) {
    // eslint-disable-next-line no-prototype-builtins
    if (filterValue.hasOwnProperty(key) && filterValue[key]) {
      valuesWithData[key] = filterValue[key];
    }
  }

  const { data } = useGetHallAvailableUnavailableListQuery({
    ...filterValue,
  });
  return (
    <>
      <div className="mt-5 mb-[40px]">
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
              href: "",
              title: (
                <>
                  {/* <UserOutlined /> */}
                  <span>Hall</span>
                </>
              ),
            },
            {
              title: (
                <span className="text-[#119B9D]">
                  Avaliable / Unavaliable Hall List
                </span>
              ),
            },
          ]}
        />
      </div>
      <Row justify="center" align="middle" style={{ maxWidth: "auto" }}>
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          {/* <Typography.Title level={5}>Room List</Typography.Title> */}
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
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <Form
                layout="vertical"
                className="flex flex-col xl:flex-row justify-start gap-3 items-center w-[200px] md:w-[400px] lg:w-[800px] 2xl:w-[900px]"
              >
                <Form.Item
                  label="Search by Event Date"
                  style={{ width: "100%" }}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    defaultValue={dayjs()}
                    onChange={(value: any) =>
                      setFilterValue({
                        ...filterValue,
                        event_date:
                          (value && dayjs(value).format("YYYY-MM-DD")) ||
                          dayjs().format("YYYY-MM-DD"),
                      })
                    }
                    disabledDate={(current) =>
                      current && current < moment().startOf("day")
                    }
                  />
                </Form.Item>

                <Form.Item
                  label="Search By Start & End Time"
                  style={{ width: "100%" }}
                >
                  <TimePicker.RangePicker
                    style={{ width: "100%" }}
                    defaultValue={[
                      dayjs()
                        .startOf("day")
                        .set("hour", 0)
                        .set("minute", 0)
                        .set("second", 0), // default start time (00:00:00)
                      dayjs()
                        .startOf("day")
                        .set("hour", 23)
                        .set("minute", 0)
                        .set("second", 0), // default end time (23:00:00)
                    ]}
                    // showTime={{ format: "HH:mm" }}

                    format="h:mm A"
                    onChange={(value: any) =>
                      setFilterValue({
                        ...filterValue,
                        start_time:
                          (value && dayjs(value[0]).format("HH:mm:ss")) ||
                          dayjs()
                            .startOf("day")
                            .set("hour", 0)
                            .set("minute", 0)
                            .set("second", 0),
                        end_time:
                          (value && dayjs(value[1]).format("HH:mm:ss")) ||
                          dayjs()
                            .startOf("day")
                            .set("hour", 23)
                            .set("minute", 0)
                            .set("second", 0),
                      })
                    }
                  />
                </Form.Item>
              </Form>
              {/* <Link to={`/hall/hall-create`}>
                <Button
                  icon={<MdAdd size="18px" />}
                  style={{
                    backgroundColor: "#01adad",
                    color: "white",
                    borderRadius: "50px",
                    width: "190px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Add New Hall
                </Button>
              </Link> */}
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
          <CommonHallList data={data} filterValue={filterValue} />

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

export default HallAvalaiableUnavalaiableList;
