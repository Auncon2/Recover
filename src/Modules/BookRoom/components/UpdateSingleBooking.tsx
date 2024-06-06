import { SendOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Row, message } from "antd";

import { useForm } from "antd/es/form/Form";

import { useEffect, useState } from "react";
import { useGetAccountListQuery } from "../../Account/api/AccountEndPoint";

import dayjs from "dayjs";

import { useRoomBookingExtendMutation } from "../api/RoomBookingEndPoints";

const UpdateSingleBooking = ({ singleRoom, onClose }: any) => {
  console.log("singleRoom", singleRoom);

  function disabledDate(current: any) {
    return (
      current &&
      current < dayjs(singleRoom?.data?.check_out_time).startOf("day")
    );
  }

  const [form] = useForm();

  const [filter, _setFilter] = useState<any>({});
  const [filterValue, setFilterValue] = useState<any>({
    from_date: dayjs(singleRoom?.data?.check_in_time).format(
      "YYYY-MM-DD HH:mm:ss"
    ),
    to_date: dayjs(singleRoom?.data?.check_out_time).format(
      "YYYY-MM-DD HH:mm:ss"
    ),
  });

  // const [roomList, setRoomTypeList] = useState<any>([]);
  const [_bankList, setBankTypeList] = useState<any>([]);
  const { data: accountlistData } = useGetAccountListQuery(filter);
  // const { data } = useGetAvailableHotelRoomListQuery(filterValue);
  const [updateRoomBooking, { isSuccess }] = useRoomBookingExtendMutation();

  useEffect(() => {
    if (accountlistData) {
      const BankType =
        accountlistData?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: value.name,
          id: value.id,
          key: `room_${value.name}_${index}`,
        })) || [];
      setBankTypeList(BankType);
    }
  }, [accountlistData]);
  // useEffect(() => {
  //   if (data) {
  //     const roomTypeList =
  //       data?.data?.map((value: any, index: any) => ({
  //         value: value.id,
  //         label: value.room_number,
  //         id: value.id,
  //         key: `room_${value.room_type}_${index}`,
  //       })) || [];
  //     setRoomTypeList(roomTypeList);
  //   }
  // }, [data]);

  // ...............default values..........................
  useEffect(() => {
    if (singleRoom) {
      form.setFieldValue(
        "check_in_time",
        dayjs(singleRoom?.data?.check_in_time).subtract(6, "hour")
      );
      form.setFieldValue(
        "check_out_time",
        dayjs(singleRoom?.data?.check_out_time)
      );

      const roomIds = singleRoom.data.booking_rooms.map(
        (room: any) => room.room_id
      );
      console.log("roomIds", roomIds);

      form.setFieldsValue({
        booking_rooms: roomIds.map((roomId: number) => ({
          room_id: Number(roomId),
        })),
      });
    }
  }, [form, singleRoom]);
  useEffect(() => {
    // if (accountlistData?.data?.length) {
    //   const accountId = Number(accountlistData?.data[0]?.id);
    //   form.setFieldValue("ac_tr_ac_id", accountId);
    // } else
    if (accountlistData?.data?.length === 0) {
      form.resetFields(["ac_tr_ac_id"]);
    }
  }, [form, accountlistData?.data]);
  const onFinish = (values: any) => {
    if (
      dayjs(values?.check_out_time).format("YYYY-MM-DD") !=
      dayjs(singleRoom?.data?.check_out_time).format("YYYY-MM-DD")
    ) {
      const RoomUpdateValue = {
        // check_in_time: dayjs(values?.check_in_time).format("YYYY-MM-DD HH:mm:ss"),
        check_out_time: dayjs(values?.check_out_time).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        // extra_charge: 0,
        // tax_amount: 0,
        // discount_amount: 0,
        booking_rooms: singleRoom?.data?.booking_rooms.map((room: any) => ({
          room_id: room?.room_id,
        })),

        // booking_rooms: values?.booking_rooms,
      };
      console.log("RoomUpdateValue", RoomUpdateValue);
      updateRoomBooking({ id: singleRoom?.data?.id, data: RoomUpdateValue });
    } else {
      message.success("Up to date!");
    }
  };
  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
  }, [isSuccess]);
  return (
    <>
      <Form
        layout="vertical"
        form={form}
        // initialValues={{ remember: true }}
        initialValues={{}}
        onFinish={onFinish}
      >
        {/* <Row align={"middle"} justify={"start"} gutter={[20, 20]}>
      
        </Row> */}
        {/* .............checkin............. */}
        {/* <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              name="check_in_time"
              label="Check in Date & Time"
              // rules={[{ required: true }]}
            >
              <DatePicker
                use12Hours={false}
                showTime={{
                  format: "HH:mm",
                  hideDisabledOptions: true,
                }}
                format="YYYY-MM-DD HH:mm"
                style={{ width: "100%" }}
                disabledDate={disabledDate}
                onChange={(value) => {
                  setFilterValue({
                    ...filterValue,
                    from_date:
                      (value && dayjs(value).format("YYYY-MM-DD HH:mm:ss")) ||
                      "",
                  });
                }}
              />
            </Form.Item>
          </Col> */}
        {/* ............check out...................... */}
        <Row>
          <Col
            // xs={24} sm={12} md={12} lg={12}
            xs={24}
            sm={24}
            md={24}
            lg={24}
          >
            <Form.Item
              name="check_out_time"
              label="Check Out Date & Time"
              // rules={[{ required: true }]}
            >
              <DatePicker
                use12Hours={false}
                showTime={{
                  format: "HH:mm",
                  hideDisabledOptions: true,
                }}
                format="YYYY-MM-DD HH:mm"
                // format="YYYY-MM-DD"
                style={{ width: "100%" }}
                disabledDate={disabledDate}
                onChange={(value) => {
                  setFilterValue({
                    ...filterValue,
                    to_date:
                      // (value && dayjs(value).format("YYYY-MM-DD HH:mm:ss")) ||
                      (value && dayjs(value).format("YYYY-MM-DD ")) || "",
                  });
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* ..............tax_amount.......................... */}
        {/* <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item
              name="tax_amount"
              label="Tax Amount"
              //   rules={[{ required: true, message: "Please enter room number" }]}
            >
              <InputNumber
                placeholder="Please enter Tax Amount"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row> */}

        {/* ..............extra_charge.......................... */}
        {/* <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item
              name="extra_charge"
              label="Extra Charge"
              //   rules={[{ required: true, message: "Please enter room number" }]}
            >
              <InputNumber
                placeholder="Please enter Extra Charge"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row> */}

        {/* ..............discount_amount.......................... */}
        {/* <Row>
          <Col xs={24} sm={24} md={24} lg={24}>
            <Form.Item
              name="discount_amount"
              label="Discount Amount"
              //   rules={[{ required: true, message: "Please enter room number" }]}
            >
              <InputNumber
                placeholder="Please enter Discount Amount"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row> */}

        {/* ..............total_occupancy.......................... */}
        {/* <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              name="total_occupancy"
              label="Total Occupancy"
              //   rules={[{ required: true, message: "Please enter room number" }]}
            >
              <InputNumber
                placeholder="Please enter Total Occupancy"
                min={0}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col> */}
        {/* <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label={<span className="font-semibold">Payment Type</span>}
              name="payment_type"
              style={{ width: "100%" }}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Pay Type"
                onChange={(value) => {
                  setFilter({
                    ac_type: value,
                  });
                }}
              >
                <Select.Option value="bank">Bank</Select.Option>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="cheque">Cheque</Select.Option>
                <Select.Option value="mobile-banking">
                  Mobile Banking
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12}>
            <Form.Item
              label="Account Name"
              name="ac_tr_ac_id"
              style={{ width: "100%" }}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select Account Name"
                options={bankList}
                disabled={!form.getFieldValue("payment_type")}
              />
            </Form.Item>
          </Col> */}
        {/* <Col xs={24} sm={12} md={12} lg={12}>
            <Form.List name="booking_rooms" initialValue={[{}]}>
              {(fields, { add, remove }) => (
                <>
                  {fields?.map(({ key, name, ...restField }, index: number) => {
                    return (
                      <Badge.Ribbon
                        key={key}
                        text={`Room ${name + 1}`}
                        placement="start"
                      >
                        <Card
                          size="small"
                          extra={
                            <div className="hover:cursor-pointer">
                              {index > 0 && (
                                <MdDeleteForever
                                  onClick={() => {
                                    remove(name);
                                    // handleFilterChange(
                                    //   {},
                                    //   form.getFieldsValue()
                                    // );
                                    // handleRoomTypeChange(
                                    //   {},
                                    //   form.getFieldsValue()
                                    // );
                                  }}
                                  size="25"
                                  color="#ff6666"
                                />
                              )}
                            </div>
                          }
                          style={{
                            marginTop: "30px",
                            // borderWidth: "6px ",
                          }}
                        >
                          <Row align={"middle"} justify={"start"}>
                            <Col xs={24} sm={24} md={24} lg={24}>
                              <Form.Item
                                label={
                                  <span className="font-semibold">
                                    Select Room
                                  </span>
                                }
                                {...restField}
                                name={[name, "room_id"]}
                                style={{ width: "100%" }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select a room",
                                  },
                                  ({ getFieldValue, setFieldsValue }) => ({
                                    validator(_, value) {
                                      const selectedRoomId = value;
                                      const otherRooms = getFieldValue(
                                        "booking_rooms"
                                      )
                                        .filter(
                                          (_room: any, index: number) =>
                                            index !== name
                                        )
                                        .map((room: any) => room.room_type);

                                      if (!selectedRoomId) {
                                        setFieldsValue({
                                          [`booking_rooms[${name}].room_type`]:
                                            undefined,
                                        });

                                        return Promise.reject(
                                          new Error("Room must be selected")
                                        );
                                      }

                                      if (otherRooms.includes(selectedRoomId)) {
                                        setFieldsValue({
                                          [`booking_rooms[${name}].room_type`]:
                                            undefined,
                                        });

                                        return Promise.reject(
                                          new Error(
                                            "Room must be different from other rooms"
                                          )
                                        );
                                      }

                                      return Promise.resolve();
                                    },
                                  }),
                                ]}
                              >
                                <Select
                                  // onChange={(value) =>
                                  //   handleRoomTypeChange(
                                  //     {
                                  //       room_type: value,
                                  //     },
                                  //     form.getFieldsValue()
                                  //   )
                                  // }
                                  showSearch
                                  placeholder="Select a room "
                                  optionFilterProp="children"
                                  // onSearch={onSearch}
                                  // filterOption={filterOption}
                                  options={roomList}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Card>
                      </Badge.Ribbon>
                    );
                  })}

                  <Row align={"middle"} justify={"start"}>
                    <Col xs={24} sm={12} md={12} lg={7}>
                      {roomList.length < 1 ? (
                        <Form.Item
                          style={{
                            marginTop: "10px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div className="flex items-center gap-2">
                            <RiQuestionFill />
                            <span className="font-semibold">
                              You have to Select Room to Add Room
                            </span>
                          </div>
                        </Form.Item>
                      ) : (
                        <Form.Item className="mt-5">
                          <Button
                            onClick={() => {
                              if (fields.length < (roomList?.length || 0)) {
                                add();
                              }
                            }}
                            block
                            icon={<PlusOutlined style={{ color: "white" }} />}
                            style={{
                              backgroundColor: "#01adad",
                              color: "white",
                              fontWeight: "600",
                              width: "240px",
                            }}
                          >
                            Add Room
                          </Button>
                        </Form.Item>
                      )}
                    </Col>
                  </Row>
                </>
              )}
            </Form.List>
          </Col> */}

        <Row align={"middle"} justify={"center"}>
          <Form.Item>
            <Button
              icon={<SendOutlined />}
              style={{
                backgroundColor: "#01adad",
                color: "white",
                borderRadius: "50px",
                width: "150px",
              }}
              htmlType="submit"
            >
              Extend
            </Button>
          </Form.Item>
        </Row>
      </Form>
    </>
  );
};

export default UpdateSingleBooking;
