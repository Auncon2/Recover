import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Tooltip,
  Upload,
  UploadFile,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useForm, useWatch } from "antd/es/form/Form";
import type { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { useCreateHotelRoomMutation } from "../api/HotelRoomEndPoints";
import { useGetBedTypelistQuery } from "../../Settings/api/BedTypesEndPoints";
import { useGetRoomTypelistQuery } from "../../Settings/api/RoomTypesEndPoint";
import { useGetAmenitiesTypelistQuery } from "../../Settings/api/AmentiesEndPoints";
import TextArea from "antd/es/input/TextArea";
import { useNavigate } from "react-router-dom";
import { FaInfoCircle } from "react-icons/fa";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const RoomCreateForm = () => {
  const [createHotelRoom, { isSuccess, isLoading }] =
    useCreateHotelRoomMutation();
  const [status, _setStatus] = useState<any>({ status: 1 });
  const [roomTypeList, setRoomTypeList] = useState<any>([]);
  const [roomBedTypeList, setRoomBedTypeList] = useState<any>([]);
  const [roomAmenitiesTypeList, setRoomAmenitiesTypeList] = useState<any>([]);
  const [discount, setDiscount] = useState<any>(true);
  const [refundable, setRefundable] = useState<any>(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<any>([]);

  const { data: bedTypesData } = useGetBedTypelistQuery(status);
  const { data: roomTypesData } = useGetRoomTypelistQuery(status);
  const { data: amenitesTypesData } = useGetAmenitiesTypelistQuery(status);

  // const { Option } = Select;
  const [form] = useForm();
  const navigate = useNavigate();
  // const discounTT = useWatch("discount", form);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const ADULT = useWatch("adult", form);
  const CHILD = useWatch("child", form);
  // console.log("ADULT", ADULT, "CHILD", CHILD, "total", ADULT + CHILD);
  useEffect(() => {
    form.setFieldsValue({
      // rate_per_night: 0,
      discount_percent: 0,
      adult: 1,
      child: 0,
      discount: "1",
      refundable: "1",
      refundable_time: 0,
      refundable_charge: 0,

      description: "", // Assuming description should be an empty string

      occupancy: 0,

      room_size: 0,

      tax_percent: 0,
    });
  }, [form]);

  // const validateDecilmal = (_: any, value: any) => {
  //   const stringValue = value.toString();

  //   const decimalPattern = /^\d*\.\d+$/;

  //   if (decimalPattern.test(stringValue)) {
  //     return Promise.reject("You can not input a decimal number");
  //   }
  //   if (value < 0 || value > 10) {
  //     return Promise.reject("Number must be between 0 and 10");
  //   }
  // };

  const onFinish = (values: any) => {
    const formData = new FormData();
    const { room_amenities, adult, rate_per_night, occupancy, ...rest } =
      values;

    if (room_amenities) {
      formData.append("room_amenities", JSON.stringify(room_amenities));
    }
    if (adult || adult === 0) {
      formData.append("adult", adult || 0);
    }
    if (rate_per_night) {
      formData.append("rate_per_night", rate_per_night);
    }
    if (occupancy || occupancy === 0) {
      formData.append("occupancy", occupancy || 0);
    }
    for (const key in rest) {
      if (rest[key]) {
        formData.append(key, rest[key]);
      }
    }
    if (fileList) {
      const formattedPhotos = fileList.map((file: any) => {
        return file.originFileObj;
      });
      formattedPhotos.map((img: any) => formData.append("photo", img));
    }
    console.log("values", values);
    console.log("formData", formData);
    createHotelRoom(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate(`/hotel/room-list`);
    }
  }, [discount, form, isSuccess, navigate, refundable]);

  useEffect(() => {
    if (ADULT || CHILD) {
      const OCCUPANCY = ADULT + CHILD;
      console.log("OCCUPANCY", OCCUPANCY);

      form.setFieldValue("occupancy", OCCUPANCY);
    }
  }, [ADULT, CHILD]);

  useEffect(() => {
    if (roomTypesData) {
      const roomTypeList =
        roomTypesData?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: value.room_type,

          key: `room_${value.room_type}_${index}`,
        })) || [];
      setRoomTypeList(roomTypeList);
    }
  }, [roomTypesData]);
  useEffect(() => {
    if (bedTypesData) {
      const roomBEDTypeList =
        bedTypesData?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: value.bed_type,

          key: `room_${value.bed_type}_${index}`,
        })) || [];
      setRoomBedTypeList(roomBEDTypeList);
    }
  }, [bedTypesData]);
  useEffect(() => {
    if (amenitesTypesData) {
      const roomAmenitiesTypeList =
        amenitesTypesData?.data?.map((value: any, index: any) => ({
          value: value.id,
          label: value.room_amenities,

          key: `room_${value.room_amenities}_${index}`,
        })) || [];
      setRoomAmenitiesTypeList(roomAmenitiesTypeList);
    }
  }, [amenitesTypesData]);

  const onSearch = (_value: string) => {};
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  return (
    <>
      <Form
        name="create room"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Row align={"middle"} justify={"start"} gutter={[20, 20]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Room Number"
              name="room_number"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Enter your room number",
                },
              ]}
            >
              <Input
                type="text"
                placeholder="Enter Room Number"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Room Type"
              name="room_type"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Select room type!",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select Room Type"
                showSearch
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterOption}
                options={roomTypeList}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label={<span> Room size (in sqft)</span>}
              name="room_size"
              style={{ width: "100%" }}
            >
              <InputNumber
                type="number"
                placeholder="Enter Room size in sqft"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Bed Type"
              name="bed_type"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Enter bed type details!",
                },
              ]}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select Bed Type"
                showSearch
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterOption}
                options={roomBedTypeList}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Rate Per Night"
              name="rate_per_night"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                type="number"
                // defaultValue="0"
                placeholder="Enter Rate Per Night"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>

          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Discount"
              name="discount"
              style={{ width: "100%" }}
            >
              <Select
                style={{ width: "100%" }}
                placeholder="Select Discount"
                // defaultValue="1"
                onChange={() => setDiscount(!discount)}
              >
                <Select.Option value="1">Yes</Select.Option>
                <Select.Option value="0">No</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          {discount && (
            <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
              <Form.Item
                label="Discount percent (%)"
                name="discount_percent"
                style={{ width: "100%" }}
                rules={[
                  {
                    validator: (_, value) => {
                      if (value > 100) {
                        return Promise.reject(
                          "Discount Percentage cannot exceed 100"
                        );
                      }
                      return Promise.resolve();
                    },
                  },
                  {
                    required: true,
                    message: "Enter your Discount Percentage",
                  },
                ]}
              >
                <Input
                  // defaultValue={0}
                  type="number"
                  placeholder="Enter Discount percentage"
                  style={{ width: "100%" }}
                  min={0}
                  max={100}
                />
              </Form.Item>
            </Col>
          )}
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Tax percent (%)"
              name="tax_percent"
              style={{ width: "100%" }}
              rules={[
                {
                  validator: (_, value) => {
                    if (value > 100) {
                      return Promise.reject(
                        "Discount Percentage cannot exceed 100"
                      );
                    }
                    return Promise.resolve();
                  },
                },
                // {
                //   required: true,
                //   message: "Enter your Tax Percentage",
                // },
              ]}
            >
              <Input
                defaultValue="0"
                type="number"
                placeholder="Enter Tax percentage"
                style={{ width: "100%" }}
                min={0}
                max={100}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Refundable"
              name="refundable"
              style={{ width: "100%" }}
              rules={[
                {
                  required: true,
                  message: "Select any options from below!",
                },
              ]}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select Refundable"
                onChange={() => setRefundable(!refundable)}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option?.label ?? "").includes(input)
                }
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? "")
                    .toLowerCase()
                    .localeCompare((optionB?.label ?? "").toLowerCase())
                }
                options={[
                  {
                    value: "1",
                    label: "Refundable",
                  },
                  {
                    value: "0",
                    label: "Non-refundable",
                  },
                ]}
              />
            </Form.Item>
          </Col>
          {refundable && (
            <>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  label={
                    <>
                      <Tooltip
                        title="(Total number of days)"
                        className="flex gap-2 items-center"
                      >
                        <span>Refundable time</span>
                        <FaInfoCircle color="#01adad" />
                      </Tooltip>
                    </>
                  }
                  name="refundable_time"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Enter Refundable time (Total number of days)!",
                    },
                  ]}
                >
                  <InputNumber
                    defaultValue={0}
                    type="number"
                    placeholder="Enter Refundable time"
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
                <Form.Item
                  label="Refundable charge"
                  name="refundable_charge"
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Enter Refundable charge!",
                    },
                  ]}
                >
                  <InputNumber
                    type="number"
                    defaultValue="0"
                    placeholder="Enter Refundable Charge "
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
            </>
          )}

          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Adult"
              name="adult"
              style={{ width: "100%" }}
              rules={[
                // {
                //   validator: (_, value) => {
                //     if (value > 10) {
                //       return Promise.reject("Adult cannot exceed 10");
                //     }
                //     return Promise.resolve();
                //   },
                // },
                // {
                //   validator: validateDecilmal, // Custom validation rule
                // },
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                type="number"
                // min={0}
                // max={10}
                placeholder="Enter Adult"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Child"
              name="child"
              style={{ width: "100%" }}
              rules={[
                // {
                //   validator: (_, value) => {
                //     if (value > 10) {
                //       return Promise.reject("Child cannot exceed 10");
                //     }
                //     return Promise.resolve();
                //   },
                // },
                // {
                //   validator: validateDecilmal, // Custom validation rule
                // },
                {
                  required: true,
                },
              ]}
            >
              <InputNumber
                type="number"
                // min={0}
                // max={10}
                placeholder="Enter Child"
                style={{ width: "100%" }}
                // formatter={formatter}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Occupancy"
              name="occupancy"
              style={{ width: "100%" }}
            >
              <InputNumber
                type="number"
                defaultValue="0"
                placeholder="Enter Occupancy"
                style={{ width: "100%" }}
                readOnly={true}
                // formatter={formatter}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item label="Room amenities " name="room_amenities">
              {/* <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select Room Amenities"
              >
                {amenitesTypesData?.data?.map((amenities) => (
                  <Select.Option key={amenities.id} value={amenities.id}>
                    {amenities.room_amenities}
                  </Select.Option>
                ))}
              </Select> */}
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select Room Amenities"
                showSearch
                optionFilterProp="children"
                onSearch={onSearch}
                filterOption={filterOption}
                options={roomAmenitiesTypeList}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Description"
              name="description"
              style={{ width: "100%" }}
            >
              <TextArea
                rows={4}
                placeholder="Enter Others details"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={8} xxl={6}>
            <Form.Item
              label="Upload room pictures"
              rules={[
                {
                  required: true,
                  message: "Enter Photo !",
                },
              ]}
            >
              <Upload
                onChange={(fileList: any) => {
                  setFileList(fileList?.fileList);
                }}
                action="/upload.do"
                listType="picture-card"
                onPreview={handlePreview}
                maxCount={5}
                accept=".png,.jpg,.jpeg"
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Modal
              open={previewOpen}
              title={previewTitle}
              footer={null}
              onCancel={handleCancel}
            >
              <img alt="example" style={{ width: "100%" }} src={previewImage} />
            </Modal>
          </Col>
        </Row>

        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
          <Button
            style={{
              backgroundColor: "#01adad",
              color: "white",
              borderRadius: "50px",
              width: "150px",
            }}
            htmlType="submit"
            loading={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RoomCreateForm;
