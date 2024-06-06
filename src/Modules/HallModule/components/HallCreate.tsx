import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  UploadFile,
} from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import type { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCreateHallMutation } from "../api/HallEndPoints";
import { useGetHallAmenitiesTypelistQuery } from "../../HallAmenities/api/HallAmenitiesEndPoint";
import { FaArrowLeftLong } from "react-icons/fa6";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const HallCreate = () => {
  const [createHall, { isSuccess, isLoading }] = useCreateHallMutation();
  const [status, _setStatus] = useState<any>({ status: 1 });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<any>([]);

  const { data: hallAmenitiesData } = useGetHallAmenitiesTypelistQuery(status);

  // const { Option } = Select;
  const [form] = useForm();
  const navigate = useNavigate();

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

  const onFinish = (values: any) => {
    const formData = new FormData();
    const { hall_amenities, ...rest } = values;

    if (hall_amenities) {
      formData.append("hall_amenities", JSON.stringify(hall_amenities));
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
    createHall(formData);
  };

  useEffect(() => {
    if (isSuccess) {
      form.resetFields();
      navigate(`/hall/hall-list`);
    }
  }, [form, isSuccess, navigate]);

  return (
    <>
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
                  <span>Hall</span>
                </>
              ),
            },
            {
              title: <span className="text-[#1B9FA2]">Create Hall</span>,
            },
          ]}
        />
      </>

      <div className="flex flex-col md:flex-row justify-between items-center mb-3 gap-3 md:gap-0">
        <span
          className="text-lg font-bold text-[#01adad]"
          style={{ textTransform: "uppercase" }}
        >
          Create Hall
        </span>
        <Link to={`/hall/hall-list`}>
          <Button
            icon={<FaArrowLeftLong />}
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
            Go to Hall List
          </Button>
        </Link>
      </div>

      <Card>
        <Form
          name="create Hall"
          form={form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row align={"middle"} justify={"start"} gutter={[20, 20]}>
            {/* name */}
            <Col xs={24} sm={12} md={12} lg={6}>
              <Form.Item
                label="Name"
                name="name"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Enter your Name",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter Your Name"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            {/* capaciy */}
            <Col xs={24} sm={12} md={12} lg={6}>
              <Form.Item
                label="Capacity"
                name="capacity"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Select Capacity!",
                  },
                ]}
              >
                <InputNumber
                  type="number"
                  placeholder="Enter Your Capacity"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            {/* size */}
            <Col xs={24} sm={12} md={12} lg={6}>
              <Form.Item
                label={<span> Hall size (in sqft)</span>}
                name="size"
                style={{ width: "100%" }}
              >
                <InputNumber
                  type="number"
                  placeholder="Enter Hall size in sqft"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            {/* location */}
            <Col xs={24} sm={12} md={12} lg={6}>
              <Form.Item
                label="Location"
                name="location"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Enter Location details!",
                  },
                ]}
              >
                <Input
                  type="text"
                  placeholder="Enter Your Location"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row align={"top"} justify={"start"} gutter={[20, 20]}>
            {/* rate_per_hour */}
            <Col xs={24} sm={12} md={12} lg={6}>
              <Form.Item
                label="Rate Per Hour"
                name="rate_per_hour"
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Enter rate per Hour details!",
                  },
                ]}
              >
                <InputNumber
                  type="number"
                  defaultValue="0"
                  placeholder="Enter Rate Per Hour"
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            {/* hall_amenities */}
            <Col xs={24} sm={12} md={12} lg={6}>
              <Form.Item label="Hall amenities " name="hall_amenities">
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Select Hall Amenities"
                >
                  {hallAmenitiesData?.data?.map((amenities) => (
                    <Select.Option key={amenities.id} value={amenities.id}>
                      {amenities.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            {/* photo */}
            <Col xs={24} sm={12} md={12} lg={6}>
              <Form.Item
                label="Upload Hall pictures"
                rules={[
                  {
                    required: true,
                    message: "Enter Hall Pictures !",
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
                <img
                  alt="example"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </Col>
          </Row>
          <Row align={"top"} justify={"start"} gutter={[20, 20]}></Row>
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
      </Card>
    </>
  );
};

export default HallCreate;
